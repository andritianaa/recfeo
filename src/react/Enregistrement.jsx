import logo from "../assets/logo.png"
import logodark from "../assets/logodark.png"
import { Sun, Play, Volume2, Pause, Moon } from "lucide-react"
import ispm from "../assets/ispm.png"
import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"


export default function Enregistrement() {
  const { state } = useLocation()
  const [listeAudio, setListeAudio] = useState([])
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5); // Initial volume (0 to 1)
  const audioRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setListeAudio(state)
    console.log(listeAudio)
  }, [])
  //dark Mode light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  //dark Mode light mode
  const commonProps = {
    color: darkMode ? "white" : "#0A132D"
  };

  //Music player

  // const togglePlay = () => {
  //   if (isPlaying) {
  //     audioRef.current.pause();
  //   } else {
  //     audioRef.current.play();
  //   }
  //   setIsPlaying(!isPlaying);
  // };



  return (
    // logo sy Menu
    <div className={`${darkMode && "dark"}`}>
      <div className=" h-screen fixed w-full bg-[#C7CFE9]  dark:bg-[#0A132D] dark: text-white">

        {/* Micro sy bouton prêt   */}
        {listeAudio.map((audio, index) => {
          const togglePlay = () => {
            if (isPlaying) {
              audioRef.current.pause();
            } else {
              audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
          };
          return (
            <div key={index}>
              <div className="h-5/6 flex flex-col items-center gap-16 m-10">
                <div className="dark:bg-[#0A153B] bg-[#B7C0E7] h-20 w-full flex items-center justify-between p-10  ">
                  <button onClick={togglePlay}>
                    {isPlaying ? <Pause size={24} {...commonProps} /> : <Play size={24} {...commonProps} />}
                  </button>
                  <h1 className="dark:text-white text-black">{audio.titre}</h1>
                  <Volume2 size={30} {...commonProps} />
                </div>
                <audio ref={audioRef}  >
                  <source src={audio.audio} />
                </audio>
              </div>
            </div>
          )
        })}



      </div>

    </div >
  )
}

