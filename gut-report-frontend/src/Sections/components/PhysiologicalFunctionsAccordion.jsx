import React, { useState } from 'react';
import '../styles/PhysiologicalFunctionsAccordion.css';

// Dummy JSON data
const dummyData = {
  functions: [
    {
      id: 1,
      title: "Gastrointestinal Wellness",
      icon: "heartbeat",
      description: "Your gut lining and digestive tract show healthy microbial b...",
      status: "helpful",
      bacteriaType: "Helpful bacteria",
      percentage: 3,
      comparison: "more than control",
      expandedContent: {
        summary: "Your gastrointestinal health shows that harmful bacteria are less abundant in your gut compared to average healthy Indians, which means that your bacteria are supporting your digestive system well.",
        keyFindings: [
          "Healthy Akkermansia muciniphila levels supporting gut lining",
          "Balanced short-chain fatty acid production",
          "Low inflammation markers detected"
        ],
        chartData: {
          helpful: { you: 2, control: 81 },
          harmful: { you: 2, control: 19 }
        }
      }
    },
    {
      id: 2,
      title: "Mental Health & Well-being",
      icon: "brain",
      description: "Gut-brain axis function shows moderate activity. Some neurot...",
      status: "harmful",
      bacteriaType: "Harmful bacteria",
      percentage: 5,
      comparison: "more than control",
      expandedContent: {
        summary: "Your gut-brain axis shows moderate activity with some neurotransmitter imbalances that may affect mood and cognitive function.",
        keyFindings: [
          "Serotonin-producing bacteria levels need improvement",
          "GABA production slightly below optimal range",
          "Cortisol regulation markers present"
        ],
        chartData: {
          helpful: { you: 45, control: 50 },
          harmful: { you: 55, control: 50 }
        }
      }
    },
    {
      id: 3,
      title: "Immunity",
      icon: "shield",
      description: "Strong immune-supporting microbiome with excellent diversity...",
      status: "helpful",
      bacteriaType: "Helpful bacteria",
      percentage: 10,
      comparison: "more than control",
      expandedContent: {
        summary: "Your immune system shows excellent microbial support with high diversity and beneficial bacteria abundance.",
        keyFindings: [
          "High levels of Bifidobacterium supporting immune function",
          "Excellent microbial diversity",
          "Strong anti-inflammatory markers"
        ],
        chartData: {
          helpful: { you: 12, control: 75 },
          harmful: { you: 5, control: 25 }
        }
      }
    },
    {
      id: 4,
      title: "Sugar Metabolism",
      icon: "glucose",
      description: "Good enzymatic activity and nutrient absorption capacity wit...",
      status: "helpful",
      bacteriaType: "Helpful bacteria",
      percentage: 2,
      comparison: "more than control",
      expandedContent: {
        summary: "Your metabolic microbiome shows good enzymatic activity supporting healthy glucose metabolism and nutrient absorption.",
        keyFindings: [
          "Optimal glucose metabolism markers",
          "Good insulin sensitivity indicators",
          "Balanced energy production pathways"
        ],
        chartData: {
          helpful: { you: 3, control: 78 },
          harmful: { you: 1, control: 22 }
        }
      }
    },
    {
      id: 5,
      title: "Weight Management",
      icon: "scale",
      description: "Metabolic microbiome markers suggest potential for improveme...",
      status: "harmful",
      bacteriaType: "Harmful bacteria",
      percentage: 4,
      comparison: "more than control",
      expandedContent: {
        summary: "Your metabolic markers show room for improvement in weight management-related bacteria.",
        keyFindings: [
          "Firmicutes/Bacteroidetes ratio slightly elevated",
          "Fat storage-related bacteria present",
          "Metabolic efficiency could be improved"
        ],
        chartData: {
          helpful: { you: 42, control: 65 },
          harmful: { you: 58, control: 35 }
        }
      }
    }
  ]
};

const PhysiologicalFunctionsAccordion = () => {
  const [expandedId, setExpandedId] = useState(null);
  const data = dummyData; // Replace with API data: const data = props.data;

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Function to render the appropriate icon
  const renderIcon = (iconType) => {
    const iconProps = { width: "32", height: "32", viewBox: "0 0 32 32", fill: "none" };
    
    switch(iconType) {
      case 'heartbeat':
        return (
          <svg {...iconProps}>
            <path d="M4 16L8 12L12 20L16 8L20 16L24 12L28 16" stroke="#4A7C7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'brain':
        return (
          <svg {...iconProps}>
            <circle cx="16" cy="16" r="12" stroke="#4A7C7E" strokeWidth="2"/>
            <path d="M10 16C10 16 12 12 16 12C20 12 22 16 22 16" stroke="#4A7C7E" strokeWidth="2" strokeLinecap="round"/>
            <path d="M10 20C10 20 12 18 16 18C20 18 22 20 22 20" stroke="#4A7C7E" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="14" r="1.5" fill="#4A7C7E"/>
            <circle cx="20" cy="14" r="1.5" fill="#4A7C7E"/>
          </svg>
        );
      case 'shield':
        return (
          <svg {...iconProps}>
            <path d="M16 4L6 8V16C6 22 10 26 16 28C22 26 26 22 26 16V8L16 4Z" stroke="#4A7C7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16L15 19L21 13" stroke="#4A7C7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'glucose':
        return (
          <svg {...iconProps}>
            <rect x="8" y="12" width="4" height="12" rx="1" stroke="#4A7C7E" strokeWidth="2" fill="none"/>
            <rect x="14" y="8" width="4" height="16" rx="1" stroke="#4A7C7E" strokeWidth="2" fill="none"/>
            <rect x="20" y="14" width="4" height="10" rx="1" stroke="#4A7C7E" strokeWidth="2" fill="none"/>
          </svg>
        );
      case 'scale':
        return (
          <svg {...iconProps}>
            <path d="M8 12L12 20H20L24 12M8 12L16 4L24 12M8 12H24" stroke="#4A7C7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="6" y1="26" x2="26" y2="26" stroke="#4A7C7E" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
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
          <path d="M8 4V12M8 12L4 8M8 12L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        )}
      </svg>
    );
  };

  return (
    <div className="physiological-accordion-container">
	    <div className="functions-header">
			<h2 className="functions-title">Functions Impacted</h2>
        </div>
      <div className="accordion-list">
        {data.functions.map((func) => {
          const isExpanded = expandedId === func.id;
          const isOtherExpanded = expandedId !== null && expandedId !== func.id;

          return (
            <div 
              key={func.id} 
              className={`accordion-item ${isExpanded ? 'expanded' : ''} ${isOtherExpanded ? 'collapsed' : ''}`}
            >
              <div className="accordion-header" onClick={() => toggleExpand(func.id)}>
                <div className="header-left">
                  <div className="function-icon-wrapper">
                    {renderIcon(func.icon)}
                  </div>
                  <div className="header-content">
                    <h3 className="function-title">{func.title}</h3>
                    <p className="function-description">{func.description}</p>
                  </div>
                </div>
                
                <div className="header-right">
                  <div className={`function-badge ${func.status === 'helpful' ? 'badge-helpful' : 'badge-harmful'}`}>
                    {renderArrow(func.status)}
                    <span className="badge-text">
                      {func.bacteriaType} {func.percentage}% {func.comparison}
                    </span>
                  </div>
                  <button className="expand-toggle" aria-label={isExpanded ? 'Collapse' : 'Expand'}>
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 20 20" 
                      fill="none"
                      className={`chevron ${isExpanded ? 'rotated' : ''}`}
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
                <div className="accordion-content">
                  <div className="content-wrapper">
                    <p className="content-summary">{func.expandedContent.summary}</p>
                    
                    <div className="content-grid">
                      <div className="key-findings-section">
                        <h4 className="section-title">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="section-icon">
                            <circle cx="10" cy="10" r="8" stroke="#4A7C7E" strokeWidth="2"/>
                            <path d="M10 6V10L13 13" stroke="#4A7C7E" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          Key Findings
                        </h4>
                        <ul className="findings-list">
                          {func.expandedContent.keyFindings.map((finding, index) => (
                            <li key={index} className="finding-item">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="check-icon">
                                <circle cx="8" cy="8" r="7" stroke="#4A7C7E" strokeWidth="1.5"/>
                                <path d="M5 8L7 10L11 6" stroke="#4A7C7E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              {finding}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="chart-section">
                        <div className="chart-data">
                          <div className="data-row">
                            <span className="data-label">Helpful bacteria</span>
                            <div className="data-values">
                              <span className="data-control">Control <strong>{func.expandedContent.chartData.helpful.control}%</strong></span>
                              <span className="data-you">You <strong className={func.status === 'helpful' ? 'positive' : 'negative'}>+ {func.expandedContent.chartData.helpful.you}%</strong></span>
                            </div>
                          </div>
                          <div className="data-row">
                            <span className="data-label">Harmful bacteria</span>
                            <div className="data-values">
                              <span className="data-control">Control <strong>{func.expandedContent.chartData.harmful.control}%</strong></span>
                              <span className="data-you">You <strong className={func.status === 'harmful' ? 'negative' : 'positive'}>+ {func.expandedContent.chartData.harmful.you}%</strong></span>
                            </div>
                          </div>
                        </div>

                        <div className="bar-chart">
                          <div className="bar-group">
                            <div className="bar-wrapper">
                              <div className="bar bar-you" style={{ height: `${func.expandedContent.chartData.helpful.you}%` }}></div>
                              <span className="bar-label">You</span>
                            </div>
                            <div className="bar-wrapper">
                              <div className="bar bar-control" style={{ height: `${func.expandedContent.chartData.helpful.control}%` }}></div>
                              <span className="bar-label">Control</span>
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

export default PhysiologicalFunctionsAccordion;