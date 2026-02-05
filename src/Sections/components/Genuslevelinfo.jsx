import React, { useState, useMemo } from 'react';
import '../styles/Genuslevelinfo.css';

// Dummy JSON data
const dummyData = {
  genusData: [
    {
      id: 1,
      genus: "Aeromonas",
      level: "High",
      gastrointestinalWellness: "-",
      mentalHealthWellBeing: "-",
      immunity: "-",
      weightManagement: "-",
      sugarMetabolism: "-"
    },
    {
      id: 2,
      genus: "Anaerobiospirilum",
      level: "High",
      gastrointestinalWellness: "-",
      mentalHealthWellBeing: "-",
      immunity: "-",
      weightManagement: "-",
      sugarMetabolism: "-"
    },
    {
      id: 3,
      genus: "Brevundimonas",
      level: "High",
      gastrointestinalWellness: "-",
      mentalHealthWellBeing: "-",
      immunity: "-",
      weightManagement: "-",
      sugarMetabolism: "-"
    },
    {
      id: 4,
      genus: "Campylobacter",
      level: "High",
      gastrointestinalWellness: "-",
      mentalHealthWellBeing: "-",
      immunity: "-",
      weightManagement: "-",
      sugarMetabolism: "-"
    },
    {
      id: 5,
      genus: "Coprobacter",
      level: "Low",
      gastrointestinalWellness: "+",
      mentalHealthWellBeing: "-",
      immunity: "+",
      weightManagement: "-",
      sugarMetabolism: "-"
    },
    {
      id: 6,
      genus: "Escherichia-Shigella",
      level: "High",
      gastrointestinalWellness: "-",
      mentalHealthWellBeing: "-",
      immunity: "-",
      weightManagement: "-",
      sugarMetabolism: "-"
    },
    {
      id: 7,
      genus: "Fusobacterium",
      level: "High",
      gastrointestinalWellness: "-",
      mentalHealthWellBeing: "-",
      immunity: "-",
      weightManagement: "-",
      sugarMetabolism: "-"
    },
    {
      id: 8,
      genus: "Helicobacter",
      level: "High",
      gastrointestinalWellness: "-",
      mentalHealthWellBeing: "-",
      immunity: "-",
      weightManagement: "-",
      sugarMetabolism: "-"
    }
  ]
};

const GenusLevelInfo = () => {
  const data = dummyData; // Replace with API data: const data = props.data;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All Types');

  // Filter options
  const filterOptions = ['All Types', 'High', 'Low'];

  // Filtered data based on search and filter
  const filteredData = useMemo(() => {
    let filtered = data.genusData;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.genus.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (filterType !== 'All Types') {
      filtered = filtered.filter(item => item.level === filterType);
    }

    return filtered;
  }, [searchTerm, filterType, data.genusData]);

  // Function to render cell content with icon
  const renderCellContent = (value) => {
    if (value === '+') {
      return (
        <span className="cell-positive">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 5V15M5 10H15" stroke="#0F6938" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
      );
    } else if (value === '-') {
      return (
        <span className="cell-negative">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <line x1="5" y1="10" x2="15" y2="10" stroke="#991B1B" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
      );
    }
    return <span className="cell-neutral">{value}</span>;
  };

  // Function to render column header with icon
  const renderColumnIcon = (columnName) => {
    const iconMap = {
      gastrointestinal: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="column-icon">
          <path d="M3 12L6 9L9 15L12 6L15 12L18 9L21 12" stroke="#4A7C7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      mental: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="column-icon">
          <circle cx="12" cy="12" r="9" stroke="#4A7C7E" strokeWidth="2"/>
          <path d="M8 12C8 12 9 9 12 9C15 9 16 12 16 12" stroke="#4A7C7E" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="9" cy="10.5" r="1" fill="#4A7C7E"/>
          <circle cx="15" cy="10.5" r="1" fill="#4A7C7E"/>
        </svg>
      ),
      immunity: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="column-icon">
          <path d="M12 3L4 6V12C4 16.5 7.5 19.5 12 21C16.5 19.5 20 16.5 20 12V6L12 3Z" stroke="#4A7C7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 12L11 14L15 10" stroke="#4A7C7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      weight: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="column-icon">
          <path d="M6 9L9 15H15L18 9M6 9L12 3L18 9M6 9H18" stroke="#4A7C7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="4" y1="19" x2="20" y2="19" stroke="#4A7C7E" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      sugar: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="column-icon">
          <rect x="6" y="9" width="3" height="9" rx="1" stroke="#4A7C7E" strokeWidth="2" fill="none"/>
          <rect x="10.5" y="6" width="3" height="12" rx="1" stroke="#4A7C7E" strokeWidth="2" fill="none"/>
          <rect x="15" y="11" width="3" height="7" rx="1" stroke="#4A7C7E" strokeWidth="2" fill="none"/>
        </svg>
      )
    };

    return iconMap[columnName] || null;
  };

  return (
    <div className="genus-level-container">
      <div className="genus-header">
        <div className="header-text">
          <h2 className="genus-title">Genus-level information</h2>
          <p className="genus-subtitle">
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

      <div className="table-wrapper">
        {filteredData.length === 0 ? (
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
          <div className="table-scroll">
            <table className="genus-table">
              <thead>
                <tr>
                  <th className="th-genus">Genus</th>
                  <th className="th-level">Levels</th>
                  <th className="th-icon">
                    <div className="th-content">
                      {renderColumnIcon('gastrointestinal')}
                      <span className="th-text">Gastrointestinal Wellness</span>
                    </div>
                  </th>
                  <th className="th-icon">
                    <div className="th-content">
                      {renderColumnIcon('mental')}
                      <span className="th-text">Mental Health & Well-being</span>
                    </div>
                  </th>
                  <th className="th-icon">
                    <div className="th-content">
                      {renderColumnIcon('immunity')}
                      <span className="th-text">Immunity</span>
                    </div>
                  </th>
                  <th className="th-icon">
                    <div className="th-content">
                      {renderColumnIcon('weight')}
                      <span className="th-text">Weight Management</span>
                    </div>
                  </th>
                  <th className="th-icon">
                    <div className="th-content">
                      {renderColumnIcon('sugar')}
                      <span className="th-text">Sugar Metabolism</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? 'row-even' : 'row-odd'}>
                    <td className="td-genus">
                      {/* {item.genus === 'Coprobacter' && (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="genus-icon">
                          <rect x="3" y="7" width="14" height="10" rx="2" stroke="#4A7C7E" strokeWidth="1.5" fill="none"/>
                          <path d="M7 7V5C7 4 8 3 9 3H11C12 3 13 4 13 5V7" stroke="#4A7C7E" strokeWidth="1.5"/>
                          <line x1="7" y1="11" x2="13" y2="11" stroke="#4A7C7E" strokeWidth="1.5"/>
                        </svg>
                      )} */}
                      {item.genus}
                    </td>
                    <td className="td-level">
                      <span className={`level-badge ${item.level === 'High' ? 'level-high' : 'level-low'}`}>
                        {item.level}
                      </span>
                    </td>
                    <td className="td-icon">{renderCellContent(item.gastrointestinalWellness)}</td>
                    <td className="td-icon">{renderCellContent(item.mentalHealthWellBeing)}</td>
                    <td className="td-icon">{renderCellContent(item.immunity)}</td>
                    <td className="td-icon">{renderCellContent(item.weightManagement)}</td>
                    <td className="td-icon">{renderCellContent(item.sugarMetabolism)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenusLevelInfo;