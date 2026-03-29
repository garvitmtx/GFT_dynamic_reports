import React from 'react';
import '../styles/PhysiologicalFunctions.css';
import SkeletonCard from '../../components/Skeleton/skeleton';
import GastroIcon from "../../assets/Gastro_img.svg";
import ImmunityIcon from "../../assets/Immunity_img.svg";
import MentalIcon from "../../assets/Mental_img.svg";
import SugarIcon from "../../assets/Sugar_img.svg";
import WeightIcon from "../../assets/Weight_img.svg";
import OverallIcon from "../../assets/OverallHealth.svg"

const PhysiologicalFunctions = ({data}) => {
  if (!data) {
	return <SkeletonCard />;
  }
  // Function to render the appropriate icon
const renderIcon = (title) => {
  switch (title) {
    case "Gastrointestinal Health":
      return <img src={GastroIcon} alt="Gastro" className="function-svg" />;
    case "Immunity":
      return <img src={ImmunityIcon} alt="Immunity" className="function-svg" />;
    case "Mental Wellness":
      return <img src={MentalIcon} alt="Mental" className="function-svg" />;
    case "Sugar Metabolism":
      return <img src={SugarIcon} alt="Sugar" className="function-svg" />;
    case "Weight Management":
      return <img src={WeightIcon} alt="Weight" className="function-svg" />;
    case "Overall":
      return <img src={OverallIcon} alt="Overall" className="function-svg" />;
    default:
      return null;
  }
};

  // Function to render arrow icon
  const renderArrow = (status) => {
    if (status === 'helpful') {
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="arrow-icon">
          <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    } else {
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="arrow-icon">
          <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }
  };

  return (
    <div className="physiological-functions-container">
      <div className="functions-header">
        <h2 className="functions-title">Physiological Functions Overview</h2>
        <p className="functions-subtitle">Summary of how your microbiome impacts key health areas</p>
      </div>

      <div className="functions-grid">
        {Object.values(data).map((func)=> (
          <div className="function-card">
            <div className="function-icon-wrapper">
              {renderIcon(func.title)}
            </div>
            
            <h3 className="function-title">{func.title}</h3>
            
            <div className={`function-badge ${func.status === 'helpful' ? 'badge-helpful' : 'badge-harmful'}`}>
              {renderArrow(func.status)}
				<span className="badge-text">
				{func.percentage === 0 ? (
					<span>Your microbiome is same as control</span>
				) : (
					<>
					{func.bacteriaType} {func.percentage}% {func.comparison}
					</>
				)}
				</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhysiologicalFunctions;