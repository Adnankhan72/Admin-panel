import React from 'react';
import { Link } from 'react-router-dom'; // Correct import
import './Rolemanagement.css';

const Rolemanagement = () => {
  return (
    <div className="banner">
      <div className="content">
        <div className="title">ADMIN </div>
        {/* Use Link with 'to' prop to navigate */}
        <div className='btn'>
      <button> <Link to="/employee">Go to Admin Dashboard</Link></button> 
      </div>
      </div>
    </div>
  );
}

export default Rolemanagement;
