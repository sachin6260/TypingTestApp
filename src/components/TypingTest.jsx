import React, { useState, useEffect, useRef } from 'react';
import './TypingTest.css';

const TypingTest = ({ duration, onClose, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [typedText, setTypedText] = useState('');
  const [questions, setQuestions] = useState([]);
  const [errors, setErrors] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const intervalRef = useRef(null);  // Timer reference

  useEffect(() => {
    const questionSet = generateQuestions(duration);
    setQuestions(questionSet);
  }, [duration]);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          clearInterval(intervalRef.current);
          handleComplete();
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleTyping = (e) => {
    if (!testStarted) {
      setTestStarted(true);
      startTimer();
    }

    const input = e.target.value;
    setTypedText(input);

    const currentErrors = calculateErrors(input, questions.join(' '));
    setErrors(currentErrors);

    if (input.trim() === questions.join(' ').trim()) {
      handleComplete();
    }
  };

  const handleComplete = () => {
    const totalCharsTyped = typedText.length;
    const correctChars = calculateCorrectCharacters(typedText, questions.join(' '));
    const errorCount = totalCharsTyped - correctChars;
    const grossWPM = calculateGrossWPM(totalCharsTyped, duration);
    const accuracy = calculateAccuracy(correctChars, totalCharsTyped);
    const netWPM = grossWPM * (accuracy / 100);

    onComplete({
      grossWPM: isNaN(grossWPM) ? 0 : grossWPM,
      netWPM: isNaN(netWPM) ? 0 : netWPM,
      accuracy: isNaN(accuracy) ? 0 : accuracy,
      errors: errorCount,
      duration,
    });

    clearInterval(intervalRef.current);
    setCompleted(true);
  };

  const handleRestart = () => {
    setTypedText('');
    setErrors(0);
    setCompleted(false);
    setTimeLeft(duration);
    setTestStarted(false);
    setQuestions(generateQuestions(duration));
  };

  const renderHighlightedText = () => {
    const questionWords = questions.join(' ').split(' ');
    const typedWords = typedText.split(' ');

    return questionWords.map((word, index) => {
      const typedWord = typedWords[index] || ''; 
      const isCorrect = word === typedWord;

      return (
        <span
          key={index}
          className={isCorrect ? 'correct-word' : 'incorrect-word'}
        >
          {word}{' '}
        </span>
      );
    });
  };

  return (
    <div className='typing-test-container'>
      <h2>Time left: {timeLeft} seconds</h2>
      <div>
        <h3>Type the following text:</h3>
        <p className="highlight-text">{renderHighlightedText()}</p>
        <textarea
          value={typedText}
          onChange={handleTyping}
          disabled={completed}
          placeholder="Start typing to begin the test"
        />
      </div>
      <p>Errors: {errors}</p>

      <div>
        {!completed && testStarted && (
          <button onClick={handleComplete}>Close Test</button>
        )}
        {completed && (
          <>
            <button onClick={onClose}>Close Result</button>
            <button onClick={handleRestart}>Retake Test</button> {/* Added Retake Test Button */}
          </>
        )}
      </div>
    </div>
  );
};

// Extended set of questions for typing
const generateQuestions = (time) => {
  const questionList = [
    'The quick brown fox jumps over the lazy dog.',
    'Typing speed is essential for productivity.',
    'React is a powerful library for building user interfaces.',
    'Test your typing skills to improve.',
    'Practice makes perfect in typing.',
    'Developing your typing speed can enhance productivity significantly.',
    'The keyboard is a tool used by many but mastered by few.',
    'JavaScript is a versatile language for both client-side and server-side programming.',
    'Working on real-world projects will improve your programming skills.',
    'The mouse and keyboard are essential tools for developers and typists alike.',
    'Learning to touch type can increase your efficiency when writing code or text.',
    'The ability to type quickly and accurately is a valuable skill in many professions.',
    'Accuracy is as important as speed in typing tests.',
    'One who masters typing can save hours of work over the course of a lifetime.',
    'Many coding challenges require both quick thinking and quick typing.',
    'The more you practice typing, the faster and more accurate you will become.',
    'Typing tests can help improve your focus and concentration over time.',
    'Programming languages like Python and JavaScript are widely used in web development.',
    'Consistent typing practice leads to improved muscle memory and typing efficiency.',
    'To excel in programming, typing speed and accuracy are essential skills.',
    'Keyboard shortcuts can significantly improve productivity while coding.',
    'Touch typing is the ability to type without looking at the keyboard, making typing faster.',
    'Developing good typing habits can prevent long-term strain on your hands and wrists.',
    'Accurate typing is essential when debugging code or entering important data.',
    'Typing is a skill that can be improved with regular and deliberate practice.',
    'A high typing speed can be beneficial in fast-paced work environments.',
    'Mastering typing can save time in completing daily tasks and communication.',
  ];

  const count = Math.floor(time / 60);  
  return questionList.slice(0, count + 3);  // Generate more text for longer durations
};

// Calculate errors based on what the user typed and the reference question
const calculateErrors = (typed, reference) => {
  const typedWords = typed.trim().split(/\s+/);
  const referenceWords = reference.trim().split(/\s+/);
  let errors = 0;
  referenceWords.forEach((word, index) => {
    if (typedWords[index] !== word) errors++;
  });
  return errors;
};

// Calculate correct characters typed
const calculateCorrectCharacters = (typed, reference) => {
  let correctChars = 0;
  for (let i = 0; i < Math.min(typed.length, reference.length); i++) {
    if (typed[i] === reference[i]) {
      correctChars++;
    }
  }
  return correctChars;
};

// Calculate words per minute
const calculateGrossWPM = (totalCharsTyped, duration) => {
  const timeInMinutes = duration / 60;
  return (totalCharsTyped / 5) / timeInMinutes;
};

// Calculate accuracy of typing
const calculateAccuracy = (correctChars, totalCharsTyped) => {
  return totalCharsTyped > 0 ? (correctChars / totalCharsTyped) * 100 : 0;
};

export default TypingTest;
