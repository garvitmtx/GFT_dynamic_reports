import React from "react";
import "../styles/ToxinCard.css";
import SkeletonCard from "../../components/Skeleton/skeleton";

// Dummy JSON data
const dummyData = {
  functions: [
    {
      id: 1,
      title: "Organochlorines",
      icon: "heartbeat",
      status: "helpful",
      bacteriaType: "Helpful bacteria",
      percentage: 3,
      comparison: "No toxins detected",
    },
    {
      id: 2,
      title: "NEONICOTINOIDS",
      icon: "brain",
      status: "harmful",
      bacteriaType: "Harmful bacteria",
      percentage: 70,
      comparison: "Your exposure to this toxin is less than 70%",
    },
    {
      id: 3,
      title: "PYRETHROIDS",
      icon: "shield",
      status: "helpful",
      bacteriaType: "Helpful bacteria",
      percentage: 10,
      comparison: "No toxins detected",
    },
    {
      id: 4,
      title: "Carbamates",
      icon: "scale",
      status: "harmful",
      bacteriaType: "Harmful bacteria",
      percentage: 10,
      comparison: "Your exposure to this toxin is less than 10%",
    },
  ],
};

const PhysiologicalToxinFunctions = ({ data }) => {
  if (!data) {
    return <SkeletonCard />;
  }

  // ✅ FIX: define functions
  const functions = data?.functions || dummyData.functions;

  const renderIcon = (iconType) => {
    switch (iconType) {
      case "heartbeat":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M4 16L8 12L12 20L16 8L20 16L24 12L28 16"
              stroke="#4A7C7E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "brain":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="12" stroke="#4A7C7E" strokeWidth="2" />
          </svg>
        );
      case "shield":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 4L6 8V16C6 22 10 26 16 28C22 26 26 22 26 16V8L16 4Z"
              stroke="#4A7C7E"
              strokeWidth="2"
            />
          </svg>
        );
      case "scale":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M8 12L12 20H20L24 12M8 12L16 4L24 12"
              stroke="#4A7C7E"
              strokeWidth="2"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const renderArrow = (status) => {
    if (status === "helpful") {
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 12V4M8 4L4 8M8 4L12 8"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      );
    }
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 4V12M8 12L4 8M8 12L12 8"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    );
  };

  return (
    <div className="toxin-functions-container">
      <div className="functions-header">
        <h2 className="functions-title">Harmful Metabolites Overview</h2>
        <p className="functions-subtitle">
          Summary of harmful metabolites detected
        </p>
      </div>

      <div className="functions-grid">
        {functions.map((func) => (
          <div key={func.id} className="function-card">
            <div className="function-icon-wrapper">
              {renderIcon(func.icon)}
            </div>

            <h3 className="function-title">{func.title}</h3>

            <div
              className={`function-badge ${
                func.status === "helpful"
                  ? "badge-helpful"
                  : "badge-harmful"
              }`}
            >
              
              <span className="badge-text">
				{func.comparison}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhysiologicalToxinFunctions;
