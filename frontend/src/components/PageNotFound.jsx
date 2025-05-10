import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
    }}>
      <h1 style={{ fontSize: '5rem', marginBottom: '1rem' }}>404</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Oops! Page not found.</p>
      <button 
        onClick={() => navigate('/')}
        style={{
          padding: '10px 20px',
          fontSize: '1rem',
          backgroundColor: '#4F46E5',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Go to Home
      </button>
    </div>
  );
};

export default PageNotFound;
