// src/components/TextBox.tsx

import React from 'react';

interface TextBoxProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextBox: React.FC<TextBoxProps> = ({ value, onChange }) => {
  return (
    <div className="TextBox">
      <input
        type="text"
        onChange={onChange}
        value={value}
        placeholder="Type the words here..."
        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
      />
    </div>
  );
};

export default TextBox;
