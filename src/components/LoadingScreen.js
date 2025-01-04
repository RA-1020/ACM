import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="cyber-spinner">
        <div className="cyber-spinner-inner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-core"></div>
        </div>
        <div className="loading-text">
          Loading<span>.</span><span>.</span><span>.</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 