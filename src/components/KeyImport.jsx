import React, { useState, useEffect, useRef } from "react";
import Meyda from "meyda";
import { Sun, Moon, FileDown, Play, Pause } from "lucide-react";
import { FrequencyVisualizer } from "./Visualizer";

const KeyDetector = () => {
  const [file, setFile] = useState(null);
  const [key, setKey] = useState(null);
  const [error, setError] = useState("");
  const [audioContext, setAudioContext] = useState(null);
  const [sourceNode, setSourceNode] = useState(null);
  const [analyzerNode, setAnalyzerNode] = useState(null);
  const [meydaAnalyzer, setMeydaAnalyzer] = useState(null);
  const [chromaData, setChromaData] = useState([]); // Pour accumuler les données chroma
  const [songName, setSongName] = useState("");
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [song, setSong] = useState(null);
  const [audioSrc, setAudioSrc] = useState("");

  const [note, setNote] = useState("");
  const [frequency, setFrequency] = useState(0);

  useEffect(() => {
    const myaudio = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = myaudio.createAnalyser();

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const microphone = myaudio.createMediaStreamSource(stream);
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
      const nyquist = myaudio.sampleRate / 2;
      const frequency = (maxIndex / dataArray.length) * nyquist;

      // Affichez la fréquence brute pour le débogage
      console.log(`Fréquence brute: ${frequency.toFixed(2)} Hz`);

      // On ignore les fréquences en dessous d'un certain seuil
      if (frequency < 100) return 0; // Seuil pour éviter les bruits de fond

      return frequency;
    };

    const frequencyToNote = (frequency) => {
      const noteFrequencies = {
        // Octave 0

        // Octave 1
        Do1: 32.7,
        "Do#1": 34.65,
        Re1: 36.71,
        "Re#1": 38.89,
        Mi1: 41.2,
        Fa1: 43.65,
        "Fa#1": 46.25,
        Sol1: 49.0,
        "Sol#1": 51.91,
        La1: 55.0,
        "La#1": 58.27,
        Si1: 61.74,

        // Octave 2
        Do2: 65.41,
        "Do#2": 69.3,
        Re2: 73.42,
        "Re#2": 77.78,
        Mi2: 82.41,
        Fa2: 87.31,
        "Fa#2": 92.5,
        Sol2: 98.0,
        "Sol#2": 103.83,
        La2: 110.0,
        "La#2": 116.54,
        Si2: 123.47,

        // Octave 3
        Do3: 130.81,
        "Do#3": 138.59,
        Re3: 146.83,
        "Re#3": 155.56,
        Mi3: 164.81,
        Fa3: 174.61,
        "Fa#3": 185.0,
        Sol3: 196.0,
        "Sol#3": 207.65,
        La3: 220.0,
        "La#3": 233.08,
        Si3: 246.94,

        // Octave 4
        Do4: 261.63,
        "Do#4": 277.18,
        Re4: 293.66,
        "Re#4": 311.13,
        Mi4: 329.63,
        Fa4: 349.23,
        "Fa#4": 369.99,
        Sol4: 392.0,
        "Sol#4": 415.3,
        La4: 440.0,
        "La#4": 466.16,
        Si4: 493.88,

        // Octave 5
        Do5: 523.25,
        "Do#5": 554.37,
        Re5: 587.33,
        "Re#5": 622.25,
        Mi5: 659.25,
        Fa5: 698.46,
        "Fa#5": 739.99,
        Sol5: 783.99,
        "Sol#5": 830.61,
        La5: 880.0,
        "La#5": 932.33,
        Si5: 987.77,

        // Octave 6
        Do6: 1046.5,
        "Do#6": 1108.73,
        Re6: 1174.66,
        "Re#6": 1244.51,
        Mi6: 1318.51,
        Fa6: 1396.91,
        "Fa#6": 1479.98,
        Sol6: 1567.98,
        "Sol#6": 1661.22,
        La6: 1760.0,
        "La#6": 1864.66,
        Si6: 1975.53,

        // Octave 7
        Do7: 2093.0,
        "Do#7": 2217.46,
        Re7: 2349.32,
        "Re#7": 2489.02,
        Mi7: 2637.02,
        Fa7: 2793.83,
        "Fa#7": 2959.96,
        Sol7: 3135.96,
        "Sol#7": 3322.44,
        La7: 3520.0,
        "La#7": 3729.31,
        Si7: 3951.07,

        // Octave 8
        Do8: 4186.01,
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
    return () => { };
  }, []);

  useEffect(() => {
    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [audioContext]);

  const handleFileChange = (event) => {
    setFile(null);
    setKey(null);
    setError("");
    setChromaData([]); // Réinitialise les données chroma accumulées
    setSourceNode(null);
    setMeydaAnalyzer(null);
    const selectedFile = event.target.files[0];
    setSongName(selectedFile.name);
    if (selectedFile) {
      // Réinitialisation des états avant de commencer une nouvelle analyse
      if (sourceNode) {
        sourceNode.stop();
      }
      if (meydaAnalyzer) {
        meydaAnalyzer.stop();
      }
      setChromaData([]); // Réinitialise les données chroma accumulées

      // Début de la nouvelle analyse
      setFile(URL.createObjectURL(selectedFile));

      analyzeAudio(selectedFile);
    }
  };

  const analyzeAudio = async (audioFile) => {
    try {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      setAudioContext(audioContext);

      const sourceNode = audioContext.createBufferSource();
      setSourceNode(sourceNode);

      const audioBuffer = await fetch(URL.createObjectURL(audioFile))
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer));

      sourceNode.buffer = audioBuffer;

      const analyzerNode = audioContext.createAnalyser();
      sourceNode.connect(analyzerNode);
      setAnalyzerNode(analyzerNode);
      analyzerNode.fftSize = 2048;

      sourceNode.connect(audioContext.destination);
      sourceNode.start();

      const chromaAccumulator = [];

      // Création de l'analyseur Meyda
      const meydaAnalyzer = Meyda.createMeydaAnalyzer({
        audioContext: audioContext,
        source: analyzerNode,
        bufferSize: 2048,
        featureExtractors: ["chroma"],
        callback: (features) => {
          if (features && features.chroma) {
            // Accumule les données chroma
            chromaAccumulator.push(features.chroma);
          }
        },
      });

      meydaAnalyzer.start();
      setMeydaAnalyzer(meydaAnalyzer);

      // Arrêter l'analyse une fois la lecture terminée et calculer la tonalité
      sourceNode.onended = () => {
        meydaAnalyzer.stop();
        const averageChroma = calculateAverageChroma(chromaAccumulator);
        const keyDetected = identifyKeyFromChroma(averageChroma);
        setKey(keyDetected);
      };
    } catch (err) {
      setError("Erreur lors de l'analyse de la chanson.");
      console.error(err);
    }
  };

  // Fonction pour calculer la moyenne des chromas
  const calculateAverageChroma = (chromaData) => {
    const total = chromaData.reduce(
      (acc, chroma) => acc.map((val, index) => val + chroma[index]),
      new Array(12).fill(0)
    );
    return total.map((val) => val / chromaData.length);
  };

  const identifyKeyFromChroma = (chroma) => {
    if (!chroma) {
      return "Tonalité inconnue";
    }

    const majorScales = [
      [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1], // C major
      [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0], // C# major / Db major
      [0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0], // D major
      [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0], // D# major / Eb major
      [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], // E major
      [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0], // F major
      [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0], // F# major / Gb major
      [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1], // G major
      [0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0], // G# major / Ab major
      [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0], // A major
      [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1], // A# major / Bb major
      [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0], // B major
    ];

    const minorScales = [
      [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0], // A minor
      [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0], // A# minor / Bb minor
      [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1], // B minor
      [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1], // C minor
      [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0], // C# minor / Db minor
      [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0], // D minor
      [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0], // D# minor / Eb minor
      [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], // E minor
      [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0], // F minor
      [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0], // F# minor / Gb minor
      [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1], // G minor
      [0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0], // G# minor / Ab minor
    ];

    const keyMapMajor = [
      "Do majeur",
      "Do majeur",
      "Ré majeur",
      "Ré majeur",
      "Mi majeur",
      "Fa majeur",
      "Fa majeur",
      "Sol majeur",
      "Sol majeur",
      "La majeur",
      "La majeur",
      "Si majeur",
    ];

    const keyMapMinor = [
      "La mineur",
      "La mineur",
      "Si mineur",
      "Do mineur",
      "Do mineur",
      "Ré mineur",
      "Ré mineur",
      "Mi mineur",
      "Fa mineur",
      "Fa mineur",
      "Sol mineur",
      "Sol mineur",
    ];

    const bestMatchMajor = findBestMatch(chroma, majorScales);
    const bestMatchMinor = findBestMatch(chroma, minorScales);

    return bestMatchMajor.correlation > bestMatchMinor.correlation
      ? keyMapMajor[bestMatchMajor.index]
      : keyMapMinor[bestMatchMinor.index];
  };

  const findBestMatch = (chroma, scales) => {
    let bestMatch = { index: 0, correlation: 0 };
    scales.forEach((scale, index) => {
      const correlation = scale.reduce(
        (sum, val, i) => sum + val * chroma[i],
        0
      );
      if (correlation > bestMatch.correlation) {
        bestMatch = { index, correlation };
      }
    });
    return bestMatch;
  };

  return (
    <>
      <div>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          id="importSong"
          style={{ display: "none" }}
        />
      </div>
      <div className=" h-5/6 gap-44 flex items-center justify-center">
        <div className="m-36 flex cursor-pointer rounded-full border-4 border-[#D5DAF3] bg-[#D5DAF3] p-10 dark:border-white dark:bg-white/5">
          <button onClick={() => document.getElementById("importSong").click()}>
            <FileDown size={100} color="#0A132D" strokeWidth={1.5} />
          </button>
        </div>
        <div className="flex h-2/4 w-[420px] flex-col items-center justify-center gap-20 rounded-xl bg-[#0A132D] dark:border-4 dark:border-white">
          {songName ? (
            <div>
              {!key && <FrequencyVisualizer />}
              <p className="mt-15 text-white">
                {" "}
                {songName.split(".").slice(0, -1).join(".")}
              </p>
              {!key && (
                <>
                  <h2>{note}</h2>
                  <h3>Fréquence: {frequency.toFixed(2)} Hz</h3>
                </>
              )}
              {key && (
                <p className="mt-15 text-white">Tonalité détectée : {key}</p>
              )}
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          ) : (
            <p className="mt-15 text-white"> ici le titre</p>
          )}
        </div>
      </div>
    </>
  );
};

export default KeyDetector;
