import React, { useEffect, useState } from 'react';
import { LiveAudioVisualizer } from 'react-audio-visualize';

export const FrequencyVisualizerChanter = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);

  useEffect(() => {
    // Fonction pour démarrer l'enregistrement audio
    const startRecording = async () => {
      try {
        // Demande l'accès au microphone
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        recorder.start();
      } catch (error) {
        console.error("Erreur d'accès au microphone :", error);
      }
    };

    startRecording();

    // Nettoyage à la désinstallation du composant
    return () => {
      if (mediaRecorder) {
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return <div>
    {mediaRecorder && (
      <LiveAudioVisualizer
        mediaRecorder={mediaRecorder}
        width={400}
        height={200}
        barWidth={2}
        gap={2}
        barColor={'#fff'}
        backgroundColor={'#00000000'}
        barPlayedColor={'#ff0000'}
        smoothingTimeConstant={0.8}
      />
    )}
  </div>
};

