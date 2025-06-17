import React, { useState, useEffect, useRef, useCallback } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const steps = [
  {
    id: '1',
    message: 'Hello! Welcome to Saravana Infrastructures. How can I help you today?',
    trigger: 'options',
  },
  {
    id: 'options',
    options: [
      { value: 'about', label: 'Tell me about Saravana Infrastructures', trigger: 'about-us' },
      { value: 'services', label: 'What services do you offer?', trigger: 'our-services' },
      { value: 'contact', label: 'How can I contact you?', trigger: 'contact-info' },
      { value: 'admin', label: 'Admin Login', trigger: 'admin-login-prompt' },
      { value: 'something-else', label: 'Something else', trigger: 'ask-again' },
    ],
  },
  {
    id: 'about-us',
    message: 'Saravana Infrastructures is a leading infrastructure development company committed to excellence in every project. We specialize in a wide range of interior design, renovation, and construction services. Our commitment to quality, timely delivery, and client satisfaction sets us apart.',
    trigger: 'more-about-us',
  },
  {
    id: 'more-about-us',
    message: 'We are building dreams and creating legacies, one project at a time. Our trusted partner in construction and infrastructure development ensures that every project is executed with precision and integrity.',
    trigger: 'options',
  },
  {
    id: 'our-services',
    message: 'Saravana Infrastructures offers comprehensive services including architectural design, interior fit-outs, structural engineering, project management, and general contracting for both residential and commercial projects.',
    trigger: 'options',
  },
  {
    id: 'contact-info',
    message: 'You can contact us via phone at +91 9959892348 or email at info@saravana.com.',
    trigger: 'options',
  },
  {
    id: 'admin-login-prompt',
    message: 'To access the admin panel, please visit the Admin Login page directly.',
    trigger: 'options',
  },
  {
    id: 'ask-again',
    message: 'Please rephrase your question or select from the options.',
    trigger: 'options',
  },
];

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#007bff',
  headerFontColor: '#fff',
  headerFontSize: '18px',
  botBubbleColor: '#007bff',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const ChatbotComponent = () => {
  const [isMuted, setIsMuted] = useState(true); // Muted by default
  const synthRef = useRef(window.speechSynthesis);
  const lastSpokenContentRef = useRef(''); // Tracks the *exact content* last spoken to prevent repetition

  // This useEffect runs once on mount and cleans up on unmount
  useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel(); // Stop any ongoing speech on unmount
      }
      lastSpokenContentRef.current = ''; // Clear on unmount
    };
  }, []);

  // Callback to speak, with strict checks
  const speakContent = useCallback((text) => {
    if (!text || isMuted || lastSpokenContentRef.current === text) {
      // Don't speak if:
      // 1. No text
      // 2. Currently muted
      // 3. The exact same text was the last thing spoken (prevents immediate duplicates)
      return;
    }

    if (synthRef.current) {
      synthRef.current.cancel(); // Always cancel any active speech before starting a new one

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => {
        // No need to clear lastSpokenContentRef here if we want to prevent
        // the exact same message from ever being spoken again in the session.
        // If we want it to be re-speakable after it ends, we'd clear it here.
      };
      utterance.onerror = (event) => {
        console.error("SpeechSynthesisUtterance error:", event);
        lastSpokenContentRef.current = ''; // Clear on error to allow retry
      };

      synthRef.current.speak(utterance);
      lastSpokenContentRef.current = text; // Update the last spoken content
    }
  }, [isMuted]); // Recreate if isMuted changes

  const toggleMute = () => {
    setIsMuted(prev => {
      if (!prev) { // If it's about to become muted
        if (synthRef.current) {
          synthRef.current.cancel(); // Stop speech immediately when muting
          lastSpokenContentRef.current = ''; // Clear last spoken content when muted
        }
      }
      return !prev; // Toggle the mute state
    });
  };

  // We will no longer use handleStep directly for speech.
  // Instead, we will extract the current bot message from the chatbot's state
  // (or rely on its default rendering) and trigger speech based on that.
  // react-simple-chatbot doesn't provide a direct "currentBotMessage" prop easily,
  // so we rely on `headerComponent` and `toggleMute` for user interaction.
  // For bot messages, we'll ensure they are spoken only when they first appear.

  // This is a placeholder for `react-simple-chatbot`'s internal message state.
  // A more complex solution might involve observing the DOM for new bot messages
  // or if the library provided a dedicated callback for *new* bot messages.
  // For now, we'll use `onComponentDidMount` of a custom component within the chatbot
  // to capture the first message for that specific step.

  // To handle bot message display and speech, we'll create a custom component
  // for the `botAvatar` or a custom message component if `react-simple-chatbot`
  // allows it to detect when a message is truly *rendered*.
  // Given the constraints and repetition, we'll try to hook into the `message` prop
  // of the step definition itself, combined with the `lastSpokenContentRef`.

  const CustomBotMessage = useCallback(({ message }) => {
    // This component will render the bot's message.
    // When its `message` prop changes, it signifies a new bot message.
    useEffect(() => {
      // This ensures `speakContent` is called only when the `message` prop changes
      // and is not the very first load if muted.
      if (!isMuted && message && lastSpokenContentRef.current !== message) {
        speakContent(message);
      }
    }, [message, isMuted, speakContent]); // Dependencies ensure this effect re-runs when message/mute/speakContent changes

    return (
      <div style={{ wordBreak: 'break-word' }}>{message}</div>
    );
  }, [isMuted, speakContent]);

  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        headerTitle="Saravana Infrastructures Chatbot"
        steps={steps}
        floating={true}
        recognitionEnable={false} // Prevents auto-start of speech recognition
        speechSynthesis={{ enable: false }} // IMPORTANT: Completely disable built-in speech here
        // We are no longer using handleStep or handleEnd for speech,
        // relying on our custom `CustomBotMessage` component.
        botBubbleColor={theme.botBubbleColor}
        botFontColor={theme.botFontColor}
        // Use `botMessage` prop to render messages via our custom component
        botMessage={(props) => <CustomBotMessage message={props.message} />}
        headerComponent={(
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: theme.headerBgColor, color: theme.headerFontColor, borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
                <span style={{ fontSize: theme.headerFontSize, fontWeight: 'bold' }}>Saravana Infrastructures Chatbot</span>
                <button
                    onClick={toggleMute}
                    style={{ background: 'none', border: 'none', color: theme.headerFontColor, cursor: 'pointer', fontSize: '20px' }}
                    title={isMuted ? "Unmute Voice" : "Mute Voice"}
                >
                    {isMuted ? '🔇' : '🔊'}
                </button>
            </div>
        )}
      />
    </ThemeProvider>
  );
};

export default ChatbotComponent;