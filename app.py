from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.responses import JSONResponse
from pathlib import Path
import ast
import math
import hashlib
import secrets
import json
from datetime import datetime, timedelta
from sqlalchemy import create_engine, text
from dotenv import load_dotenv
import os
from urllib.parse import quote_plus
import pandas as pd
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

# --------------------------------------------------
# LOAD ENV
# --------------------------------------------------

load_dotenv()

password = quote_plus(os.getenv("DB_PASSWORD"))

DATABASE_URL = (
    f"mysql+pymysql://{os.getenv('DB_USER')}:{password}"
    f"@{os.getenv('DB_HOST')}:3306/{os.getenv('DB_NAME')}"
)

engine = create_engine(
    DATABASE_URL,
    pool_size=5,
    max_overflow=10,
    pool_pre_ping=True,
    pool_recycle=1800
)


# --------------------------------------------------
# APP INIT
# --------------------------------------------------

# app = FastAPI(title="Gut Report API")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://localhost:5173",
#         "http://127.0.0.1:5173"
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
BASE_DIR = Path(__file__).resolve().parent
REPORT_DIR = BASE_DIR / "data"
REPORT_JSON_DIR = REPORT_DIR / "reports"

REPORT_JSON_DIR.mkdir(parents=True, exist_ok=True)


# --------------------------------------------------
# STARTUP CHECK
# --------------------------------------------------

# @app.on_event("startup")
# def test_db():
#     try:
#         with engine.connect() as conn:
#             conn.execute(text("SELECT 1"))
#         print("✅ Database Connected")
#     except Exception as e:
#         print("❌ DB Connection Failed:", e)
#         raise e


# # --------------------------------------------------
# # TOKEN HELPERS
# # --------------------------------------------------

# def hash_token(token: str):
#     return hashlib.sha256(token.encode()).hexdigest()


# def create_report_token(report_index: int, days: int):

#     raw_token = secrets.token_urlsafe(32)
#     token_hash = hash_token(raw_token)

#     expiry = datetime.utcnow() + timedelta(days=int(days))

#     query = text("""
#         INSERT INTO report_access_tokens
#         (id, report_index, token_hash, expires_at, revoked, opened_at)
#         VALUES (UUID(), :report_index, :token_hash, :expires_at, FALSE, NULL)
    
#         ON DUPLICATE KEY UPDATE
#             token_hash = VALUES(token_hash),
#             expires_at = VALUES(expires_at),
#             revoked = FALSE,
#             opened_at = NULL
#     """)
    
    
#     # Transaction-safe
#     with engine.begin() as conn:
#         conn.execute(query, {
#             "report_index": report_index,
#             "token_hash": token_hash,
#             "expires_at": expiry
#         })

#     return raw_token


# def validate_token(raw_token: str):

#     token_hash = hash_token(raw_token)

#     query = text("""
#         SELECT report_index
#         FROM report_access_tokens
#         WHERE token_hash = :token_hash
#         AND revoked = FALSE
#         AND expires_at > NOW()
#         LIMIT 1
#     """)

#     with engine.connect() as conn:
#         result = conn.execute(query, {
#             "token_hash": token_hash
#         }).fetchone()

#     if not result:
#         raise HTTPException(401, "Invalid or expired report link")

#     return result[0]
    

# def get_kit_id(report_index: int):

#     query = text("""
#         SELECT kit_id
#         FROM gft_reports
#         WHERE gft_reports_index = :idx
#         LIMIT 1
#     """)

#     with engine.connect() as conn:
#         result = conn.execute(query, {"idx": report_index}).fetchone()

#     if not result:
#         raise HTTPException(404, "Report not found")

#     return result[0]


# def log_access(raw_token, request: Request):

#     token_hash = hash_token(raw_token)

#     ip = request.client.host
#     ua = request.headers.get("user-agent")

#     query = text("""
#         UPDATE report_access_tokens
#         SET opened_at = NOW(),
#             ip_address = :ip,
#             user_agent = :ua
#         WHERE token_hash = :token_hash
#     """)

#     with engine.begin() as conn:
#         conn.execute(query, {
#             "ip": ip,
#             "ua": ua,
#             "token_hash": token_hash
#         })


# --------------------------------------------------
# JSON CLEANER
# --------------------------------------------------

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

    if not stats_path.exists():
        raise HTTPException(404, f"Stats file not found for kit_id {kit_id}")

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

def parse_toxin_file(kit_id):

    toxin_path = REPORT_DIR / f"{kit_id}_toxin_info.txt"

    if not toxin_path.exists():
        return []

    toxins = []

    with open(toxin_path, "r", encoding="utf-8") as f:
        lines = [line.strip() for line in f.readlines() if line.strip()]

    i = 0
    while i < len(lines):

        if lines[i].startswith("toxin_name"):
            toxin_name = lines[i].split("=", 1)[1].strip()

            percentile = None
            interpretation = ""

            # Next line should be percentile
            if i + 1 < len(lines) and lines[i + 1].startswith("percentile"):
                percentile = float(lines[i + 1].split("=", 1)[1].strip())

            # Next line should be interpretation
            if i + 2 < len(lines):
                interpretation = lines[i + 2]

            toxins.append({
                "toxin_name": toxin_name,
                "percentile": round(percentile, 2) if percentile is not None else None,
                "interpretation": interpretation
            })

            i += 3
        else:
            i += 1

    return toxins



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
        **load_microbe_data(kit_id),
			"toxins": parse_toxin_file(kit_id) 
    }

    report = clean_json(report)

    file_path = REPORT_JSON_DIR / f"{kit_id}.json"

    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(report, f)

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

# @app.get("/report")
# def secure_report(
#     token: str = Query(...),
#     request: Request = None
# ):

#     report_index = validate_token(token)

#     kit_id = get_kit_id(report_index)

#     log_access(token, request)

#     response = get_report_json(kit_id)

#     return JSONResponse(
#         content=response,
#         headers={"Cache-Control": "no-store"}
#     )


# --------------------------------------------------
# ⚠️ DEBUG ONLY — DELETE AFTER TESTING
# --------------------------------------------------

# @app.get("/debug-token/{report_index}/{days}")
# def debug_token(report_index: int,days):
#     token = create_report_token(report_index,days)
#     return {"token": token}













