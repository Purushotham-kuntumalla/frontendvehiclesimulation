import React from 'react';
import { Link } from 'react-router-dom';
import './ScenarioItem.css';

const ScenarioItem = ({ scenario, onDelete, onEdit  }) => {
  return (
    <tr>
      <td>{scenario.id}</td>
      <td>{scenario.name}</td>
      <td>{scenario.time}s</td>
      <td>{scenario.vehicles ? scenario.vehicles.length : 0}</td>
      <td>{scenario.vehicles.length}</td>
      <td>
        <Link  to="/add-vehicle" state={{ scenarioId: scenario.id }}>Add Vehicle</Link>
        <button className='btn-2' onClick={onEdit}>Edit</button>
        <button className='btn-2' onClick={onDelete}>Delete</button>
      </td>
      
    </tr>
  );
};

export default ScenarioItem;
