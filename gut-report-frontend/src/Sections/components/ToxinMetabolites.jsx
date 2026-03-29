import React, { useState } from "react";
import "../styles/ToxinMetabolites.css";

const pesticides = {
  Organochlorines: {
    description: [
      "Impact: Hormone-related cancers, Obesity, Diabetes",
      "Sources: grains, fruit, seeds, and vegetables in the control of insects",
    ],
  },
  Neonicotinoids: {
    description: [
      "Impact: Neurotoxicity, hormonal disruption, and potential cancer",
      "Sources: Corn, soy, and sugar beet, home gardens, tick and flea control",
    ],
  },
  Organophosphates: {
    description: [
      "Impact: Nerve damage, affect organ function, respiratory failure and life-threatening outcomes at high exposures",
      "Sources: Fruits, vegetables, and nuts to control pests",
    ],
  },
  Pyrethroids: {
    description: [
      "Impact: Affects nervous system at high exposure",
      "Sources: used in agricultural insecticides, mosquito sprays",
    ],
  },
  Carbamates: {
    description: [
      "Impact: loss of appetite, weakness, weight loss, Fatigue",
      "Sources: fruits, vegetables, cotton, potatoes, corn, grapes, rice to control pests",
    ],
  },
};

const antibiotics = {
    Nitrofurans: {
        description: [
        "Impact: Potential cancer risk, genetic damage and toxicity to the liver, lungs, and kidneys",
        "Sources: Nitrofuran and its metabolites",
        ]
    },
    "Other antibiotics": {
        description: [
        "Impact: Risk of  antimicrobial resistance, aplastic anaemia, cancer risk​",
        "Sources: Chloramphenicol, Sulfamethoxazole, Carbadox, Colistin A, Streptomycin A",
    ]},
    Glycopeptides: {
        description: [
        "Impact: Antimicrobial resistance risk for last-resort antibiotics",
        "Sources: Vancomycin"
    ]},
    Nitroimidazole: {
        description: [
        "Impact: Potential neurotoxicity, genotoxicity, and cancer risks​ at high exposures​",
        "Sources: Nitroimidazoles and its metabolites"
    ]},
    "Steroidal growth regulators": {
        description: [
        "Impact: Early puberty, fertility issues, hormone-related cancers, altered thyroid functions ​",
        "Sources: Boldenone, Zeranol, Stanozolol, Clenbuterol"
    ]}
}
const forever_chemicals = {
    "Perfluoroalkane sulfonic acids": {
        description: [
        "Impact: Potential thyroid and kidney issues, and developmental delays with long-term health effects​",
        "Sources: Firefighting gear, metal plating, stain-resistant fabrics, non-stick cookware",
    ]},
    "Perfluoroalkane sulfonamidoacetic acid": {
        description: [
        "Impact: Poses cancer risks, including kidney and testicular cancers​",
        "Sources: Food packaging, industrial coating, stain-resistant treatments​",
    ]},
    "Perfluorocarboxylic acids": {
        description: [
        "Impact: Immunotoxicity, liver disease, metabolic disruptions, and cancer​ risks​",
        "Sources: Nonstick cookware, stain-resistant carpets, firefighting foams, paints"
    ]},
    "Perfluoroalkane sulfonamide": {
        description: [
        "Impact: Damages liver tissue and disrupts its function​",
        "Sources: Surfactants and intermediate chemicals, waterproof fabrics"
    ]},
    "Perfluoroalkyl phosphates": {
        description: [
        "Impact: May disrupt reproductive endocrine functions ​",
        "Sources: Grease-proofing coating for food packaging, Cosmetics, water- & stain-proofing fabrics"
    ]}
}
const HarmfulToxins = (props) => {
  const [expandedSection, setExpandedSection] = useState(null);

    const toxins = props.data?.toxins || {};

    const pesticidesDataRaw = toxins.pesticides?.data || [];
    const pesticidesSummary = toxins.pesticides?.summary;

    const antibioticsDataRaw = toxins.antibiotics?.data || [];
    const antibioticsSummary = toxins.antibiotics?.summary;

    const foreverDataRaw = toxins.forever_chemicals?.data || [];
    const foreverSummary = toxins.forever_chemicals?.summary;
    console.log("pesticides",pesticidesDataRaw)
    console.log("antibiotics",antibioticsDataRaw)
    console.log("checmicals",foreverDataRaw)
    const mapToxinData = (data, infoMap) => {
        return data.map((toxin, index) => {
        const toxinInfo = infoMap[toxin.toxin_name] || {};

        const impact =
        toxinInfo.description
            ?.find((d) => d.startsWith("Impact"))
            ?.replace("Impact: ", "") || "";

        const sources =
        toxinInfo.description
            ?.find((d) => d.startsWith("Sources"))
            ?.replace("Sources: ", "") || "";

        return {
        id: index + 1,
        name: toxin.toxin_name,
        healthImpact: impact,
        sources: sources,
        interpretation: toxin.interpretation,
        percentile: toxin.percentile,
        status: toxin.status,
        };
    });
    };
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  const pesticidesData = mapToxinData(pesticidesDataRaw, pesticides);
  const antibioticsData = mapToxinData(antibioticsDataRaw, antibiotics);
  const foreverChemicalsData = mapToxinData(foreverDataRaw, forever_chemicals);

  const generateSegmentedBar = (barString) => {
    const [shaded, total] = barString.split("/").map(Number);
    const segments = [];
    const segmentWidth = 100 / total;

    for (let i = 0; i < total; i++) {
      segments.push({
        color: i < shaded ? "#A8727D" : "#E5E7EB",
        width: segmentWidth,
      });
    }

    return segments;
  };

  const renderSegmentedBar = (segments) => (
    <div className="ht-segmented-bar">
      {segments.map((segment, index) => (
        <div
          key={index}
          className="ht-segment"
          style={{
            width: `${segment.width}%`,
            backgroundColor: segment.color,
            border: "2px solid black",
          }}
        />
      ))}
    </div>
  );

  const renderPercentileBar = (percentile) => (
    <div className="ht-percentile-bar-wrapper">
      <div className="ht-percentile-track">
        <div
          className="ht-percentile-marker"
          style={{ left: `${percentile}%` }}
        >
          <div className="ht-marker-dot"></div>
          <div className="ht-marker-label">You</div>
        </div>
      </div>
      <div className="ht-percentile-labels">
        <span className="ht-percentile-label-start">0th</span>
        <span className="ht-percentile-caption">
          Percentile scale in studied population
        </span>
        <span className="ht-percentile-label-end">100th</span>
      </div>
    </div>
  );

  const sections = [
    {
      key: "pesticides",
      title: "Pesticides",
      description:
        "Long-term direct and indirect exposure to pesticide is responsible for various health problems, including metabolic disorders, gastrointestinal disturbances, and neurological conditions. The pesticides are known to strongly disrupt gut flora and barrier function.",
      data: pesticidesData,
    summary: pesticidesSummary,
    },
    {
      key: "animalToxins",
      title: "Banned Antibiotics and Steroids",
      description:
        "Certain classes of antibiotics and steroidal growth regulators used in cattle, poultry and other livestock can enter human bloodstream through their products (meat, milk, eggs) or water contaminated with farm waste if they are marketed before these substances are fully cleared from their systems. These substances can alter human gut microbiota, promote the survival of resistant pathogenic bacteria and disrupt endocrine functions.",
      data: antibioticsData,
    summary: antibioticsSummary,
    },
    {
      key: "foreverChemicals",
      title: "Forever Chemicals",
      description:
        "Forever chemicals are synthetic chemicals often used when manufacturing products such as water-repellent clothing and nonstick cookware. PFAS can take thousands of years to degrade and high levels of PFAS exposure with health issues such as cancer and immune system dysfunction.",
      data: foreverChemicalsData,
    summary: foreverSummary,
    },
  ];

  return (
    <div className="ht-container">
      <h2 className="ht-main-title">Harmful Toxins</h2>

      <div className="ht-sections-list">
        {sections.map((section) => {
          const hasData =
            Array.isArray(section.data) && section.data.length > 0;

          const isExpanded = expandedSection === section.key;

          const showSummary = section.summary;

          return (
            <div
              key={section.key}
              className={`ht-section ${isExpanded ? "ht-expanded" : ""}`}
            >
              <div
                className="ht-section-header"
                onClick={() => toggleSection(section.key)}
              >
                <div className="ht-header-content">
                  <h3 className="ht-section-title">
                    {section.title}
                  </h3>

                  <div
                    className={`flex_toxins ${
                      showSummary ? "has-summary" : ""
                    }`}
                  >
                    <p className="ht-section-description">
                      {section.description}
                    </p>

                    {showSummary && (
                    <div className="summary_bar_percentile">
                        <div className="ht-summary-bar">
                        {renderSegmentedBar(
                            generateSegmentedBar(
                            `${section.summary.below_50_percentile}/5`
                            )
                        )}
                        </div>

                        <p className="ht-summary-text">
                        {section.summary.below_50_percentile}/5 toxin classes less than 50th percentile
                        </p>

                        {!isExpanded && (
                        <div className="ht-percentile-preview">
                            {renderPercentileBar(
                            section.summary.average_percentile
                            )}
                        </div>
                        )}
                    </div>
                    )}
                  </div>
                </div>

                <button
                  className="ht-toggle-btn"
                  aria-label={isExpanded ? "Collapse" : "Expand"}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className={`ht-chevron ${
                      isExpanded ? "ht-rotated" : ""
                    }`}
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

              {isExpanded && (
                <div className="ht-section-content">
                  {hasData ? (
                    <div className="ht-toxins-grid">
                      {section.data.map((toxin) => (
                        <div
                          key={toxin.id}
                          className="ht-toxin-card"
                        >
                          <h4 className="ht-toxin-name">
                            {toxin.name}
                          </h4>

                          <p className="ht-toxin-info">
                            <strong>Health Impact:</strong>{" "}
                            {toxin.healthImpact}
                          </p>

                          <p className="ht-toxin-info">
                            <strong>Sources:</strong>{" "}
                            {toxin.sources}
                          </p>

                          <p className="ht-toxin-interpretation">
                            {toxin.interpretation}
                          </p>

                          {renderPercentileBar(toxin.percentile)}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="not_found_data">
                      No data available
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HarmfulToxins;











// import React, { useState } from 'react';
// import "../styles/ToxinMetabolites.css";


// // Dummy JSON data
// const dummyData = {
//   Pesticides: [
//     {
//       id: 1,
//       name: "ORGANOCHLORINES",
//       healthImpact: "Hormone-related cancers, Obesity, Diabetes",
//       sources: "Pesticides used on grains, fruit, seeds, and vegetables in the control of insects",
//       interpretation: "Your exposure to this toxin is less than 67% of the studied population, you are in the 67th percentile.",
//       percentile: 67,
//       bar: "4/5"
//     },
//     {
//       id: 2,
//       name: "PYRETHROIDS",
//       healthImpact: "Affects nervous system at high exposure",
//       sources: "used in agricultural insecticides, mosquito sprays",
//       interpretation: "Your exposure to this toxin is less than 90% of the studied population, you are in the 90th percentile.",
//       percentile: 90,
//       bar: "5/5"
//     },
//     {
//       id: 3,
//       name: "CARBAMATES",
//       healthImpact: "loss of appetite, weakness, weight loss, Fatigue",
//       sources: "Pesticides used on fruits, vegetables, cotton, potatoes, corn, grapes, rice",
//       interpretation: "Your exposure to this toxin is less than 10% of the studied population, you are in the 10th percentile.",
//       percentile: 10,
//       bar: "1/5"
//     },
//     {
//       id: 4,
//       name: "ORGANOPHOSPHATES",
//       healthImpact: "Nerve damage, affect organ function, respiratory failure and life-threatening outcomes at high exposures",
//       sources: "Pesticides used on fruits, vegetables, grains, and nuts",
//       interpretation: "Your exposure to this toxin is less than 30% of the studied population, you are in the 30th percentile.",
//       percentile: 30,
//       bar: "2/5"
//     },
//     {
//       id: 5,
//       name: "NEONICOTINOIDS",
//       healthImpact: "Neurotoxicity, hormonal disruption, and potential cancer",
//       sources: "Pesticides used on corn, soy, grain crops, legumes, potatoes, and other vegetables, pomes, cotton, insecticides used for tick and flea control",
//       interpretation: "Your exposure to this toxin is less than 20% of the studied population, you are in the 20th percentile.",
//       percentile: 20,
//       bar: "1/5"
//     }
//   ],
//   Animal_Toxins: [
//     // {
//     //   id: 6,
//     //   name: "TETRACYCLINES",
//     //   healthImpact: "Affects bone development, tooth discoloration",
//     //   sources: "Antibiotics used in livestock, poultry farming",
//     //   interpretation: "Your exposure to this toxin is less than 45% of the studied population, you are in the 45th percentile.",
//     //   percentile: 45,
//     //   bar: "3/5"
//     // },
//     // {
//     //   id: 7,
//     //   name: "BETA-LACTAMS",
//     //   healthImpact: "Disrupts gut microbiome, antibiotic resistance",
//     //   sources: "Used in cattle, poultry, and pig farming",
//     //   interpretation: "Your exposure to this toxin is less than 60% of the studied population, you are in the 60th percentile.",
//     //   percentile: 60,
//     //   bar: "4/5"
//     // },
//     // {
//     //   id: 8,
//     //   name: "GROWTH HORMONES",
//     //   healthImpact: "Hormonal imbalance, early puberty, cancer risk",
//     //   sources: "Steroidal growth regulators used in livestock farming",
//     //   interpretation: "Your exposure to this toxin is less than 35% of the studied population, you are in the 35th percentile.",
//     //   percentile: 35,
//     //   bar: "2/5"
//     // },
//     // {
//     //   id: 9,
//     //   name: "SULFONAMIDES",
//     //   healthImpact: "Allergic reactions, liver damage",
//     //   sources: "Antibiotics in poultry and pig products",
//     //   interpretation: "Your exposure to this toxin is less than 50% of the studied population, you are in the 50th percentile.",
//     //   percentile: 50,
//     //   bar: "3/5"
//     // }
//   ],
//   Forever_Chemicals: [
//     // {
//     //   id: 10,
//     //   name: "PFAS (PFOA)",
//     //   healthImpact: "Cancer, immune system dysfunction, thyroid disease",
//     //   sources: "Non-stick cookware, water-repellent clothing, food packaging",
//     //   interpretation: "Your exposure to this toxin is less than 80% of the studied population, you are in the 80th percentile.",
//     //   percentile: 80,
//     //   bar: "1/2"
//     // },
//     // {
//     //   id: 11,
//     //   name: "PFAS (PFOS)",
//     //   healthImpact: "Liver damage, developmental delays, cancer",
//     //   sources: "Firefighting foam, stain-resistant fabrics, carpets",
//     //   interpretation: "Your exposure to this toxin is less than 70% of the studied population, you are in the 70th percentile.",
//     //   percentile: 70,
//     //   bar: "2/2"
//     // }
//   ]
// };

// const HarmfulToxins = () => {
//   const data = dummyData; // Replace with API data: const data = props.data;
  
//   const [expandedSection, setExpandedSection] = useState(null);

//   const toggleSection = (section) => {
//     setExpandedSection(expandedSection === section ? null : section);
//   };

//   // Function to generate segmented bar from "3/5" format
//   const generateSegmentedBar = (barString) => {
//     const [shaded, total] = barString.split('/').map(Number);
//     const segments = [];
//     const segmentWidth = 100 / total;
    
//     // Define color palette for shaded segments
//     const shadedColors = ['#4A7C7E'];
    
//     for (let i = 0; i < total; i++) {
//       if (i < shaded) {
//         // Shaded segment - use color from palette
//         segments.push({
//           color: shadedColors[0],
//           width: segmentWidth
//         });
//       } else {
//         // Unshaded segment - use light gray
//         segments.push({
//           color: '#E5E7EB',
//           width: segmentWidth
//         });
//       }
//     }
    
//     return segments;
//   };

//   // Calculate summary for collapsed view
//   const getSummary = (toxinsArray) => {
//     const total = toxinsArray.length;
//     const below50 = toxinsArray.filter(t => t.percentile < 50).length;
//     return `${below50}/${total} pesticide classes less than 50th percentile`;
//   };

//   const getAnimalToxinsSummary = (toxinsArray) => {
//     const total = toxinsArray.length;
//     const below50 = toxinsArray.filter(t => t.percentile < 50).length;
//     return `${below50}/${total} antibiotics and steroid classes less than 50th percentile`;
//   };

//   const getForeverChemicalsSummary = (toxinsArray) => {
//     const total = toxinsArray.length;
//     const below50 = toxinsArray.filter(t => t.percentile < 50).length;
//     return `${below50}/${total} forever chemicals classes less than 50th percentile`;
//   };

//   const renderPercentileBar = (percentile) => (
//     <div className="ht-percentile-bar-wrapper">
//       <div className="ht-percentile-track">
//         <div
//           className="ht-percentile-marker"
//           style={{ left: `${percentile}%` }}
//         >
//           <div className="ht-marker-dot"></div>
//           <div className="ht-marker-label">You</div>
//         </div>
//       </div>
//       <div className="ht-percentile-labels">
//         <span className="ht-percentile-label-start">0th</span>
//         <span className="ht-percentile-caption">Percentile scale in studied population</span>
//         <span className="ht-percentile-label-end">100th</span>
//       </div>
//     </div>
//   );

//   const renderSegmentedBar = (segments) => (
//     <div className="ht-segmented-bar">
//       {segments.map((segment, index) => (
//         <div
//           key={index}
//           className="ht-segment"
//           style={{
//             width: `${segment.width}%`,
//             backgroundColor: segment.color,
//             border: '2px solid black'
//           }}
//         ></div>
//         ))}
//     </div>
//   );

//   const sections = [
//     {
//       key: 'pesticides',
//       title: 'PESTICIDES',
//       description: 'Long-term direct and indirect exposure to pesticide is responsible for various health problems, including metabolic disorders, gastrointestinal disturbances, and neurological conditions. The pesticides are known to strongly disrupt gut flora and barrier function.',
//       data: data.Pesticides,
//       getSummary: getSummary
//     },
//     {
//       key: 'animalToxins',
//       title: 'PROHIBITED ANTIBIOTICS AND STEROIDS',
//       description: 'Certain classes of antibiotics and steroidal growth regulators used in cattle, poultry and other livestock can enter human bloodstream through their products (meat, milk, eggs) or water contaminated with farm waste if they are marketed before these substances are fully cleared from their systems. These substances can alter human gut microbiota, promote the survival of resistant pathogenic bacteria and disrupt endocrine functions.',
//     //   data: data.Animal_Toxins,
//       getSummary: getAnimalToxinsSummary
//     },
//     {
//       key: 'foreverChemicals',
//       title: 'FOREVER CHEMICALS',
//       description: 'Forever chemicals are synthetic chemicals often used when manufacturing products such as water-repellent clothing and nonstick cookware. PFAS can take thousands of years to degrade and high levels of PFAS exposure with health issues such as cancer and immune system dysfunction.',
//     //   data: data.Forever_Chemicals,
//       getSummary: getForeverChemicalsSummary
//     }
//   ];

//   return (
//     <div className="ht-container">
//       <h2 className="ht-main-title">Harmful Toxins</h2>
      
//       <div className="ht-sections-list">
//         {sections.map((section) => {
//           const hasData = Array.isArray(section.data) && section.data.length > 0;
//           const isExpanded = expandedSection === section.key;
          
//           return (
//             <div key={section.key} className={`ht-section ${isExpanded ? 'ht-expanded' : ''}`}>
//               <div 
//                 className="ht-section-header" 
//                 onClick={() => toggleSection(section.key)}
//               >
//                 <div className="ht-header-content">
//                   <h3 className="ht-section-title">{section.title}</h3>
//                 <div className='flex_toxins'>
//                   <p className="ht-section-description">{section.description}</p>
//                 <div className='summary_bar_percentile'>
//                  {hasData && (
//                     <div className="ht-summary-bar">
//                         {renderSegmentedBar(
//                         (() => {
//                             const bars = section.data.map(t => t.bar);
//                             const totals = bars.map(b => parseInt(b.split('/')[1]));

//                             const mostCommonTotal = totals
//                             .sort((a, b) =>
//                                 totals.filter(v => v === a).length -
//                                 totals.filter(v => v === b).length
//                             )
//                             .pop();

//                             const avgShaded = Math.round(
//                             bars.reduce(
//                                 (sum, b) => sum + parseInt(b.split('/')[0]),
//                                 0
//                             ) / bars.length
//                             );

//                             return generateSegmentedBar(`${avgShaded}/${mostCommonTotal}`);
//                         })()
//                         )}
//                     </div>
//                     )}
                  
//                   {hasData && (
//                 <p className="ht-summary-text">
//                     {section.getSummary(section.data)}
//                 </p>
//                 )}
                  
//                   {!isExpanded && hasData && (
//                     <div className="ht-percentile-preview">
//                       {renderPercentileBar(section.data[0].percentile)}
//                     </div>
//                   )}
//                 </div>
//                 </div>
//                 </div>
//                 <button className="ht-toggle-btn" aria-label={isExpanded ? 'Collapse' : 'Expand'}>
//                   <svg 
//                     width="20" 
//                     height="20" 
//                     viewBox="0 0 20 20" 
//                     fill="none"
//                     className={`ht-chevron ${isExpanded ? 'ht-rotated' : ''}`}
//                   >
//                     <path 
//                       d="M5 7.5L10 12.5L15 7.5" 
//                       stroke="#4A5568" 
//                       strokeWidth="2" 
//                       strokeLinecap="round" 
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </button>
//               </div>

//                 {isExpanded && (
//                 <div className="ht-section-content">
//                     {hasData ? (
//                     <div className="ht-toxins-grid">
//                         {section.data.map((toxin) => (
//                         <div key={toxin.id} className="ht-toxin-card">
//                             <h4 className="ht-toxin-name">{toxin.name}</h4>
//                             <p className="ht-toxin-info">
//                             <strong>Health Impact:</strong> {toxin.healthImpact}
//                             </p>
//                             <p className="ht-toxin-info">
//                             <strong>Sources:</strong> {toxin.sources}
//                             </p>
//                             <p className="ht-toxin-interpretation">
//                             {toxin.interpretation}
//                             </p>
//                             {renderPercentileBar(toxin.percentile)}
//                         </div>
//                         ))}
//                     </div>
//                     ) : (
//                     <div className="not_found_data">
//                         No data available
//                     </div>
//                     )}
//                 </div>
//                 )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default HarmfulToxins;










// import React, { useState } from "react";
// import "../styles/ToxinMetabolites.css";
// import SkeletonCard from "../../components/Skeleton/skeleton";

// const pesticides = {
//   Organochlorines: {
//     description: [
//       "Impact: Hormone-related cancers, Obesity, Diabetes",
// 	  "Sources: grains, fruit, seeds, and vegetables in the control of insects"
//     ]
//   },
//   Neonicotinoids: {
//     description: [
//       "Impact: Neurotoxicity, hormonal disruption, and potential cancer",
// 	  "Sources: Corn, soy, and sugar beet, home gardens, tick and flea control"
//     ]
//   },
//   Organophosphates: {
//     description: [
//       "Impact: Nerve damage, affect organ function, respiratory failure and life-threatening outcomes at high exposures",
// 	  "Sources: Fruits, vegetables, and nuts to control pests"
//     ]
//   },
//   Pyrethroids: {
//     description: [
//       "Impact: Affects nervous system at high exposure",
// 	  "Sources: used in agricultural insecticides, mosquito sprays"
//     ]
//   },
//   Carbamates: {
//     description: [
//       "Impact: loss of appetite, weakness, weight loss, Fatigue",
// 	  "Sources: fruits, vegetables, cotton, potatoes, corn, grapes, rice to control pests"
//     ]
//   }
// };

// const ToxinsMetabolites = ({ data }) => {
//   if (!data) return <SkeletonCard />;

//   const [activeToxinTab, setActiveToxinTab] = useState("pesticides");

//   // ✅ Use backend toxins directly
//   const currentToxinData = data.toxins || [];

//   const renderPercentileBar = (percentile) => (
//     <div className="percentile-bar-container">
//       <div className="percentile-track">
//         <div
//           className="percentile-marker"
//           style={{ left: `${percentile}%` }}
//         >
//           <div className="marker-dot"></div>
//           <div className="marker-label">You</div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="toxins-metabolites-container">
//       <section className="section-block">
//         <h2 className="section-main-title">Environmental Toxins</h2>

//         <div className="cards-grid">
//           {currentToxinData.length === 0 ? (
//             <div className="no-data-message">
//               <p>No data available</p>
//             </div>
//           ) : (
//             currentToxinData.map((item, index) => {
// 				console.log(item)
//               const pesticideInfo =
//                 pesticides[item.toxin_name] || {};

//               return (
//                 <div key={index} className="info-card">
//                   <h3 className="card-title">
//                     {item.toxin_name}
//                   </h3>

//                   {/* Description */}
//                   {pesticideInfo.description &&
//                     pesticideInfo.description.map(
//                       (desc, i) => (
//                         <p key={i} className="card-overview">
//                           {desc}
//                         </p>
//                       )
//                     )}

//                   {/* Functions */}
//                   {pesticideInfo.functions && (
//                     <p className="card-functions">
//                       {pesticideInfo.functions}
//                     </p>
//                   )}

//                     {/* Interpretation from backend */}
//                     <p className="card-percentile-text">
//                     {item.interpretation
//                     }
//                     </p>

//                   {renderPercentileBar(item.percentile)}
//                 </div>
//               );
//             })
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ToxinsMetabolites;
