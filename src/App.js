import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import AddScenarioPage from './components/AddScenarioPage';
import AllScenariosPage from './components/AllScenariosPage';
import AddVehiclePage from './components/AddVehiclePage';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/add-scenario">Add Scenario</a></li>
            <li><a href="/all-scenarios">All Scenarios</a></li>
            <li><a href="/add-vehicle">Add Vehicle</a></li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-scenario" element={<AddScenarioPage />} />
            <Route path="/all-scenarios" element={<AllScenariosPage />} />
            <Route path="/add-vehicle" element={<AddVehiclePage />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
};

export default App;
