import React, { useState, useMemo } from 'react';
import '../styles/TopMicrobes.css';

// Dummy JSON data
const dummyData = {
  microbesToBoost: [
    {
      id: 1,
      genus: "Lactococcus",
      functionsImpacted: ["Immunity", "Mental Wellness"],
		"markerPosition": 65
    },
    {
      id: 2,
      genus: "Coprobacter",
      functionsImpacted: ["Immunity", "Mental Wellness"],
      "markerPosition": 65
    },
    {
      id: 3,
      genus: "Pantoea",
      functionsImpacted: ["Gastrointestinal Wellness", "Mental Wellness"],
      "markerPosition": 65
    },
    {
      id: 4,
      genus: "Ruminiclostridium",
      functionsImpacted: ["Immunity", "Mental Wellness", "Sugar Metabolism"],
      "markerPosition": 65
    }
  ],
  microbesToReduce: [
    {
      id: 5,
      genus: "Helicobacter",
      functionsImpacted: ["Immunity", "Mental Wellness"],
      "markerPosition": 65
    },
    {
      id: 6,
      genus: "Tanerella",
      functionsImpacted: ["Immunity", "Mental Wellness"],
      "markerPosition": 65
    },
    {
      id: 7,
      genus: "Sphingobacterium",
      functionsImpacted: ["Gastrointestinal Wellness", "Mental Wellness"],
	  "markerPosition": 65
    },
    {
      id: 8,
      genus: "Soonwooa",
      functionsImpacted: ["Immunity", "Mental Wellness", "Sugar Metabolism"],
      "markerPosition": 65
    }
  ]
};

const BAR_SEGMENTS = [
  { color: "#6B2C3E", width: 35},
  { color: "#A5866B", width: 35 },
  { color: "#2C7A7B", width: 35 }
];
const TopMicrobes = () => {
  const data = dummyData; // Replace with API data: const data = props.data;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All Types');

  // Filter options
  const filterOptions = ['All Types', 'Boost', 'Reduce'];

  // Combined and filtered data
  const filteredBoostData = useMemo(() => {
    let filtered = data.microbesToBoost;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.genus.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, data.microbesToBoost]);

  const filteredReduceData = useMemo(() => {
    let filtered = data.microbesToReduce;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.genus.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, data.microbesToReduce]);

  // Determine what to show based on filter
  const showBoost = filterType === 'All Types' || filterType === 'Boost';
  const showReduce = filterType === 'All Types' || filterType === 'Reduce';

  const hasData = (showBoost && filteredBoostData.length > 0) || (showReduce && filteredReduceData.length > 0);

  return (
    <div className="top-microbes-container">
      <div className="microbes-header">
        <div className="header-text">
          <h2 className="microbes-title">Genus-level information on the top 5 microbes to boost and reduce</h2>
          <p className="microbes-subtitle">
            Detailed breakdown of detected microbial genera compared to healthy control population
          </p>
        </div>
      </div>

      <div className="controls-wrapper">
        <div className="search-wrapper">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="search-icon">
            <circle cx="9" cy="9" r="6" stroke="#6B7280" strokeWidth="2"/>
            <path d="M13.5 13.5L17 17" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search genus..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-wrapper">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="filter-icon">
            <path d="M3 5H17M5 10H15M8 15H12" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select"
          >
            {filterOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="dropdown-icon">
            <path d="M6 8L10 12L14 8" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className="microbes-content">
        {!hasData ? (
          <div className="no-data">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="no-data-icon">
              <circle cx="40" cy="40" r="35" stroke="#D1D5DB" strokeWidth="3"/>
              <path d="M40 25V45" stroke="#D1D5DB" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="40" cy="55" r="2" fill="#D1D5DB"/>
            </svg>
            <p className="no-data-text">No data to show</p>
            <p className="no-data-subtext">Try adjusting your search or filter</p>
          </div>
        ) : (
          <>
            {showBoost && filteredBoostData.length > 0 && (
              <div className="microbes-section">
                <h3 className="section-title">Top 5 microbes to boost</h3>
                <div className="microbes-list">
                  {filteredBoostData.map((microbe) => (
                    <div key={microbe.id} className="microbe-card">
                      <div className="microbe-info">
                        <h4 className="microbe-genus">{microbe.genus}</h4>
                        <p className="microbe-functions">
                          Functions impacted : {microbe.functionsImpacted.join(', ')}
                        </p>
                      </div>
                      <div className="microbe-bar-container">
						<div className="microbe-bar">
							{/* Dynamic Marker */}
							<div
								className="bar-marker"
								style={{ left: `${microbe.markerPosition}%` }}
							></div>
							
							{/* Static Segments */}
							{BAR_SEGMENTS.map((segment, index) => (
								<div
								key={index}
								className="bar-segment"
								style={{
									width: `${segment.width}%`,
									backgroundColor: segment.color
								}}
								/>
							))}
							</div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showReduce && filteredReduceData.length > 0 && (
              <div className="microbes-section">
                <h3 className="section-title">Top 5 microbes to reduce</h3>
                <div className="microbes-list">
                  {filteredReduceData.map((microbe) => (
                    <div key={microbe.id} className="microbe-card">
                      <div className="microbe-info">
                        <h4 className="microbe-genus">{microbe.genus}</h4>
                        <p className="microbe-functions">
                          Functions impacted : {microbe.functionsImpacted.join(', ')}
                        </p>
                      </div>
                      <div className="microbe-bar-container">
						<div className="microbe-bar">
							{/* Dynamic Marker */}
							<div
								className="bar-marker"
								style={{ left: `${microbe.markerPosition}%` }}
							></div>
							
							{/* Static Segments */}
							{BAR_SEGMENTS.map((segment, index) => (
								<div
								key={index}
								className="bar-segment"
								style={{
									width: `${segment.width}%`,
									backgroundColor: segment.color
								}}
								/>
							))}
							</div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TopMicrobes;