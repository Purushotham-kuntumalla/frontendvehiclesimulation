import React, { useState } from 'react';
import axios from 'axios';
import './AddScenarioPage.css';

const AddScenarioPage = () => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '' || time === '') {
      setError('All fields are required');
      return;
    }
    axios.post('http://localhost:5000/scenarios', { name, time: parseInt(time, 10) })
      .then(response => {
        alert('Scenario added successfully');
        setName('');
        setTime('');
        setError('');
      })
      .catch(error => setError('Error adding scenario'));
  };

  return (
    <div className="add-scenario-page">
      <h2>Add Scenario</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Scenario Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Scenario Time (seconds):</label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <button className='btn' type="submit">Add</button>
        <button className='btn' type="reset" onClick={() => { setName(''); setTime(''); setError(''); }}>Reset</button>
      </form>
    </div>
  );
};

export default AddScenarioPage;
