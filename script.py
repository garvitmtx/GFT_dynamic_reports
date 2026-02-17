from pathlib import Path
import ast
import math
import json
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os
from urllib.parse import quote_plus
import pandas as pd
import numpy as np
import mysql.connector
from dotenv import load_dotenv
from datetime import datetime
import sys

load_dotenv()


def main(kit_id, file_path):
    file_path = Path(file_path)
    REPORT_DIR = file_path / "data"
    REPORT_JSON_DIR = file_path / "data"/"reports"
    
    REPORT_JSON_DIR.mkdir(parents=True, exist_ok=True)
    def get_db_connection():
        return mysql.connector.connect(
            host="patientdb.cvftc7kpbtew.ap-south-1.rds.amazonaws.com",
            user="admin",
            password="M1cr0b!oTx_RWUs3r",
            database="patient_db_aws",
            port=3306
        )
    
    
    def clean_json(data):
    
        if isinstance(data, dict):
            return {k: clean_json(v) for k, v in data.items()}
    
        if isinstance(data, list):
            return [clean_json(v) for v in data]
    
        if isinstance(data, float):
            if math.isnan(data) or math.isinf(data):
                return None
    
        return data
    
    
    
    def ratio_to_percentages(ratio):
        helpful = 1
        harmful = ratio
        
        total = helpful + harmful
        
        harmful_percent = (harmful / total) * 100
        helpful_percent = (helpful / total) * 100
        
        return [round(harmful_percent, 2), round(helpful_percent, 2)]
    # --------------------------------------------------
    # REPORT PARSER (runs ONLY once now)
    # --------------------------------------------------
    
    def find_line(lines, keyword):
        for i, line in enumerate(lines):
            if keyword.lower() in line.lower():
                return i
        return None
    
    
    def extract_array(line):
        try:
            return ast.literal_eval(line.split(":", 1)[1])
        except:
            return []
    
    
    def extract_ratios(lines, start):
        ratios = {}
    
        for line in lines[start:start+7]:
            if ":" in line:
                k, v = line.split(":", 1)
                v = ratio_to_percentages(float(v.strip()))
                ratios[f"{k.strip()}"] = v
    
        return ratios
    def parse_stats_file(kit_id):
    
        stats_path = REPORT_DIR / f"{kit_id}_stats.txt"
    
        with open(stats_path, "r", encoding="utf-8") as f:
            lines = [line.strip() for line in f.readlines()]
    
        data = {}
    
        # ✅ EDFB
        data["EDFB"] = extract_array(lines[0])
        data["EDFB"][1] = round(data["EDFB"][1], 2)
        data["EDFB"][2] = round(data["EDFB"][2], 2)
        data["EDFB"][3] = round(data["EDFB"][3], 1)
        # ✅ Firmicutes Interpretation
        idx = find_line(lines, "Firmicutes Interpretation")
        data["firmicutes_interpretation"] = lines[idx+1] if idx else ""
    
        # ✅ Patient ratios
        idx = find_line(lines, "Patient Harmful to Helpful Ratios")
        data["patient_harmful_helpful_ratio"] = extract_ratios(lines, idx+1) if idx else []
    
        # ✅ Control ratios
        idx = find_line(lines, "Control Harmful to Helpful Ratios")
        data["control_harmful_helpful_ratio"] = extract_ratios(lines, idx+1) if idx else []
        
        data["comparison_ratios"] = {}
        for key in data["patient_harmful_helpful_ratio"]:
            if key in data["control_harmful_helpful_ratio"] and data["control_harmful_helpful_ratio"][key][0] is not None:
                patient_ratio = data["patient_harmful_helpful_ratio"][key]
                control_ratio = data["control_harmful_helpful_ratio"][key]
                if patient_ratio[0] < control_ratio[0]:  # harmful percent is lower in patient
                    diff = round(control_ratio[0] - patient_ratio[0], 0)
                    data["comparison_ratios"][key] = {
                        "title": key,
                        "status": "helpful",
                        "percentage": diff,
                        "comparision": "more than control",
                        "bacteriaType": "Helpful bacteria"
                    }
                else:
                    diff = round(patient_ratio[0] - control_ratio[0], 0)
                    data["comparison_ratios"][key] = {
                        "title": key,
                        "status": "harmful",
                        "percentage": diff,
                        "comparision": "more than control",
                        "bacteriaType": "Harmful bacteria"
                    }
    
        data["Eveness_desc"] = "Evenness indicates how evenly the different types of microbes are distributed in your  gut. A healthy gut maintains a balanced mix, ensuring that no single type is significantly more common than the others."
    
        data["Diversity_desc"] = "Diversity considers both the number of different types of bacteria in your gut (richness) and how evenly they are distributed (evenness). It provides a good overall indication of your gut health."
        
        # ✅ Interpretations
        interpretation_keywords = {
            "guthealth": "overall gut health",
            "immunity": "immunity Harmful Helpful Charts Interpretation",
            "mental_wellness": "mental wellness Harmful Helpful Charts Interpretation",
            "weight_management": "weight management Harmful Helpful Charts Interpretation",
            "gastrointestinal": "Gastrointestinal Health Harmful Helpful Charts Interpretation",
            "sugar_metabolism": "sugar metabolism Harmful Helpful Charts Interpretation"
        }
        
    
        interpretations = {}
    
        for key, phrase in interpretation_keywords.items():
            idx = find_line(lines, phrase)
    
            if idx and idx+1 < len(lines):
                interpretations[key] = lines[idx+1]
            else:
                interpretations[key] = ""
    
        data["interpretations"] = interpretations
    
        return data
    
    
    
    def build_top5_microbes(top5_path, details_path):
    
        if not top5_path.exists():
            return []
    
        top5 = pd.read_csv(top5_path)
    
        # Clean pandas junk
        top5.replace([np.inf, -np.inf], None, inplace=True)
        top5 = top5.astype(object).where(pd.notnull(top5), None)
    
        # If no details file — return empty functions
        if not details_path.exists():
            return [
                {
                    "Genus": row.get("Genus"),
                    "Role": row.get("Role"),
                    "Function_impacted": []
                }
                for _, row in top5.iterrows()
            ]
    
        details = pd.read_csv(details_path)
    
        details.replace([np.inf, -np.inf], None, inplace=True)
        details = details.astype(object).where(pd.notnull(details), None)
    
        # ⭐ SPEED BOOST (index lookup is MUCH faster)
        if "Genus" in details.columns:
            details.set_index("Genus", inplace=True)
    
        microbes = []
    
        for _, row in top5.iterrows():
    
            genus = row.get("Genus")
    
            functions = []
    
            if genus in details.index:
    
                matched = details.loc[[genus]]
    
                # detect function columns dynamically
                function_cols = [
                    col for col in matched.columns
                    if "function" in col.lower()
                ]
    
                for col in function_cols:
                    values = matched[col].dropna().tolist()
                    functions.extend(values)
    
            microbes.append({
                "Genus": genus,
                "Role": row.get("Role"),
                "Function_impacted": list(set(functions))
            })
    
        return microbes
    
    def load_microbe_data(kit_id):
    
        harmful_top5 = REPORT_DIR / f"{kit_id}_top5Harmful.csv"
        harmful_details = REPORT_DIR / f"{kit_id}_HarmfulMicrobesThatNeedToBeAddressed.csv"
    
        helpful_top5 = REPORT_DIR / f"{kit_id}_top5Helpful.csv"
        helpful_details = REPORT_DIR / f"{kit_id}_HelpfulMicrobesThatNeedToBeAddressed.csv"
    
        return {
            "top5_harmful": build_top5_microbes(harmful_top5, harmful_details),
            "top5_helpful": build_top5_microbes(helpful_top5, helpful_details)
        }
    
    
    # --------------------------------------------------
    # ⭐ GENERATE + STORE REPORT (KEY FUNCTION)
    # --------------------------------------------------
    
    def build_and_store_report(kit_id):
    
        report = {
            "kit_id": kit_id,
            **parse_stats_file(kit_id),
            **load_microbe_data(kit_id)
        }
    
        report = clean_json(report)
    
        # ---------------------------
        # Save locally as JSON file
        # ---------------------------
        file_path = REPORT_JSON_DIR / f"{kit_id}.json"
    
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(report, f)
    
        # ---------------------------
        # Save to MySQL (UPSERT)
        # ---------------------------
        try:
            connection = get_db_connection()
            cursor = connection.cursor()
    
            query = """
                INSERT INTO gft_reports (kit_id, report_json, report_created_on)
                VALUES (%s, %s, NOW())
                ON DUPLICATE KEY UPDATE
                    report_json = VALUES(report_json),
                    report_created_on = NOW()
            """
    
            cursor.execute(query, (
                kit_id,
                json.dumps(report)
            ))
    
            connection.commit()
    
            print(f"DB updated for kit_id: {kit_id}")
    
        except mysql.connector.Error as err:
            print(f"Database error: {err}")
    
        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()
    
        return report
    
    
    
    def get_report_json(kit_id):
    
        file_path = REPORT_JSON_DIR / f"{kit_id}.json"
    
        # Serve instantly if exists
        if file_path.exists():
    
            with open(file_path, "r", encoding="utf-8") as f:
                return json.load(f)
    
        # Otherwise build once
        return build_and_store_report(kit_id)

    get_report_json(kit_id=2403241)

# --------------------------------------------------
# 🔐 SECURE REPORT ENDPOINT
# --------------------------------------------------


if __name__=='__main__':
    print(sys.argv)
    if len(sys.argv) != 2:
        print("Usage: reportv3.py <input_file> <output_folder>")
        sys.exit(1)
    output_folder = "D:\CodingNdStuff\MTX\dynamic_report"
    Indir_base = f'{output_folder}/'  
    patientID_filepaths = [Indir_base+"patientIDs.txt"]
    DRL_reports = False
    for file_path in patientID_filepaths:
        with open(file_path, 'r') as file:    
            contents = file.readlines()
            patientIDs_to_process = [id.strip() for id in contents]
    
        for patient_id in patientIDs_to_process:
            print(patient_id)            
            main(patient_id, Indir_base)