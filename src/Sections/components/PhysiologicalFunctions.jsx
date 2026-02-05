import React from 'react';
import '../styles/PhysiologicalFunctions.css';

// Dummy JSON data
const dummyData = {
  functions: [
    {
      id: 1,
      title: "Gastrointestinal Wellness",
      icon: "heartbeat",
      status: "helpful",
      bacteriaType: "Helpful bacteria",
      percentage: 3,
      comparison: "more than control"
    },
    {
      id: 2,
      title: "Mental Health & Well-being",
      icon: "brain",
      status: "harmful",
      bacteriaType: "Harmful bacteria",
      percentage: 5,
      comparison: "more than control"
    },
    {
      id: 3,
      title: "Immunity",
      icon: "shield",
      status: "helpful",
      bacteriaType: "Helpful bacteria",
      percentage: 10,
      comparison: "more than control"
    },
    {
      id: 4,
      title: "Weight Management",
      icon: "scale",
      status: "harmful",
      bacteriaType: "Harmful bacteria",
      percentage: 4,
      comparison: "more than control"
    }
  ]
};

const PhysiologicalFunctions = () => {
  const data = dummyData; // Replace with API data: const data = props.data;

  // Function to render the appropriate icon
  const renderIcon = (iconType) => {
    switch(iconType) {
      case 'heartbeat':
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M4 16L8 12L12 20L16 8L20 16L24 12L28 16" stroke="#4A7C7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'brain':
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="12" stroke="#4A7C7E" strokeWidth="2"/>
            <path d="M10 16C10 16 12 12 16 12C20 12 22 16 22 16" stroke="#4A7C7E" strokeWidth="2" strokeLinecap="round"/>
            <path d="M10 20C10 20 12 18 16 18C20 18 22 20 22 20" stroke="#4A7C7E" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="14" r="1.5" fill="#4A7C7E"/>
            <circle cx="20" cy="14" r="1.5" fill="#4A7C7E"/>
          </svg>
        );
      case 'shield':
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 4L6 8V16C6 22 10 26 16 28C22 26 26 22 26 16V8L16 4Z" stroke="#4A7C7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16L15 19L21 13" stroke="#4A7C7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'scale':
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
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
    if (status === 'helpful') {
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="arrow-icon">
          <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    } else {
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="arrow-icon">
          <path d="M8 4V12M8 12L4 8M8 12L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
        {data.functions.map((func) => (
          <div key={func.id} className="function-card">
            <div className="function-icon-wrapper">
              {renderIcon(func.icon)}
            </div>
            
            <h3 className="function-title">{func.title}</h3>
            
            <div className={`function-badge ${func.status === 'helpful' ? 'badge-helpful' : 'badge-harmful'}`}>
              {renderArrow(func.status)}
              <span className="badge-text">
                {func.bacteriaType} {func.percentage}% {func.comparison}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhysiologicalFunctions;