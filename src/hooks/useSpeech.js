import { useState, useEffect, useRef } from "react";

/**
 * Custom hook: useSpeech
 * Adds voice input functionality using the Web Speech API
 * @param {function} onResult - callback function invoked when speech is recognized
 */
function useSpeech(onResult) {
  // State to track if the microphone is actively listening
  const [listening, setListening] = useState(false);

  // State to track if the browser supports SpeechRecognition
  const [supported, setSupported] = useState(true);

  // Ref to store the SpeechRecognition instance
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check for browser support: standard or webkit prefixed
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupported(false); // browser doesn't support speech recognition
      return;
    }

    // Create a new recognition instance
    const recognition = new SpeechRecognition();

    // Configuration
    recognition.continuous = false; // stop automatically after one phrase
    recognition.interimResults = false; // we only want the final result
    recognition.lang = "en-US"; // language

    // Event: when the microphone starts listening
    recognition.onstart = () => setListening(true);

    // Event: when the microphone stops listening
    recognition.onend = () => setListening(false);

    // Event: any errors during speech recognition
    recognition.onerror = (e) => {
      console.error("Speech recognition error:", e.error);
      setListening(false);
    };

    /**
     * Event: onresult
     * Triggered when speech recognition returns a result
     * event.results is a SpeechRecognitionResultList (array-like)
     *
     * Structure:
     * event.results = [
     *   SpeechRecognitionResult {  // results[0]
     *     0: SpeechRecognitionAlternative { transcript: "Hello world", confidence: 0.98 }, // most likely interpretation
     *     1: SpeechRecognitionAlternative { transcript: "Hello ward", confidence: 0.65 }, // alternative interpretations
     *     isFinal: true
     *   },
     *   SpeechRecognitionResult { ... } // results[1] if continuous=true and user spoke multiple phrases
     * ]
     *
     * - results[0] => first recognition result chunk
     * - results[0][0] => most likely interpretation (SpeechRecognitionAlternative)
     * - results[0][0].transcript => the recognized text
     */
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript; // extract spoken text
      if (onResult) onResult(transcript); // call the callback with the text
    };

    // Store the recognition instance in the ref for later control
    recognitionRef.current = recognition;
  }, [onResult]);

  // Function to start listening
  const startListening = () => {
    if (recognitionRef.current) recognitionRef.current.start();
  };

  // Function to stop listening
  const stopListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
  };

  // Return states and functions for use in components
  return { listening, supported, startListening, stopListening };
}

export default useSpeech;
