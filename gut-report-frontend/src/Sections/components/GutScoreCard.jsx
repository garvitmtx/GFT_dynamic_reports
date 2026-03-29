import React from 'react';
import '../styles/GutScoreCard.css';
import SkeletonCard from '../../components/Skeleton/skeleton';
import GastroIcon from "../../assets/Gastro_img.svg";

const GutHealthScore = ({ data }) => {
  if (!data) return <SkeletonCard />;
  
  const report_date = data.date;
  const report_data = data.report;
  const scorePercentage = (report_data.patient_harmful_helpful_ratio["Overall"][1] / 100) * 100;
  
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
      
      <div className="score-banner">
        <div className="score-info">
          <h2 className="section-title">Your Gut Health Score</h2>
          <p className="analysis-date">
            Based on your microbiome analysis from <b>{report_date}</b>
          </p>
        </div>

        <div className="score-visual">
          <div className="microbe-icon">
            <img src={GastroIcon} alt="Gastro" className="scorecard-svg" />
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
              <div className="score-number">{Math.ceil(report_data.patient_harmful_helpful_ratio["Overall"][1])}</div>
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
                <span className="metric-value">{report_data.EDFB[2]}</span>
              </div>
              <p className="metric-desc">
                {report_data.Diversity_desc}
              </p>
			  <p className='metric-label'>Diversity range in healthy Indians: 1.29 - 3.33</p>
            </div>
            <div className="metric-item-wrapper">
              <div className="metric-item">
                <span className="metric-name">Evenness</span>
                <span className="metric-value">{report_data.EDFB[1]}</span>
              </div>
              <p className="metric-desc">
                {report_data.Eveness_desc}
              </p>
			  <p className='metric-label'>Evenness range in healthy Indians: 0.37 - 0.83</p>
            </div>
          </div>
        </div>

        {/* Firmicutes/Bacteroidetes Ratio */}
        {/* <div className="metric-card">
          <h3 className="metric-title">Firmicutes/Bacteroidetes Ratio</h3>
          <div className="ratio-bar-container">
            <div className="ratio-bar">
              <div 
                className="ratio-bar-fill" 
                style={{ width: `${(report_data.EDFB[3] / 3) * 100}%` }}
              ></div>
            </div>
            <span className="ratio-value">{report_data.EDFB[3]}</span>
          </div>
          <p className="metric-description">
            {report_data.firmicutes_interpretation}
          </p>
        </div> */}

        {/* Harmful Toxins Detected */}
        {data.report.toxins && (() => {
          // Extract metadata from last item
          const lastItem = data.report.toxins.pesticides.summary;
          const metadata = lastItem.total !== undefined ? lastItem : null;
		console.log("metadata",metadata.total)
          if (metadata) {
            const totalSegments = 3;
            const shadedSegments = 3 || 0;
            const segmentWidth = 100 / totalSegments;

            return (
              <div className="metric-card">
				          <h3 className="metric-title">Firmicutes/Bacteroidetes Ratio</h3>
          <div className="ratio-bar-container">
            <div className="ratio-bar">
              <div 
                className="ratio-bar-fill" 
                style={{ width: `${(report_data.EDFB[3] / 3) * 100}%` }}
              ></div>
            </div>
            <span className="ratio-value">{report_data.EDFB[3]}</span>
          </div>
          <p className="metric-description">
            {report_data.firmicutes_interpretation}
          </p>
                <h3 className="metric-title">Harmful Toxins Detected</h3>
                <div className="toxins-segmented-bar">
                  {Array.from({ length: totalSegments }).map((_, index) => (
                    <div
                      key={index}
                      className={`toxin-segment ${index < shadedSegments ? 'shaded' : 'unshaded'}`}
                      style={{ width: `${segmentWidth}%` }}
                    ></div>
                  ))}
                </div>
                <p className="metric-description">
                  {3}/{3} toxin classes detected
                </p>
              </div>
            );
          }
          return null;
        })()}
      </div>
    </div>
  );
};

export default GutHealthScore;









// import React from 'react';
// import '../styles/GutScoreCard.css';
// import SkeletonCard from '../../components/Skeleton/skeleton';
// import GastroIcon from "../../assets/Gastro_img.svg";

// const GutHealthScore = ({ data }) => {
// //   if (!data) return <SkeletonCard />;
// 	if (!data) return <SkeletonCard />;
// 	const report_date = data.date
// 	const report_data = data.report
//   const scorePercentage = (report_data.patient_harmful_helpful_ratio["Overall"][1] / 100) * 100;
  
//   // Calculate the stroke-dashoffset for the circular progress
//   const radius = 54;
//   const circumference = 2 * Math.PI * radius;
//   const strokeDashoffset = circumference - (scorePercentage / 100) * circumference;

//   return (
//     <div className="gut-health-container">
//       <div className="header-section">
//         <h1 className="main-title">Gut Function Test Report</h1>
//         <button className="export-btn">Export to pdf</button>
//       </div>
	  
// 	  {/* <div className='merger'><</div> */}
//       <div className="score-banner">
//         <div className="score-info">
//           <h2 className="section-title">Your Gut Health Score</h2>
//           <p className="analysis-date">
//             Based on your microbiome analysis from <b>{report_date}</b>
//           </p>
//         </div>

//         <div className="score-visual">
//           <div className="microbe-icon">
//             <img src={GastroIcon} alt="Gastro" className="scorecard-svg" />
//           </div>
// 		  <div className="overall-wrapper">
// 			<div className="score-circle">
// 				<svg width="140" height="140" viewBox="0 0 140 140">
// 				{/* Background circle */}
// 				<circle
// 					cx="70"
// 					cy="70"
// 					r={radius}
// 					fill="none"
// 					stroke="#D1D5DB"
// 					strokeWidth="12"
// 				/>
// 				{/* Progress circle */}
// 				<circle
// 					cx="70"
// 					cy="70"
// 					r={radius}
// 					fill="none"
// 					stroke="#5BA3A3"
// 					strokeWidth="12"
// 					strokeLinecap="round"
// 					strokeDasharray={circumference}
// 					strokeDashoffset={strokeDashoffset}
// 					transform="rotate(-90 70 70)"
// 					className="progress-ring"
// 				/>
// 				</svg>
// 				<div className="score-number">{Math.ceil(report_data.patient_harmful_helpful_ratio["Overall"][1])}</div>
// 			</div>
// 			<div className="score-label">Overall Insights</div>
// 		  </div>
//         </div>
//       </div>


//       <div className="metrics-grid">
//         {/* Overall gut health */}
//         <div className="metric-card">
//           <h3 className="metric-title">Overall gut health</h3>
//           <div className="metric-items">
// 			<div className="metric-item-wrapper">
// 				<div className="metric-item">
// 				<span className="metric-name">Diversity</span>
// 				<span className="metric-value">{report_data.EDFB[2]}</span>
// 				</div>
// 				    <p className="metric-desc">
// 					{report_data.Diversity_desc}
// 					</p>
//             </div>
// 			<div className = "metric-item-wrapper">
// 				<div className="metric-item">
// 				<span className="metric-name">Evenness</span>
// 				<span className="metric-value">{report_data.EDFB[1]}</span>
// 				</div>
// 				    <p className="metric-desc">
// 					{report_data.Eveness_desc}
// 					</p>
// 			</div>
//           </div>
//         </div>

//         {/* Firmicutes/Bacteroidetes Ratio */}
//         <div className="metric-card">
//           <h3 className="metric-title">Firmicutes/Bacteroidetes Ratio</h3>
//           <div className="ratio-bar-container">
//             <div className="ratio-bar">
//               <div 
//                 className="ratio-bar-fill" 
//                 style={{ width: `${(report_data.EDFB[3] / 3) * 100}%` }}
//               ></div>
//             </div>
//             <span className="ratio-value">{report_data.EDFB[3]}</span>
//           </div>
//           <p className="metric-description">
//             {report_data.firmicutes_interpretation}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GutHealthScore;
