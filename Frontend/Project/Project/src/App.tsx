// src/App.tsx

import React, { useState } from 'react';
import Button from './components/Button';
import TextBox from './components/TextBox';
import axios from 'axios';

function App() {
  const items = [10, 25, 50];
  const [words, setWords] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [correctCount, setCorrectCount] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleButtonClick = async (item: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/get/words`, {
        params: { count: item },
      });
      setWords(response.data); // Assuming API returns an array of words
      setUserInput(''); // Reset user input when new words are fetched
      setCorrectCount(null); // Reset previous results
      setAccuracy(null);
    } catch (error) {
      console.error('Error fetching words:', error);
      setError('Failed to fetch words. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (words.length === 0) return;

    // Combine the words into a single string separated by spaces
    const referenceText = words.join(' ');

    // Compare userInput with referenceText character by character
    let correct = 0;
    const typedChars = userInput.split('');
    const referenceChars = referenceText.split('');

    const minLength = Math.min(typedChars.length, referenceChars.length);
    for (let i = 0; i < minLength; i++) {
      if (typedChars[i] === referenceChars[i]) {
        correct += 1;
      }
    }

    // Calculate accuracy
    const totalTypedChars = typedChars.length;
    const accuracyResult = totalTypedChars > 0 ? (correct / totalTypedChars) * 100 : 0;

    // Update state with results
    setCorrectCount(correct);
    setAccuracy(accuracyResult);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Typing Test</h2>
      <Button items={items} onClick={handleButtonClick} />

      {/* Loading Indicator */}
      {loading && <p>Loading words...</p>}

      {/* Error Message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display words */}
      {words.length > 0 && (
        <div style={{ margin: '20px 0', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
          <p>{words.join(' ')}</p>
        </div>
      )}

      {/* TextBox with value and onChange */}
      {words.length > 0 && (
        <TextBox
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
      )}

      {/* Submit button */}
      {words.length > 0 && (
        <button
          type="button"
          className="btn btn-success"
          onClick={handleSubmit}
          style={{ marginTop: '10px' }}
        >
          Submit
        </button>
      )}

      {/* Display Results */}
      {correctCount !== null && accuracy !== null && (
        <div style={{ marginTop: '20px', backgroundColor: '#e0ffe0', padding: '10px', borderRadius: '5px' }}>
          <p><strong>Correct Characters:</strong> {correctCount}</p>
          <p><strong>Accuracy:</strong> {accuracy.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
