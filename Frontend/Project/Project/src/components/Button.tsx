// src/components/Button.tsx

import React from 'react';

interface Props {
  items: number[];
  onClick: (item: number) => void;
}

function Button({ items, onClick }: Props) {
  const handleClick = (item: number) => {
    onClick(item);
  };

  return (
    <div
      className="btn-group"
      role="group"
      aria-label="Basic example"
      style={{
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
        margin: '20px 0',
      }}
    >
      {items.map((item) => (
        <button
          key={item}
          type="button"
          className="btn btn-primary"
          style={{
            padding: '12px 24px',
            borderRadius: '10px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.backgroundColor = '#0056b3';
            e.currentTarget.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backgroundColor = '#007BFF';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          }}
          onClick={() => handleClick(item)}
        >
          {item} Words
        </button>
      ))}
    </div>
  );
}

export default Button;
