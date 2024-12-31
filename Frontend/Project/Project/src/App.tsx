// src/App.tsx

import React, { useState, useEffect } from 'react';
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
  const [timer, setTimer] = useState<number>(60); // Timer starts from 60 seconds
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    if (isTimerRunning && timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0) {
      handleSubmit();
      setIsTimerRunning(false);
    }
  }, [timer, isTimerRunning]);

  const handleButtonClick = async (item: number) => {
    setLoading(true);
    setError(null);
    setShowPopup(false);
    try {
      const response = await axios.get(`/get/words`, {
        params: { count: item },
      });
      setWords(response.data); // Assuming API returns an array of words
      setUserInput(''); // Reset user input when new words are fetched
      setCorrectCount(null); // Reset previous results
      setAccuracy(null);
      setTimer(60); // Reset timer to 60 seconds
      setIsTimerRunning(true); // Start the timer
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
    setIsTimerRunning(false); // Stop the timer
    setShowPopup(true); // Show popup with results
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
        <div
          style={{
            margin: '20px 0',
            backgroundColor: '#f0f0f0',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          <p>{words.join(' ')}</p>
        </div>
      )}

      {/* Timer */}
      {isTimerRunning && (
        <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
          Time Left: {timer} seconds
        </p>
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
          style={{
            marginTop: '10px',
            transition: 'transform 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Submit
        </button>
      )}

      {/* Popup with Results */}
      {showPopup && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
          }}
        >
          <h3>Results</h3>
          <p><strong>Correct Characters:</strong> {correctCount}</p>
          <p><strong>Accuracy:</strong> {accuracy?.toFixed(2)}%</p>
          <button
            onClick={() => setShowPopup(false)}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#007BFF',
              color: 'white',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007BFF')}
          >
            Close
          </button>
        </div>
      )}

      {/* Background Overlay for Popup */}
      {showPopup && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
          onClick={() => setShowPopup(false)}
        ></div>
      )}
    </div>
  );
}

export default App;
