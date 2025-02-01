import React, { useState } from 'react';
import Button from '../../../../shared/components/Button/Button';

// Regular Component (Without Memo)
const RegularItem = ({ text }) => {
  console.log(`Rendering RegularItem: ${text}`);
  const renderCount = React.useRef(0);
  renderCount.current += 1;

  // Simulate expensive render
  const startTime = performance.now();
  while (performance.now() - startTime < 50) {
    // Artificial delay
  }

  return (
    <div className="expensive-item">
      {text}
      <span className="render-count">Renders: {renderCount.current}</span>
    </div>
  );
};

// Memoized Component
const MemoizedItem = React.memo(({ text }) => {
  console.log(`Rendering MemoizedItem: ${text}`);
  const renderCount = React.useRef(0);
  renderCount.current += 1;

  // Simulate expensive render
  const startTime = performance.now();
  while (performance.now() - startTime < 50) {
    // Artificial delay
  }

  return (
    <div className="expensive-item">
      {text}
      <span className="render-count">Renders: {renderCount.current}</span>
    </div>
  );
});

const MemoDemo = () => {
  const [count, setCount] = useState(0);
  const items = ['Item 1', 'Item 2', 'Item 3'];

  return (
    <div className="demo-section">
      <h2>React.memo Demo</h2>
      <p className="demo-description">
        React.memo prevents re-renders when props haven't changed.
        Click the button and watch the render counts.
      </p>

      <Button onClick={() => setCount(c => c + 1)}>
        Trigger Re-render (Count: {count})
      </Button>

      <div className="lists-container">
        <div>
          <h3>🐌 Without React.memo</h3>
          <div className="expensive-list">
            {items.map(item => (
              <RegularItem key={item} text={item} />
            ))}
          </div>
        </div>
        <div>
          <h3>⚡ With React.memo</h3>
          <div className="expensive-list">
            {items.map(item => (
              <MemoizedItem key={item} text={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoDemo; 