import React, { useState, useMemo } from 'react';
import Button from '../../../../shared/components/Button/Button';

const UseMemoDemo = () => {
  // Calculation-related state
  const [count, setCount] = useState(0);
  const [items] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  
  // Unrelated state that causes re-renders
  const [unrelatedState, setUnrelatedState] = useState(0);

  // Expensive calculation without memoization
  const expensiveCalculationBad = () => {
    console.log('Running expensive calculation without memo');
    const startTime = performance.now();
    
    // Simulate expensive calculation
    while (performance.now() - startTime < 100) {
      // Artificial delay
    }

    return items.reduce((total, item) => {
      return total + (item * count);
    }, 0);
  };

  // Expensive calculation with memoization
  const expensiveCalculationGood = useMemo(() => {
    console.log('Running expensive calculation with memo');
    const startTime = performance.now();
    
    // Simulate expensive calculation
    while (performance.now() - startTime < 100) {
      // Artificial delay
    }

    return items.reduce((total, item) => {
      return total + (item * count);
    }, 0);
  }, [items, count]); // Only recalculate if items or count changes

  return (
    <div className="demo-section">
      <h2>useMemo Demo</h2>
      <p className="demo-description">
        useMemo memoizes expensive calculations.
        The unrelated state changes trigger re-renders but don't affect the calculation.
      </p>

      <div className="demo-controls">
        <div>
          <h3>Calculation Input</h3>
          <Button onClick={() => setCount(c => c + 1)}>
            Increment Count: {count}
          </Button>
        </div>

        <div>
          <h3>Unrelated State</h3>
          <Button onClick={() => setUnrelatedState(s => s + 1)}>
            Update Unrelated State: {unrelatedState}
          </Button>
        </div>
      </div>

      <div className="calculation-container">
        <div className="calculation-box">
          <h3>🐌 Without useMemo</h3>
          <p>Result: {expensiveCalculationBad()}</p>
          <small>
            This recalculates on EVERY render,<br/>
            even when unrelated state changes
          </small>
        </div>
        <div className="calculation-box">
          <h3>⚡ With useMemo</h3>
          <p>Result: {expensiveCalculationGood}</p>
          <small>
            This only recalculates when<br/>
            count or items change
          </small>
        </div>
      </div>
    </div>
  );
};

export default UseMemoDemo; 