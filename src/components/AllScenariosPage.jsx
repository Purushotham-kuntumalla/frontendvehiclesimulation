import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScenarioItem from './ScenarioItem';
import './AllScenariosPage.css';

const AllScenariosPage = () => {
  const [scenarios, setScenarios] = useState([]);
  const [error, setError] = useState('');
  const [editingScenario, setEditingScenario] = useState(null);
  const [editName, setEditName] = useState('');
  const [editTime, setEditTime] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/scenarios')
      .then(response => setScenarios(response.data))
      .catch(error => setError('Error fetching scenarios'));
  }, []);

  const deleteScenario = (id) => {
    axios.delete(`http://localhost:5000/scenarios/${id}`)
      .then(() => setScenarios(scenarios.filter(scenario => scenario.id !== id)))
      .catch(error => setError('Error deleting scenario'));
  };

  const startEditing = (scenario) => {
    setEditingScenario(scenario);
    setEditName(scenario.name);
    setEditTime(scenario.time);
  };

  const cancelEditing = () => {
    setEditingScenario(null);
    setEditName('');
    setEditTime('');
  };

  const saveScenario = (id) => {
    const updatedScenario = { ...editingScenario, name: editName, time: editTime };

    axios.put(`http://localhost:5000/scenarios/${id}`, updatedScenario)
      .then(response => {
        setScenarios(scenarios.map(scenario => (scenario.id === id ? response.data : scenario)));
        cancelEditing();
      })
      .catch(error => setError('Error updating scenario'));
  };

  return (
    <div className="all-scenarios-page">
      <h2>All Scenarios</h2>
      {error && <div className="error">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Time</th>
            <th>Vehicles</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {scenarios.map(scenario => (
            scenario.id === (editingScenario && editingScenario.id) ? (
              <tr key={scenario.id}>
                <td>{scenario.id}</td>
                <td>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={editTime}
                    onChange={(e) => setEditTime(e.target.value)}
                  />
                </td>
                <td>{scenario.vehicles.length}</td>
                <td>
                  <button className='btn-1' onClick={() => saveScenario(scenario.id)}>Save</button>
                  <button className='btn-1' onClick={cancelEditing}>Cancel</button>
                </td>
              </tr>
            ) : (
              <ScenarioItem
                key={scenario.id}
                scenario={scenario}
                onDelete={() => deleteScenario(scenario.id)}
                onEdit={() => startEditing(scenario)}
              />
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllScenariosPage;
