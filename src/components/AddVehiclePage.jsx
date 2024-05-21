import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddVehiclePage.css';

const AddVehiclePage = () => {
  const [scenarios, setScenarios] = useState([]);
  const [selectedScenarioId, setSelectedScenarioId] = useState('');
  const [name, setName] = useState('');
  const [positionX, setPositionX] = useState('');
  const [positionY, setPositionY] = useState('');
  const [speed, setSpeed] = useState('');
  const [direction, setDirection] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/scenarios')
      .then(response => setScenarios(response.data))
      .catch(error => setError('Error fetching scenarios'));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (positionX < 0 || positionX > 1000 || positionY < 0 || positionY > 1000) {
      setError('Position X and Y must be between 0 and 1000');
      return;
    }
    const newVehicle = {
      id: Date.now(),
      name,
      positionX: parseInt(positionX),
      positionY: parseInt(positionY),
      speed: parseInt(speed),
      direction,
      isVisible: true
    };

    axios.put(`http://localhost:5000/scenarios/${selectedScenarioId}/vehicles`, newVehicle)
      .then(() => {
        setSelectedScenarioId('');
        setName('');
        setPositionX('');
        setPositionY('');
        setSpeed('');
        setDirection('');
        setError('');
      })
      .catch(error => setError('Error adding vehicle'));
  };

  return (
    <div className="add-vehicle-page">
      <h2>Add Vehicle</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Scenario:</label>
          <select value={selectedScenarioId} onChange={(e) => setSelectedScenarioId(e.target.value)} required>
            <option value="">Select Scenario</option>
            {scenarios.map(scenario => (
              <option key={scenario.id} value={scenario.id}>{scenario.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Vehicle Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Position X:</label>
          <input
            type="number"
            value={positionX}
            onChange={(e) => setPositionX(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Position Y:</label>
          <input
            type="number"
            value={positionY}
            onChange={(e) => setPositionY(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Speed:</label>
          <input
            type="number"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Direction:</label>
          <select value={direction} onChange={(e) => setDirection(e.target.value)} required>
            <option value="">Select Direction</option>
            <option value="Towards">Towards</option>
            <option value="Backwards">Backwards</option>
            <option value="Upwards">Upwards</option>
            <option value="Downwards">Downwards</option>
          </select>
        </div>
        <button className='btn-3' type="submit">Add</button>
        <button className='btn-3' type="reset" onClick={() => { setSelectedScenarioId(''); setName(''); setPositionX(''); setPositionY(''); setSpeed(''); setDirection(''); setError(''); }}>Reset</button>
      </form>
    </div>
  );
};

export default AddVehiclePage;
