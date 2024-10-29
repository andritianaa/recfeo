import React, { useEffect, useRef } from "react";

export const FrequencyVisualizer = () => {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const bufferLengthRef = useRef(null);

  useEffect(() => {
    // Crée le contexte audio
    audioContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();
    const analyser = audioContextRef.current.createAnalyser();
    analyser.fftSize = 256; // Ajustez cette valeur pour plus ou moins de détails

    // Obtenez le flux audio du microphone
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyser);

      analyserRef.current = analyser;
      bufferLengthRef.current = analyser.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLengthRef.current);

      draw();
    });

    // Fonction de rendu pour dessiner le spectre de fréquence
    const draw = () => {
      const canvas = canvasRef.current;
      const canvasContext = canvas.getContext("2d");

      const drawVisualizer = () => {
        requestAnimationFrame(drawVisualizer);

        analyserRef.current.getByteFrequencyData(dataArrayRef.current);

        canvasContext.fillStyle = "rgb(10, 19, 45)";
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLengthRef.current) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLengthRef.current; i++) {
          const barHeight = dataArrayRef.current[i];

          canvasContext.fillStyle = `rgb(250, 250, ${barHeight + 200})`;
          canvasContext.fillRect(
            x,
            canvas.height - barHeight / 2,
            barWidth,
            barHeight / 2
          );

          x += barWidth + 1;
        }
      };

      drawVisualizer();
    };

    // Nettoyage à la désinstallation du composant
    return () => {
      if (audioContextRef.current) {
      }
    };
  }, []);

  return <canvas ref={canvasRef} width="400" height="100" />;
};

export default FrequencyVisualizer;
