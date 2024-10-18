import React, { useState } from 'react';
import TypingTest from './components/TypingTest';
import Dropdown from './components/Dropdown';
import Result from './components/Result';
import "./App.css"

const App = () => {
  const [time, setTime] = useState(30);  // Default to 30 seconds
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [typingData, setTypingData] = useState(null);

  const startTest = () => {
    setTestStarted(true);
    setTestCompleted(false);
    setTypingData(null);
  };

  const closeTest = () => {
    setTestStarted(false);
    setTestCompleted(true);
  };

  const endTest = (data) => {
    setTestStarted(false);
    setTestCompleted(true);
    setTypingData(data);
  };

  // New function to handle retaking the test
  const retakeTest = () => {
    setTestStarted(false);
    setTestCompleted(false);
    setTypingData(null);
    setTime(30);  // Reset to default time if needed
  };

  return (
    <div className="App">
<h1>Check your typing skills in a minute</h1>
<h3>Improve your typing speed and accuracy by practicing with different texts. Visit our website for more resources!</h3> {/* Added paragraph */}


      {!testStarted && !testCompleted && (
        <>
          <Dropdown setTime={setTime} />
          <button onClick={startTest}>Start Test</button>
        </>
      )}

      {testStarted && (
        <TypingTest 
          duration={time} 
          onClose={closeTest} 
          onComplete={endTest}
        />
      )}

      {testCompleted && (
        <Result typingData={typingData} onRetakeTest={retakeTest} />
      )}
    </div>
  );
};

export default App;
