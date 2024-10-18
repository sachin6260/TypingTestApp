import React from 'react';
import "./Dropdown.css";

const Dropdown = ({ setTime }) => {
  const handleSelect = (e) => {
    setTime(Number(e.target.value));
  };

  return (
    <div>
      <label htmlFor="time-select">Select Time Duration: </label>
      <div className="select-container">
        <select id="time-select" onChange={handleSelect}>
          <option value={30}>30 seconds</option>
          <option value={60}>1 minute</option>
          <option value={120}>2 minutes</option>
          <option value={180}>3 minutes</option>
          <option value={300}>5 minutes</option>
          <option value={600}>10 minutes</option>
        </select>
        <div className="select-arrow"></div> {/* Custom Arrow */}
      </div>
    </div>
  );
};

export default Dropdown;
