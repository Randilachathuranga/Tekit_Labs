import React from 'react';
import './Dashboard.css'; 

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Welcome to the Admin Dashboard</h1>
      <p>This is the overview panel where you can manage blog posts, view analytics, and adjust settings.</p>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h2>Total Posts</h2>
          <p>120</p>
        </div>
        <div className="dashboard-card">
          <h2>Site Visitors</h2>
          <p>3,500</p>
        </div>
        <div className="dashboard-card">
          <h2>Pending Reviews</h2>
          <p>8</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
