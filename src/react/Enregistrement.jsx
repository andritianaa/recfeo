import { Play, Volume2, Pause, SkipBack, SkipForward } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Background } from "../components/Background";
import { FrequencyVisualizer } from "../components/Visualizer";
import { Slider } from "@material-tailwind/react";

export default function Enregistrement() {
  const listeAudio = JSON.parse(localStorage.getItem('myObjectArray')) || [];
  const [darkMode, setDarkMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(Array(listeAudio.length).fill(false));
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null); // Index de l'audio en cours
  const audioRefs = useRef(listeAudio.map(() => React.createRef()));
  const [sliderValue, setSliderValue] = useState(0); // État pour le slider

  const togglePlay = (index) => {
    const updatedIsPlaying = [...isPlaying];
    const currentAudio = audioRefs.current[index].current;

    if (!currentAudio) {
      console.error("Aucune référence audio trouvée pour l'index:", index);
      return;
    }

    if (updatedIsPlaying[index]) {
      currentAudio.pause();
      updatedIsPlaying[index] = false;
      setCurrentPlayingIndex(null); // Réinitialiser l'index courant
    } else {
      audioRefs.current.forEach((ref, i) => {
        if (i !== index) {
          ref.current.pause();
          updatedIsPlaying[i] = false;
        }
      });

      // Réinitialiser le temps de l'audio à 0 avant de jouer
      currentAudio.currentTime = 0;
      currentAudio.play().catch(error => {
        console.error("Erreur lors de la lecture:", error);
      });

      updatedIsPlaying[index] = true;
      setCurrentPlayingIndex(index); // Mettre à jour l'index courant
    }

    setIsPlaying(updatedIsPlaying);
  };

  const pauseCurrentAudio = () => {
    if (currentPlayingIndex !== null) {
      const currentAudio = audioRefs.current[currentPlayingIndex].current;
      if (currentAudio) {
        currentAudio.pause();
        const updatedIsPlaying = [...isPlaying];
        updatedIsPlaying[currentPlayingIndex] = false;
        setIsPlaying(updatedIsPlaying);
        setCurrentPlayingIndex(null);
        setSliderValue(0); // Réinitialiser la valeur du slider
      }
    }
  };

  const playNext = () => {
    if (currentPlayingIndex !== null) {
      pauseCurrentAudio();
      const nextIndex = (currentPlayingIndex + 1) % listeAudio.length;
      togglePlay(nextIndex);
    }
  };

  const playPrev = () => {
    if (currentPlayingIndex !== null) {
      pauseCurrentAudio();
      const prevIndex = (currentPlayingIndex - 1 + listeAudio.length) % listeAudio.length;
      togglePlay(prevIndex);
    }
  };

  const handleSliderChange = (e) => {
    const currentAudio = audioRefs.current[currentPlayingIndex].current;
    if (currentAudio) {
      currentAudio.currentTime = e.target.value;
    }
  };

  // Effet pour mettre à jour le slider pendant la lecture
  useEffect(() => {
    let intervalId;

    if (currentPlayingIndex !== null) {
      const currentAudio = audioRefs.current[currentPlayingIndex].current;

      intervalId = setInterval(() => {
        if (currentAudio) {
          setSliderValue(currentAudio.currentTime);
        }
      }, 100); // Met à jour la valeur toutes les 100 ms
    }

    return () => {
      clearInterval(intervalId); // Nettoyer l'intervalle
    };
  }, [currentPlayingIndex, isPlaying]);

  // Toggle du mode sombre
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Background>
      <div className='mt-28 fixed inset-0 z-50 flex flex-col flex-wrap items-center justify-start w-full h-screen gap-5 m-auto text-white'>
        <div className="backdrop-blur-2xl bg-white/10 rounded-xl max-w-screen w-fit flex flex-col items-center justify-center gap-2 p-4 max-h-[60vh] overflow-x-auto">
          {listeAudio.map((audio, index) => (
            <div key={index} className=" flex flex-col items-center w-full max-w-2xl gap-16">
              <div className="bg-black/30 backdrop-blur-2xl flex items-center justify-between w-full gap-8 px-8 py-4 overflow-hidden text-white rounded-lg">
                <div>
                  <h1 className="text-white">{audio.songName}</h1>
                  <p className="text-sm">Tonalité: {audio.key}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button onClick={() => togglePlay(index)}>
                    {isPlaying[index] ? <Pause size={24} /> : <Play size={24} />}
                  </button>
                  <Volume2 size={30} />
                </div>
              </div>
              <audio ref={audioRefs.current[index]}>
                <source src={`data:audio/mpeg;base64,${audio.path}`} type="audio/mpeg" />
              </audio>
            </div>
          ))}

        </div>
        {/* Contrôleur Global */}
        <div className="bottom-10 left-1/2 backdrop-blur-2xl bg-white/10 rounded-xl fixed flex flex-col items-center justify-between w-screen max-w-2xl p-4 overflow-hidden transform -translate-x-1/2">
          {currentPlayingIndex !== null ? (
            <>
              <FrequencyVisualizer />
              <p className="mb-4 text-white">{listeAudio[currentPlayingIndex].songName}</p>
              <div className="flex items-center w-full gap-2">
                <button onClick={playPrev}>
                  <SkipBack size={24} className="text-white" />
                </button>
                <input
                  type="range"
                  min="0"
                  max={audioRefs.current[currentPlayingIndex]?.current?.duration || 0}
                  step="0.1"
                  value={sliderValue} // Utiliser la valeur du slider
                  onChange={handleSliderChange}
                  className="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none
  [&::-webkit-slider-thumb]:w-2.5
  [&::-webkit-slider-thumb]:h-2.5
  [&::-webkit-slider-thumb]:-mt-0.5
  [&::-webkit-slider-thumb]:appearance-none
  [&::-webkit-slider-thumb]:bg-white
  [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)]
  [&::-webkit-slider-thumb]:rounded-full
  [&::-webkit-slider-thumb]:transition-all
  [&::-webkit-slider-thumb]:duration-150
  [&::-webkit-slider-thumb]:ease-in-out
  [&::-webkit-slider-thumb]:dark:bg-neutral-700

  [&::-moz-range-thumb]:w-2.5
  [&::-moz-range-thumb]:h-2.5
  [&::-moz-range-thumb]:appearance-none
  [&::-moz-range-thumb]:bg-white
  [&::-moz-range-thumb]:border-4
  [&::-moz-range-thumb]:border-blue-600
  [&::-moz-range-thumb]:rounded-full
  [&::-moz-range-thumb]:transition-all
  [&::-moz-range-thumb]:duration-150
  [&::-moz-range-thumb]:ease-in-out

  [&::-webkit-slider-runnable-track]:w-full
  [&::-webkit-slider-runnable-track]:h-2
  [&::-webkit-slider-runnable-track]:bg-gray-100
  [&::-webkit-slider-runnable-track]:rounded-full
  [&::-webkit-slider-runnable-track]:dark:bg-neutral-700

  [&::-moz-range-track]:w-full
  [&::-moz-range-track]:h-2
  [&::-moz-range-track]:bg-gray-100
  [&::-moz-range-track]:rounded-full"
                />

                <button onClick={playNext}>
                  <SkipForward size={24} className="text-white" />
                </button>
              </div>
              <div className="flex flex-col items-center">

                <p className="text-sm text-gray-300">{currentPlayingIndex !== null ? `${Math.floor(sliderValue)}s` : "0s"}</p>
              </div>
            </>
          ) : (
            <p className="text-white">Aucun audio en cours</p>
          )}
        </div>
      </div>
    </Background>
  );
}
