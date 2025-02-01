import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from './routes/routes.config';

function App() {
  return (
    <div className="app">
      <Routes>
        {routes.map(({ path, component: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </div>
  );
}

export default App; 