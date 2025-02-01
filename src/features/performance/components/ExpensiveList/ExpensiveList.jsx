import React from 'react';
import PropTypes from 'prop-types';

// Simulate expensive rendering
const ExpensiveItem = React.memo(({ item, onClick }) => {
  const renderCount = React.useRef(0);
  console.log(`Rendering ExpensiveItem ${item.id}`);
  renderCount.current += 1;
  
  // Simulate expensive operation
  const startTime = performance.now();
  while (performance.now() - startTime < 50) {  // Increase delay to 50ms
    // Artificial delay
  }

  return (
    <div 
      className="expensive-item"
      onClick={() => onClick(item.id)}
    >
      {item.name}
      <span className="render-count">Renders: {renderCount.current}</span>
    </div>
  );
});

ExpensiveItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

ExpensiveItem.displayName = 'ExpensiveItem';

const ExpensiveList = React.memo(({ items, onItemClick }) => {
  console.log('Rendering ExpensiveList');
  
  return (
    <div className="expensive-list">
      {items.map(item => (
        <ExpensiveItem
          key={item.id}
          item={item}
          onClick={onItemClick}
        />
      ))}
    </div>
  );
});

ExpensiveList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onItemClick: PropTypes.func.isRequired,
};

ExpensiveList.displayName = 'ExpensiveList';

export default ExpensiveList; 