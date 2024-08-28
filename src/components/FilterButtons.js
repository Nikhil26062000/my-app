import React, { useState } from 'react';
import { useSession } from '../components/SessionContext'; 

const FilterButtons = ({ onFilterChange }) => {
  const { session } = useSession();
  const buttonColor = session.headerFooterColor || '#000'; 

  const filterOptions = ['All', 'Land', 'Animals', 'Tree'];
  const [selectedFilter, setSelectedFilter] = useState('All'); 

  const handleButtonClick = (species_type) => {
    setSelectedFilter(species_type);
    onFilterChange(species_type);
  };

  return (
    <div style={styles.container}>
      {filterOptions.map(option => (
        <button
          key={option}
          onClick={() => handleButtonClick(option)}
          style={{
            ...styles.button,
            backgroundColor: option === selectedFilter ? buttonColor : 'transparent',
            color: option === selectedFilter ? '#FFFFFF' : buttonColor,
            borderColor: option === selectedFilter ? 'transparent' : buttonColor,
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

// Styles object
const styles = {
  container: {
    display: 'flex',
    justifyContent:'space-around', 
    alignItems: 'center',
    padding: '15px',
    maxWidth: '100%', 
    boxSizing: 'border-box',
  },
  button: {
    flex: '1', 
    margin: '0 5px', 
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: '1px solid',
    borderRadius: '10px',
    transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
    textAlign: 'center',
  },
};

export default FilterButtons;
