'use client'
import React, { createContext, useContext, useState } from 'react';

const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [currentUrl, setCurrentUrl] = useState('');

  return (
    <AudioPlayerContext.Provider
      value={{
        currentUrl,
        setCurrentUrl
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioPlayerContext);
