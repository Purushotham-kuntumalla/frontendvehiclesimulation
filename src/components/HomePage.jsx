import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const [scenarios, setScenarios] = useState([]);
  const [currentScenario, setCurrentScenario] = useState(null);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/scenarios')
      .then(response => setScenarios(response.data))
      .catch(error => setError('Error fetching scenarios'));
  }, []);

  useEffect(() => {
    let interval;
    if (simulationRunning && currentScenario) {
      interval = setInterval(() => {
        setCurrentScenario((prevScenario) => {
          const updatedVehicles = prevScenario.vehicles.map(vehicle => {
            let { positionX, positionY, speed, direction } = vehicle;
            switch (direction) {
              case 'Towards':
                positionX += speed;
                break;
              case 'Backwards':
                positionX -= speed;
                break;
              case 'Upwards':
                positionY -= speed;
                break;
              case 'Downwards':
                positionY += speed;
                break;
              default:
                break;
            }
            // Hide vehicle if it goes outside the container (assuming container size 1000x1000)
            const isVisible = positionX >= 0 && positionX <= 915 && positionY >= 0 && positionY <= 900;
            return { ...vehicle, positionX, positionY, isVisible };
          });
          return { ...prevScenario, vehicles: updatedVehicles };
        });
      }, 1000);

      setTimeout(() => {
        setSimulationRunning(false);
        clearInterval(interval);
      }, currentScenario.time * 1000);
    }
    return () => clearInterval(interval);
  }, [simulationRunning, currentScenario]);

  const handleScenarioChange = (e) => {
    const scenarioId = parseInt(e.target.value, 10);
    const scenario = scenarios.find(scenario => scenario.id === scenarioId);
    setCurrentScenario(scenario);
  };

  const startSimulation = () => {
    setSimulationRunning(true);
  };

  return (
    <div className="home-page">
      <h2>Vehicle Simulation</h2>
      {error && <div className="error">{error}</div>}
      <div>
        <label>Select Scenario:</label>
        <select onChange={handleScenarioChange}>
          <option value="">Select</option>
          {scenarios.map(scenario => (
            <option key={scenario.id} value={scenario.id}>{scenario.name}</option>
          ))}
        </select>
      </div>
      {currentScenario && (
        <div className="scenario-details">
          <h3>Scenario: {currentScenario.name}</h3>
          <div>
            <button onClick={startSimulation} disabled={simulationRunning}>
              {simulationRunning ? 'Simulation Running' : 'Start Simulation'}
            </button>
          </div>
          <div className="container">
            <div className="vehicles">
              {currentScenario.vehicles.map(vehicle => (
                <div
                  key={vehicle.id}
                  className="vehicle"
                  style={{
                    display: vehicle.isVisible === false ? 'none' : 'block',
                    left: `${vehicle.positionX}px`,
                    top: `${vehicle.positionY}px`
                  }}
                >
                  <img src="https://img.freepik.com/premium-vector/vector-design-addons-icon-style_1134108-88653.jpg" alt="" />
                  <p className='para-id'>({vehicle.name})</p>
                  
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
