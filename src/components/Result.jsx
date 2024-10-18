import React from 'react';
import "./Result.css"

const Result = ({ typingData, onRetakeTest }) => {
  if (!typingData) return null;

  const { grossWPM, netWPM, accuracy, errors } = typingData;

  return (
    <div className="result-container">
      <h2 className="result-title">Your Test Score</h2>
      <p className="result-item">Gross WPM: <span>{grossWPM.toFixed(2)}</span></p>
      <p className="result-item">Net WPM: <span>{netWPM.toFixed(2)}</span></p>
      <p className="result-item">Accuracy: <span>{accuracy.toFixed(2)}%</span></p>
      <p className="result-item">Errors: <span>{errors}</span></p>

      {/* Button to retake the test */}
      <button className="retake-button" onClick={onRetakeTest}>Retake Test</button>
    </div>
  );
};

export default Result;
