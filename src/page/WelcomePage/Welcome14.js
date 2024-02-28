import React, { useState } from 'react';

function DualRangeSlider() {
  const minDistance = 1;
  const [range, setRange] = useState({ min: 20, max: 30 });

  const onMinChange = (event) => {
    const value = Math.min(Number(event.target.value), range.max - minDistance);
    setRange((prevRange) => ({ ...prevRange, min: value }));
  };

  const onMaxChange = (event) => {
    const value = Math.max(Number(event.target.value), range.min + minDistance);
    setRange((prevRange) => ({ ...prevRange, max: value }));
  };

  const trackStyle = {
    left: `${(range.min - 20) / (30 - 20) * 100}%`,
    right: `${100 - (range.max - 20) / (30 - 20) * 100}%`
  };

  return (
    <div className="slider-container">
      <div className="slider-track" />
      <div className="slider-range" style={trackStyle} />
      <input
        type="range"
        min="20"
        max="30"
        value={range.min}
        onChange={onMinChange}
        className="slider3"
        id="min-slider"
      />
      <input
        type="range"
        min="20"
        max="30"
        value={range.max}
        onChange={onMaxChange}
        className="slider3"
        id="max-slider"
      />
      {/* Display for the min and max values */}
      <div className="values-display">
        <div className="min-value-display">{range.min}</div>
        <span> ~ </span>
        <div className="max-value-display">{range.max}</div>
      </div>
    </div>
  );
}

export default DualRangeSlider;