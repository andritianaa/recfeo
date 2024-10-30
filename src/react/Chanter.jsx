
import { Background } from "../components/Background";
import { FrequencyVisualizerChanter } from "../components/VisualizerChanter";
import React, { useEffect, useState } from "react";
import { cn } from "./lib/cn";
export default function Chanter({ onButtonClick }) {
  const [note, setNote] = useState("");
  const [frequency, setFrequency] = useState(0);

  useEffect(() => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        analyser.fftSize = 4096; // Augmentez la taille de l'FFT
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const getFrequencyData = () => {
          analyser.getByteFrequencyData(dataArray);
          const detectedFrequency = findPitch(dataArray);
          setFrequency(detectedFrequency);
          const detectedNote = frequencyToNote(detectedFrequency);
          setNote(detectedNote);
          requestAnimationFrame(getFrequencyData);
        };

        getFrequencyData();
      })
      .catch((err) => console.error("Erreur d'accès au microphone:", err));

    const findPitch = (dataArray) => {
      let maxIndex = 0;
      let maxValue = -1;

      for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i] > maxValue) {
          maxValue = dataArray[i];
          maxIndex = i;
        }
      }

      // Convertir l'index en fréquence
      const nyquist = audioContext.sampleRate / 2;
      const frequency = (maxIndex / dataArray.length) * nyquist;

      // Affichez la fréquence brute pour le débogage

      // On ignore les fréquences en dessous d'un certain seuil
      if (frequency < 100) return 0; // Seuil pour éviter les bruits de fond

      return frequency;
    };

    const frequencyToNote = (frequency) => {
      const noteFrequencies = {
        // Octave 0


        // Octave 1
        Do0: 32.7,
        "Do#0": 34.65,
        Re0: 36.71,
        "Re#0": 38.89,
        Mi0: 41.2,
        Fa0: 43.65,
        "Fa#0": 46.25,
        Sol0: 49.0,
        "Sol#0": 51.91,
        La0: 55.0,
        "La#0": 58.27,
        Si0: 61.74,

        // Octave 2
        Do1: 65.41,
        "Do#1": 69.3,
        Re1: 73.42,
        "Re#1": 77.78,
        Mi1: 82.41,
        Fa1: 87.31,
        "Fa#1": 92.5,
        Sol1: 98.0,
        "Sol#1": 103.83,
        La1: 110.0,
        "La#1": 116.54,
        Si1: 123.47,

        // Octave 3
        Do2: 130.81,
        "Do#2": 138.59,
        Re2: 146.83,
        "Re#2": 155.56,
        Mi2: 164.81,
        Fa2: 174.61,
        "Fa#2": 185.0,
        Sol2: 196.0,
        "Sol#2": 207.65,
        La2: 220.0,
        "La#2": 233.08,
        Si2: 246.94,

        // Octave 4
        Do3: 261.63,
        "Do#3": 277.18,
        Re3: 293.66,
        "Re#3": 311.13,
        Mi3: 329.63,
        Fa3: 349.23,
        "Fa#3": 369.99,
        Sol3: 392.0,
        "Sol#3": 415.3,
        La3: 440.0,
        "La#3": 466.16,
        Si3: 493.88,

        // Octave 5
        Do4: 523.25,
        "Do#4": 554.37,
        Re4: 587.33,
        "Re#4": 622.25,
        Mi4: 659.25,
        Fa4: 698.46,
        "Fa#4": 739.99,
        Sol4: 783.99,
        "Sol#4": 830.61,
        La4: 880.0,
        "La#4": 932.33,
        Si4: 987.77,

        // Octave 6
        Do5: 1046.5,
        "Do#5": 1108.73,
        Re5: 1174.66,
        "Re#5": 1244.51,
        Mi5: 1318.51,
        Fa5: 1396.91,
        "Fa#5": 1479.98,
        Sol5: 1567.98,
        "Sol#5": 1661.22,
        La5: 1760.0,
        "La#5": 1864.66,
        Si5: 1975.53,

        // Octave 7
        Do6: 2093.0,
        "Do#6": 2217.46,
        Re6: 2349.32,
        "Re#6": 2489.02,
        Mi6: 2637.02,
        Fa6: 2793.83,
        "Fa#6": 2959.96,
        Sol6: 3135.96,
        "Sol#6": 3322.44,
        La6: 3520.0,
        "La#6": 3729.31,
        Si6: 3951.07,

        // Octave 8
        Do7: 4186.01,
      };

      let closestNote = "";
      let closestDistance = Infinity;

      for (const [note, noteFreq] of Object.entries(noteFrequencies)) {
        const distance = Math.abs(frequency - noteFreq);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestNote = note;
        }
      }

      return closestNote || "Aucune note détectée";
    };

    // Nettoyage à la désinstallation du composant
    return () => {
      audioContext.close();
    };
  }, []);

  return (
    // logo sy Menu
    <Background>
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center w-full h-screen gap-5 m-auto text-white">
        <div className="backdrop-blur-2xl bg-white/10 rounded-xl flex flex-col items-center justify-center gap-5 p-10 m-auto overflow-hidden shadow w-xl max-w-[calc(100vw-2rem)]">
          <FrequencyVisualizerChanter />
          <div className={cn('flex justify-between w-full text-xl opacity-1 transition-opacity')}>
            <p>{note}</p>
            <p>Fréquence: {frequency.toFixed(2)} Hz</p>
          </div>
        </div>

      </div>
    </Background>
  );
}
