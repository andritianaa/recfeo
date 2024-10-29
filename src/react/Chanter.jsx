import logo from "../assets/logo.png";
import logodark from "../assets/logodark.png";
import {
  CircleStop,
  Headphones,
  Import,
  Mic,
  RotateCw,
  Trash2,
} from "lucide-react";
import ispm from "../assets/ispm.png";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Background } from "../components/Background";

export default function Chanter({ onButtonClick }) {
  const [listeAudio, setListeAudio] = useState([]);
  const [titre, setTitre] = useState("");
  const [showPret, setPret] = useState(true);
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const [darkMode, setDarkMode] = useState(false);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  // le mandefa chronomètre

  useEffect(() => {
    let interval = null;
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  const formatTime = () => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };
  //atreto

  //manao dark mode sy light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const commonProps = {
    color: darkMode ? "white" : "#0A132D",
  };

  const startRecording = async () => {
    setPret(false);
    setAudioURL("");
    setRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    mediaRecorder.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
      const url = URL.createObjectURL(audioBlob);
      setAudioURL(url);
      audioChunks.current = [];
    };

    mediaRecorder.current.start();
  };

  const stopRecording = () => {
    setRecording(false);
    mediaRecorder.current.stop();
  };

  const enregistrer = () => {
    setListeAudio((prevListeAudio) => [
      ...prevListeAudio,
      {
        titre: titre,
        audio: audioURL,
      },
    ]);
    setPret(true);
    setAudioURL("");
    setTitre("");
    console.log("listeAudio ", listeAudio);
  };

  return (
    // logo sy Menu
    <Background>
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center w-full h-screen gap-5 m-auto text-white">
        <div className="backdrop-blur-2xl bg-white/10 rounded-xl flex flex-col items-center justify-center gap-5 p-10 m-auto overflow-hidden shadow">
          <div className="p-10 flex bg-[#D5DAF3] dark:bg-white/5 rounded-full border-[#D5DAF3] dark:border-white border-4 mb-10">
            <Mic size={100} strokeWidth={1.5} color="white" />
          </div>

          <div className="mb-4 font-mono text-3xl text-gray-700">
            {formatTime()}
          </div>

          {showPret && (
            <button onClick={() => { startRecording(); handleStart(); }} className=" font-medium dark:bg-transparent bg-[#D5DAF3] h-16 w-48  rounded-full border-4 border-[#D5DAF3] dark:text-white text-xl dark:border-white text-[#0A132D] animate-bounce focus:animate-none hover:animate-none">
              Prêt
            </button>
          )}

          <div>
            {audioURL && (
              <>
                <input
                  placeholder="titre"
                  type="text"
                  className="rounded-xl text-slate-900 placeholder:text-slate-600 focus:outline-none sm:text-sm sm:leading-6 block w-full py-4 pl-4 pr-12 text-base bg-white appearance-none"
                  onChange={(e) => setTitre(e.target.value)}
                />
                <audio src={audioURL} />
              </>
            )}
          </div>

          <div className="flex justify-center gap-40 m-4 text-white">
            <Import size={40}  {...commonProps} onClick={enregistrer} className="text-white cursor-pointer" />
            <RotateCw size={40}  {...commonProps} className=" text-white cursor-pointer" onClick={() => { startRecording(); handleReset(); }} />
            <Headphones size={40}  {...commonProps} className="text-white cursor-pointer" />
            <CircleStop size={40}  {...commonProps} onClick={() => { stopRecording(); handlePause(); }} className="text-white cursor-pointer" />
            <Trash2 size={40}  {...commonProps} className="text-white cursor-pointer" onClick={() => { setPret(true); setAudioURL(""); }} />
          </div>
        </div>

      </div>
    </Background>
  );
}
