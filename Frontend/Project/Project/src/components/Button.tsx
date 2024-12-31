import React, { useState } from 'react';
import axios from 'axios';

interface Props {
  items: number[];
  onClick: (item: number) => void;
}

function Button({ items, onClick }: Props) {
  const handleClick = (item: number) => {
    onClick(item);
  };

  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          className="btn btn-primary"
          onClick={() => handleClick(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default Button;