import React from 'react';
import { useNavigate } from 'react-router-dom';

const CloseButton = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <button 
      onClick={handleClose}
      style={{
        position: 'fixed',
        top: '40px',
        left: '30px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '25px',
        color: '#FFFFFF',
      }}
    >
      X
    </button>
  );
};

export default CloseButton;
