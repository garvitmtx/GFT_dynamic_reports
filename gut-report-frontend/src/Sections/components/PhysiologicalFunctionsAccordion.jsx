import React, { useState } from 'react';
import '../styles/PhysiologicalFunctionsAccordion.css';
import SkeletonCard from '../../components/Skeleton/skeleton';
import GastroIcon from "../../assets/Gastro_img.svg";
import ImmunityIcon from "../../assets/Immunity_img.svg";
import MentalIcon from "../../assets/Mental_img.svg";
import SugarIcon from "../../assets/Sugar_img.svg";
import WeightIcon from "../../assets/Weight_img.svg";
import OverallIcon from "../../assets/OverallHealth.svg"

// Dummy JSON data matching the API structure
const dummyData = {
  function: [
    {
      title: "Overall",
      status: "helpful",
      control: [18.7, 81.3],
      patient: [8.03, 91.97],
      comparison: "more than control",
      percentage: 11,
      description: "Your overall gut health suggests that your microbiome is adequately supporting you as much as it does a average healthy Indians.",
      bacteriaType: "Helpful bacteria"
    },
    {
      title: "Immunity",
      status: "helpful",
      control: [16.81, 83.19],
      patient: [6.99, 93.01],
      comparison: "more than control",
      percentage: 10,
      description: "Harmful bacteria that impact immunity are lower in your gut than a average healthy Indians. This indicates a good microbiome support for immunity, making you less vulnerable to inflammation, infections and illnesses.",
      bacteriaType: "Helpful bacteria"
    },
    {
      title: "Mental Wellness",
      status: "helpful",
      control: [22.41, 77.59],
      patient: [9.37, 90.63],
      comparison: "more than control",
      percentage: 13,
      description: "Harmful bacteria linked to mental wellness are well controlled in your gut compared to the average healthy Indians, suggesting it supports your mood and mental health.",
      bacteriaType: "Helpful bacteria"
    },
    {
      title: "Weight Management",
      status: "helpful",
      control: [23.07, 76.93],
      patient: [9.89, 90.11],
      comparison: "more than control",
      percentage: 13,
      description: "Harmful bacteria in your gut that influence weight management are within range in you as compared to an average healthy Indians, which indicates your gut is providing adequate support with your weight management",
      bacteriaType: "Helpful bacteria"
    },
    {
      title: "Gastrointestinal Health",
      status: "harmful",
      control: [19.52, 80.48],
      patient: [31.58, 68.42],
      comparison: "more than control",
      percentage: 12,
      description: "Your gastrointestinal health shows that harmful bacteria are more abundant in your gut compared to an average healthy Indians, which could be affecting your digestion.",
      bacteriaType: "Harmful bacteria"
    },
    {
      title: "Sugar Metabolism",
      status: "helpful",
      control: [20.24, 79.76],
      patient: [8.77, 91.23],
      comparison: "more than control",
      percentage: 11,
      description: "Harmful bacteria in your gut that influence sugar metabolism are within range in you as compared to an average healthy Indians, which indicates your gut is providing adequate support for glucose control.",
      bacteriaType: "Helpful bacteria"
    }
  ]
};

const PhysiologicalFunctionsNew = ({data}) => {
 if (!data){
	return <SkeletonCard />
 }
  
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (title) => {
    setExpandedId(expandedId === title ? null : title);
  };

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
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="arrow-icon">
        {status === 'helpful' ? (
          <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        ) : (
          <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        )}
      </svg>
    );
  };

  // Get max height for bar chart (always 100)
  const getMaxHeight = () => 100;

  return (
    <div className="physiological-new-container">
		 <div className="functions-header">
 			<h2 className="functions-title">Functions Impacted</h2>
        </div>
      <div className="accordion-new-list">
        {data.function.map((func) => {
          const isExpanded = expandedId === func.title;
          const isOtherExpanded = expandedId !== null && expandedId !== func.title;

          return (
            <div 
              key={func.title} 
              className={`accordion-new-item ${isExpanded ? 'expanded' : ''} ${isOtherExpanded ? 'collapsed' : ''}`}
            >
              <div className="accordion-new-header" onClick={() => toggleExpand(func.title)}>
                <div className="header-new-left">
                  <div className="function-new-icon-wrapper">
                    {renderIcon(func.title)}
                  </div>
                  <div className="header-new-content">
                    <h3 className="function-new-title">{func.title}</h3>
                    <p className="function-new-description">{func.description}</p>
                  </div>
                </div>
                
                <div className="header-new-right">
                  <div className={`function-new-badge ${func.status === 'helpful' ? 'badge-new-helpful' : 'badge-new-harmful'}`}>
                    {renderArrow(func.status)}
                    <span className="badge-new-text">
						{func.percentage === 0 ? (
						<span>Your microbiome is same as control</span>) :(
						<>
                      {func.bacteriaType} {func.percentage}% {func.comparison}
					  </>
					)}
                    </span>
                  </div>
                  <button className="expand-new-toggle" aria-label={isExpanded ? 'Collapse' : 'Expand'}>
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 20 20" 
                      fill="none"
                      className={`chevron-new ${isExpanded ? 'rotated' : ''}`}
                    >
                      <path 
                        d="M5 7.5L10 12.5L15 7.5" 
                        stroke="#4A5568" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="accordion-new-content">
                  <div className="content-new-wrapper">
                    <p className="content-new-summary">{func.description}</p>
                    
                    <div className="content-new-grid">
                      <div className="chart-new-section">
                        <div className="chart-new-data">
                          <div className="data-new-row">
                            <span className="data-new-label">Helpful bacteria</span>
                            <div className="data-new-values">
                              <span className="data-new-control">Control <strong>{func.control[1].toFixed(0)}%</strong></span>
                              <span className="data-new-you">You <strong className={func.status === 'helpful' ? 'positive' : 'negative'}>{func.patient[1]}%</strong></span>
                            </div>
                          </div>
                          <div className="data-new-row">
                            <span className="data-new-label">Harmful bacteria</span>
                            <div className="data-new-values">
                              <span className="data-new-control">Control <strong>{func.control[0].toFixed(0)}%</strong></span>
                              <span className="data-new-you">You <strong className={func.status === 'harmful' ? 'negative' : 'positive'}>{func.patient[0]}%</strong></span>
                            </div>
                          </div>
                        </div>

                        <div className="bar-new-chart">
                          <div className="bar-new-group">
                            <div className="bar-new-wrapper">
                              <div className="bar-new-stack">
                                <div 
                                  className="bar-new-segment bar-helpful" 
                                  style={{ height: `${func.patient[1]}%` }}
                                >
                                  <span className="bar-percentage-label">
                                    {func.patient[1].toFixed(0)}%
                                  </span>
                                </div>
                                <div 
                                  className="bar-new-segment bar-harmful" 
                                  style={{ height: `${func.patient[0]}%` }}
                                ></div>
                              </div>
                              <span className="bar-new-label">You</span>
                            </div>
                            <div className="bar-new-wrapper">
                              <div className="bar-new-stack">
                                <div 
                                  className="bar-new-segment bar-helpful" 
                                  style={{ height: `${func.control[1]}%` }}
                                >
                                  <span className="bar-percentage-label">
                                    {func.control[1].toFixed(0)}%
                                  </span>
                                </div>
                                <div 
                                  className="bar-new-segment bar-harmful" 
                                  style={{ height: `${func.control[0]}%` }}
                                ></div>
                              </div>
                              <span className="bar-new-label">Control</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PhysiologicalFunctionsNew;






// import React, { useState } from 'react';
// import '../styles/PhysiologicalFunctionsAccordion.css';

// // Dummy JSON data
// const dummyData = {
//   functions: [
//     {
//       id: 1,
//       title: "Gastrointestinal Wellness",
//       icon: "heartbeat",
//       description: "Your gut lining and digestive tract show healthy microbial b...",
//       status: "helpful",
//       bacteriaType: "Helpful bacteria",
//       percentage: 3,
//       comparison: "more than control",
//       expandedContent: {
//         summary: "Your gastrointestinal health shows that harmful bacteria are less abundant in your gut compared to average healthy Indians, which means that your bacteria are supporting your digestive system well.",
//         keyFindings: [
//         //   "Healthy Akkermansia muciniphila levels supporting gut lining",
//         //   "Balanced short-chain fatty acid production",
//         //   "Low inflammation markers detected"
//         ],
//         chartData: {
//           helpful: { you: 2, control: 81 },
//           harmful: { you: 2, control: 19 }
//         }
//       }
//     },
//     {
//       id: 2,
//       title: "Mental Health & Well-being",
//       icon: "brain",
//       description: "Gut-brain axis function shows moderate activity. Some neurot...",
//       status: "harmful",
//       bacteriaType: "Harmful bacteria",
//       percentage: 5,
//       comparison: "more than control",
//       expandedContent: {
//         summary: "Your gut-brain axis shows moderate activity with some neurotransmitter imbalances that may affect mood and cognitive function.",
//         keyFindings: [
//         //   "Serotonin-producing bacteria levels need improvement",
//         //   "GABA production slightly below optimal range",
//         //   "Cortisol regulation markers present"
//         ],
//         chartData: {
//           helpful: { you: 45, control: 50 },
//           harmful: { you: 55, control: 50 }
//         }
//       }
//     },
//     {
//       id: 3,
//       title: "Immunity",
//       icon: "shield",
//       description: "Strong immune-supporting microbiome with excellent diversity...",
//       status: "helpful",
//       bacteriaType: "Helpful bacteria",
//       percentage: 10,
//       comparison: "more than control",
//       expandedContent: {
//         summary: "Your immune system shows excellent microbial support with high diversity and beneficial bacteria abundance.",
//         keyFindings: [
//         //   "High levels of Bifidobacterium supporting immune function",
//         //   "Excellent microbial diversity",
//         //   "Strong anti-inflammatory markers"
//         ],
//         chartData: {
//           helpful: { you: 12, control: 75 },
//           harmful: { you: 5, control: 25 }
//         }
//       }
//     },
//     {
//       id: 4,
//       title: "Sugar Metabolism",
//       icon: "glucose",
//       description: "Good enzymatic activity and nutrient absorption capacity wit...",
//       status: "helpful",
//       bacteriaType: "Helpful bacteria",
//       percentage: 2,
//       comparison: "more than control",
//       expandedContent: {
//         summary: "Your metabolic microbiome shows good enzymatic activity supporting healthy glucose metabolism and nutrient absorption.",
//         keyFindings: [
//         //   "Optimal glucose metabolism markers",
//         //   "Good insulin sensitivity indicators",
//         //   "Balanced energy production pathways"
//         ],
//         chartData: {
//           helpful: { you: 3, control: 78 },
//           harmful: { you: 1, control: 22 }
//         }
//       }
//     },
//     {
//       id: 5,
//       title: "Weight Management",
//       icon: "scale",
//       description: "Metabolic microbiome markers suggest potential for improveme...",
//       status: "harmful",
//       bacteriaType: "Harmful bacteria",
//       percentage: 4,
//       comparison: "more than control",
//       expandedContent: {
//         summary: "Your metabolic markers show room for improvement in weight management-related bacteria.",
//         keyFindings: [
//         //   "Firmicutes/Bacteroidetes ratio slightly elevated",
//         //   "Fat storage-related bacteria present",
//         //   "Metabolic efficiency could be improved"
//         ],
//         chartData: {
//           helpful: { you: 42, control: 65 },
//           harmful: { you: 58, control: 35 }
//         }
//       }
//     }
//   ]
// };

// const PhysiologicalFunctionsAccordion = () => {
//   const [expandedId, setExpandedId] = useState(null);
//   const data = dummyData; // Replace with API data: const data = props.data;

//   const toggleExpand = (id) => {
//     setExpandedId(expandedId === id ? null : id);
//   };

//   // Function to render the appropriate icon
//   const renderIcon = (iconType) => {
//     const iconProps = { width: "32", height: "32", viewBox: "0 0 32 32", fill: "none" };
    
//     switch(iconType) {
//       case 'heartbeat':
//         return (
//           <svg {...iconProps}>
//             <path d="M4 16L8 12L12 20L16 8L20 16L24 12L28 16" stroke="#4A7C7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//           </svg>
//         );
//       case 'brain':
//         return (
//           <svg {...iconProps}>
//             <circle cx="16" cy="16" r="12" stroke="#4A7C7E" strokeWidth="2"/>
//             <path d="M10 16C10 16 12 12 16 12C20 12 22 16 22 16" stroke="#4A7C7E" strokeWidth="2" strokeLinecap="round"/>
//             <path d="M10 20C10 20 12 18 16 18C20 18 22 20 22 20" stroke="#4A7C7E" strokeWidth="2" strokeLinecap="round"/>
//             <circle cx="12" cy="14" r="1.5" fill="#4A7C7E"/>
//             <circle cx="20" cy="14" r="1.5" fill="#4A7C7E"/>
//           </svg>
//         );
//       case 'shield':
//         return (
//           <svg {...iconProps}>
//             <path d="M16 4L6 8V16C6 22 10 26 16 28C22 26 26 22 26 16V8L16 4Z" stroke="#4A7C7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             <path d="M12 16L15 19L21 13" stroke="#4A7C7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//           </svg>
//         );
//       case 'glucose':
//         return (
//           <svg {...iconProps}>
//             <rect x="8" y="12" width="4" height="12" rx="1" stroke="#4A7C7E" strokeWidth="2" fill="none"/>
//             <rect x="14" y="8" width="4" height="16" rx="1" stroke="#4A7C7E" strokeWidth="2" fill="none"/>
//             <rect x="20" y="14" width="4" height="10" rx="1" stroke="#4A7C7E" strokeWidth="2" fill="none"/>
//           </svg>
//         );
//       case 'scale':
//         return (
//           <svg {...iconProps}>
//             <path d="M8 12L12 20H20L24 12M8 12L16 4L24 12M8 12H24" stroke="#4A7C7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             <line x1="6" y1="26" x2="26" y2="26" stroke="#4A7C7E" strokeWidth="2" strokeLinecap="round"/>
//           </svg>
//         );
//       default:
//         return null;
//     }
//   };

//   // Function to render arrow icon
//   const renderArrow = (status) => {
//     return (
//       <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="arrow-icon">
//         {status === 'helpful' ? (
//           <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//         ) : (
//           <path d="M8 4V12M8 12L4 8M8 12L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//         )}
//       </svg>
//     );
//   };

//   return (
//     <div className="physiological-accordion-container">
// 	    <div className="functions-header">
// 			<h2 className="functions-title">Functions Impacted</h2>
//         </div>
//       <div className="accordion-list">
//         {data.functions.map((func) => {
//           const isExpanded = expandedId === func.id;
//           const isOtherExpanded = expandedId !== null && expandedId !== func.id;

//           return (
//             <div 
//               key={func.id} 
//               className={`accordion-item ${isExpanded ? 'expanded' : ''} ${isOtherExpanded ? 'collapsed' : ''}`}
//             >
//               <div className="accordion-header" onClick={() => toggleExpand(func.id)}>
//                 <div className="header-left">
//                   <div className="function-icon-wrapper">
//                     {renderIcon(func.icon)}
//                   </div>
//                   <div className="header-content">
//                     <h3 className="function-title">{func.title}</h3>
//                     <p className="function-description">{func.description}</p>
//                   </div>
//                 </div>
                
//                 <div className="header-right">
//                   <div className={`function-badge ${func.status === 'helpful' ? 'badge-helpful' : 'badge-harmful'}`}>
//                     {renderArrow(func.status)}
//                     <span className="badge-text">
//                       {func.bacteriaType} {func.percentage}% {func.comparison}
//                     </span>
//                   </div>
//                   <button className="expand-toggle" aria-label={isExpanded ? 'Collapse' : 'Expand'}>
//                     <svg 
//                       width="20" 
//                       height="20" 
//                       viewBox="0 0 20 20" 
//                       fill="none"
//                       className={`chevron ${isExpanded ? 'rotated' : ''}`}
//                     >
//                       <path 
//                         d="M5 7.5L10 12.5L15 7.5" 
//                         stroke="#4A5568" 
//                         strokeWidth="2" 
//                         strokeLinecap="round" 
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               </div>

//               {isExpanded && (
//                 <div className="accordion-content">
//                   <div className="content-wrapper">
//                     <p className="content-summary">{func.expandedContent.summary}</p>
                    
//                     <div className="content-grid">
//                       <div className="key-findings-section">
//                         <h4 className="section-title">
//                           <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="section-icon">
//                             <circle cx="10" cy="10" r="8" stroke="#4A7C7E" strokeWidth="2"/>
//                             <path d="M10 6V10L13 13" stroke="#4A7C7E" strokeWidth="2" strokeLinecap="round"/>
//                           </svg>
//                           Key Findings
//                         </h4>
//                         <ul className="findings-list">
//                           {func.expandedContent.keyFindings.map((finding, index) => (
//                             <li key={index} className="finding-item">
//                               <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="check-icon">
//                                 <circle cx="8" cy="8" r="7" stroke="#4A7C7E" strokeWidth="1.5"/>
//                                 <path d="M5 8L7 10L11 6" stroke="#4A7C7E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                               </svg>
//                               {finding}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>

//                       <div className="chart-section">
//                         <div className="chart-data">
//                           <div className="data-row">
//                             <span className="data-label">Helpful bacteria</span>
//                             <div className="data-values">
//                               <span className="data-control">Control <strong>{func.expandedContent.chartData.helpful.control}%</strong></span>
//                               <span className="data-you">You <strong className={func.status === 'helpful' ? 'positive' : 'negative'}>+ {func.expandedContent.chartData.helpful.you}%</strong></span>
//                             </div>
//                           </div>
//                           <div className="data-row">
//                             <span className="data-label">Harmful bacteria</span>
//                             <div className="data-values">
//                               <span className="data-control">Control <strong>{func.expandedContent.chartData.harmful.control}%</strong></span>
//                               <span className="data-you">You <strong className={func.status === 'harmful' ? 'negative' : 'positive'}>+ {func.expandedContent.chartData.harmful.you}%</strong></span>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="bar-chart">
//                           <div className="bar-group">
//                             <div className="bar-wrapper">
//                               <div className="bar bar-you" style={{ height: `${func.expandedContent.chartData.helpful.you}%` }}></div>
//                               <span className="bar-label">You</span>
//                             </div>
//                             <div className="bar-wrapper">
//                               <div className="bar bar-control" style={{ height: `${func.expandedContent.chartData.helpful.control}%` }}></div>
//                               <span className="bar-label">Control</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default PhysiologicalFunctionsAccordion;