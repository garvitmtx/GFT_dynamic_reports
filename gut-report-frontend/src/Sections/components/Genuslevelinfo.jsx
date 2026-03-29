import React, { useState, useMemo, useRef } from 'react';
import '../styles/Genuslevelinfo.css';
import SkeletonCard from '../../components/Skeleton/skeleton';

const GenusLevelInfo = ({ data }) => {
  if (!data) {
    return <SkeletonCard />;
  }
  const sectionRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All Types');
  const [showAll, setShowAll] = useState(false);

  const filterOptions = ['All Types', 'High', 'Low'];

  const filteredData = useMemo(() => {
    let filtered = data.genusData || [];

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.genus.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'All Types') {
      filtered = filtered.filter(item => item.level === filterType);
    }

    return filtered;
  }, [searchTerm, filterType, data.genusData]);

  // Show only 10 initially
  const rowsToDisplay = showAll ? filteredData : filteredData.slice(0, 10);

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

  return (
    <div className="genus-level-container" ref={sectionRef}>
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
          <input
            type="text"
            placeholder="Search genus..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-wrapper">
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
        </div>
      </div>

      <div className="table-wrapper">
        {filteredData.length === 0 ? (
          <div className="no-data">
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
                  <th className="th-icon">Gastrointestinal Wellness</th>
                  <th className="th-icon">Mental Health & Well-being</th>
                  <th className="th-icon">Immunity</th>
                  <th className="th-icon">Weight Management</th>
                  <th className="th-icon">Sugar Metabolism</th>
                </tr>
              </thead>
              <tbody>
                {rowsToDisplay.map((item, index) => (
                  <tr key={item.id || index} className={index % 2 === 0 ? 'row-even' : 'row-odd'}>
                    <td className="td-genus">{item.genus}</td>
                    <td className="td-level">
                      <span className={`level-badge ${item.level === 'High' ? 'level-high' : 'level-low'}`}>
                        {item.level}
                      </span>
                    </td>
                    <td className="td-icon">{renderCellContent(item.gastrointestinalWellnes)}</td>
                    <td className="td-icon">{renderCellContent(item.mentalHealthWellBeing)}</td>
                    <td className="td-icon">{renderCellContent(item.immunity)}</td>
                    <td className="td-icon">{renderCellContent(item.weightManagement)}</td>
                    <td className="td-icon">{renderCellContent(item.sugarMetabolism)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredData.length > 10 && (
				<div className="bottom-controls">
				<div className="expand-wrapper">
					<button
					className="expand-btn"
					onClick={() => {
					if (showAll) {
						// If collapsing, scroll back to top
						sectionRef.current?.scrollIntoView({
						behavior: 'smooth',
						block: 'start'
						});
					}

					setShowAll(!showAll);
					}}
					>
					{showAll ? "Show Less" : `Show All (${filteredData.length})`}
					</button>
				</div>

				<div className="role-legend">
					<span className="legend-item helpful">
					+ Plays a helpful role
					</span>
					<span className="legend-item harmful">
					− Plays a harmful role
					</span>
				</div>
				</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GenusLevelInfo;

