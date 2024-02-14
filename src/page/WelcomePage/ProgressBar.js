import React, { useState, useEffect } from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    // 전체 너비에 대한 현재 단계의 비율을 계산합니다.
    const updatedWidth = (currentStep / totalSteps) * 100;
    setProgressWidth(updatedWidth);
  }, [currentStep, totalSteps]);

  return (
    <div className="progress-bar-container" style={{ width: '70%' }}>
      <div className="progress-bar" style={{ width: `${progressWidth}%` }}></div>
    </div>
  );
};

export default ProgressBar;
