import React, { useState } from 'react';
import Button from '../../../../shared/components/Button/Button';
import MemoDemo from '../MemoDemo/MemoDemo';
import CallbackDemo from '../CallbackDemo/CallbackDemo';
import UseMemoDemo from '../UseMemoDemo/UseMemoDemo';
import '../../styles/performance.css';

const PerformanceDemo = () => {
  const [activeDemo, setActiveDemo] = useState('memo');

  const demoTypes = [
    { id: 'memo', label: 'React.memo' },
    { id: 'callback', label: 'useCallback' },
    { id: 'useMemo', label: 'useMemo' },
  ];

  const renderActiveDemo = () => {
    switch (activeDemo) {
      case 'callback':
        return <CallbackDemo />;
      case 'memo':
        return <MemoDemo />;
      case 'useMemo':
        return <UseMemoDemo />;
      default:
        return null;
    }
  };

  return (
    <div className="performance-demo">
      <h1>Performance Demo</h1>
      
      <div className="demo-section demo-toggles">
        <h2>Select Demo Type</h2>
        <div className="toggle-buttons">
          {demoTypes.map(demo => (
            <Button
              key={demo.id}
              onClick={() => setActiveDemo(demo.id)}
              variant={activeDemo === demo.id ? 'primary' : 'secondary'}
            >
              {demo.label}
            </Button>
          ))}
        </div>
      </div>

      {renderActiveDemo()}
    </div>
  );
};

export default PerformanceDemo; 