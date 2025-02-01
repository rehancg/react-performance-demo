import React, { useState, useCallback } from 'react';
import Button from '../../../../shared/components/Button/Button';

// Expensive child component that we want to optimize
const ExpensiveChild = React.memo(({ onUpdate, type }) => {
  console.log('ExpensiveChild rendering ', type);
  
  // Simulate expensive render
  const startTime = performance.now();
  while (performance.now() - startTime < 100) {
    // Artificial delay of 100ms
  }

  return (
    <div className="expensive-item" onClick={() => onUpdate('Hello from ' + type)}>
      I am an expensive component to render!
    </div>
  );
});

const CallbackDemo = () => {
  const [text, setText] = useState('');

  // Without useCallback - new function created every render
  const handleUpdateBad = (msg) => {
    printMessage(msg);
  };

  // With useCallback - same function reference preserved
  const handleUpdateGood = useCallback((msg) => {
    printMessage(msg);
  }, []); // Empty deps means function reference never changes

  const printMessage = (msg) => {
    console.log('Message from the child - ',msg);
  };

  return (
    <div className="demo-section">
      <h2>useCallback Demo</h2>
      <p className="demo-description">
        Type in the input to trigger parent re-renders.
        Notice how the expensive child without useCallback re-renders unnecessarily.
      </p>

      <div className="demo-controls">
        <input 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type here to trigger re-renders"
        />
      </div>

      <div className="lists-container">
        <div>
          <h3>🐌 Without useCallback</h3>
          <ExpensiveChild onUpdate={handleUpdateBad} type="without useCallback" />
          <small>Re-renders on every parent render</small>
        </div>
        <div>
          <h3>⚡ With useCallback</h3>
          <ExpensiveChild onUpdate={handleUpdateGood} type="with useCallback" />
          <small>Only renders once</small>
        </div>
      </div>
    </div>
  );
};

export default CallbackDemo; 