import React from 'react';
import '../styles/GutScoreCard.css';
import SkeletonCard from '../../components/Skeleton/skeleton';

const GutHealthScore = ({ data }) => {
//   if (!data) return <SkeletonCard />;
	if (!data) return <SkeletonCard />;
 
  const scorePercentage = (data.patient_harmful_helpful_ratio["Overall"][1] / 100) * 100;
  
  // Calculate the stroke-dashoffset for the circular progress
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scorePercentage / 100) * circumference;

  return (
    <div className="gut-health-container">
      <div className="header-section">
        <h1 className="main-title">Gut Function Test Report</h1>
        <button className="export-btn">Export to pdf</button>
      </div>
	  
	  {/* <div className='merger'><</div> */}
      <div className="score-banner">
        <div className="score-info">
          <h2 className="section-title">Your Gut Health Score</h2>
          <p className="analysis-date">
            Based on your microbiome analysis from {data.analysisDate}
          </p>
        </div>

        <div className="score-visual">
          <div className="microbe-icon">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
              {/* Bacteria/microbe icon */}
              <circle cx="50" cy="50" r="20" fill="#4A7C7E" opacity="0.3"/>
              <circle cx="50" cy="50" r="15" fill="#4A7C7E"/>
              <circle cx="45" cy="45" r="3" fill="#D4E5E5"/>
              <circle cx="55" cy="48" r="2" fill="#D4E5E5"/>
              <circle cx="48" cy="52" r="2" fill="#D4E5E5"/>
              <circle cx="54" cy="54" r="2" fill="#D4E5E5"/>
              
              {/* Magnifying glass */}
              <circle cx="65" cy="65" r="12" stroke="#4A7C7E" strokeWidth="3" fill="none"/>
              <line x1="74" y1="74" x2="85" y2="85" stroke="#4A7C7E" strokeWidth="3" strokeLinecap="round"/>
              
              {/* Decorative lines around */}
              <rect x="15" y="30" width="20" height="4" rx="2" fill="#4A7C7E"/>
              <rect x="15" y="50" width="15" height="4" rx="2" fill="#4A7C7E"/>
              <rect x="15" y="70" width="18" height="4" rx="2" fill="#4A7C7E"/>
            </svg>
          </div>
		  <div className="overall-wrapper">
			<div className="score-circle">
				<svg width="140" height="140" viewBox="0 0 140 140">
				{/* Background circle */}
				<circle
					cx="70"
					cy="70"
					r={radius}
					fill="none"
					stroke="#D1D5DB"
					strokeWidth="12"
				/>
				{/* Progress circle */}
				<circle
					cx="70"
					cy="70"
					r={radius}
					fill="none"
					stroke="#5BA3A3"
					strokeWidth="12"
					strokeLinecap="round"
					strokeDasharray={circumference}
					strokeDashoffset={strokeDashoffset}
					transform="rotate(-90 70 70)"
					className="progress-ring"
				/>
				</svg>
				<div className="score-number">{Math.ceil(data.patient_harmful_helpful_ratio["Overall"][1])}</div>
			</div>
			<div className="score-label">Overall Insights</div>
		  </div>
        </div>
      </div>


      <div className="metrics-grid">
        {/* Overall gut health */}
        <div className="metric-card">
          <h3 className="metric-title">Overall gut health</h3>
          <div className="metric-items">
			<div className="metric-item-wrapper">
				<div className="metric-item">
				<span className="metric-name">Diversity</span>
				<span className="metric-value">{data.EDFB[2]}</span>
				</div>
				    <p className="metric-desc">
					{data.Diversity_desc}
					</p>
            </div>
			<div className = "metric-item-wrapper">
				<div className="metric-item">
				<span className="metric-name">Evenness</span>
				<span className="metric-value">{data.EDFB[1]}</span>
				</div>
				    <p className="metric-desc">
					{data.Eveness_desc}
					</p>
			</div>
          </div>
        </div>

        {/* Firmicutes/Bacteroidetes Ratio */}
        <div className="metric-card">
          <h3 className="metric-title">Firmicutes/Bacteroidetes Ratio</h3>
          <div className="ratio-bar-container">
            <div className="ratio-bar">
              <div 
                className="ratio-bar-fill" 
                style={{ width: `${(data.EDFB[3] / 3) * 100}%` }}
              ></div>
            </div>
            <span className="ratio-value">{data.EDFB[3]}</span>
          </div>
          <p className="metric-description">
            {data.firmicutes_interpretation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GutHealthScore;
