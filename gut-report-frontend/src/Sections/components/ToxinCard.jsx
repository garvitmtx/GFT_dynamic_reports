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
  const functions = data.toxins || dummyData.functions;

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

            <h3 className="function-title">{func.toxin_name}</h3>

            <div
              className={`toxin-function-badge ${
                func.status === "Helpful"
                  ? "badge-helpful"
                  : "badge-harmful"
              }`}
            >

              <div className="toxin-badge-text">
				{func.interpretation}
					</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhysiologicalToxinFunctions;
