import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from 'react-use-clipboard';
import './App.css';

const App = () => {
  const [textToCopy, setTextToCopy] = useState('');
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,
  });

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: 'en-PK' });
  const { transcript, resetTranscript } = useSpeechRecognition();

  const handleCopy = () => {
    setTextToCopy(transcript);
    setCopied();
  };

  const clearTranscript = () => {
    setTextToCopy(resetTranscript)
  };

  // Update displayedText when transcript changes

  return (
    <div className="container w-100">
      <h2>Speech to Text Converter</h2>
      <br />
      <p>
        {textToCopy?textToCopy:'A React hook that converts speech from the microphone to text and makes it available to your React components.'}
      </p>

      <div className="main-content" style={{width:'1000px'}} onClick={handleCopy}>
        {transcript}
      </div>

      <div className="btn-style">
        <button onClick={handleCopy}>{isCopied ? 'Copied!' : 'Copy to clipboard'}</button>
        <button onClick={startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={clearTranscript}>Clear</button>
      </div>
    </div>
  );
};

export default App;
