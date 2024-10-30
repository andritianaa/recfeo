import { useEffect, useState } from "react";
import logo from "../assets/logo.png"
import ispm from "../assets/ispm.png"
import { useNavigate } from "react-router-dom"
import logovideo from "../assets/logovideo.mp4"
import { Background } from "../components/Background";
// import { Button } from "../components/Bouton";


function Accueil() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // fonction de navigation makany amle page
  const Importer = () => {
    navigate("/importer");
  }
  const Chanter = () => {
    navigate("/chanter")
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 6000)
  }, [])

  return (
    <Background>
      <div className="bg[#0A132D] fixed z-50 w-screen h-screen flex items-center justify-center">
        {
          // video animation logo
          loading ?
            <div className="bg-[#0A132D] h-screen fixed w-full ">
              <video width="" className="h-5/6 w-full mt-10" autoPlay loop muted playsInline>
                <source src={logovideo} type="video/mp4" />
              </video>
            </div>
            :

            <div className=" flex flex-col items-center justify-center h-screen gap-6">
              <div className=" gap-80 flex">

                <img src={ispm} className=" object-cover h-48" />
                <img src={logo} className="h-36 object-cover" />
              </div>
              <h1 className="font-lato my-5 text-4xl font-bold text-white">Rec'Feo</h1>

              <div className="flex gap-4">

                <button onClick={Chanter}
                  className="inline-flex items-center justify-center whitespace-nowrap  text-xl px-8 py-4  focus-visible:outline-none  focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 rounded-lg border-none bg-[linear-gradient(325deg,#0044ff_0%,#2ccfff_55%,#0044ff_90%)] bg-[280%_auto]   text-white shadow-[0px_0px_20px_rgba(71,184,255,0.5),0px_5px_5px_-1px_rgba(58,125,233,0.25),inset_4px_4px_8px_rgba(175,230,255,0.5),inset_-4px_-4px_8px_rgba(19,95,216,0.35)] transition-[background] duration-700 hover:bg-right-top focus:outline-none focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus-visible:ring-2 dark:focus:ring-blue-500 dark:focus:ring-offset-black font-medium"
                  role="button">Chanter
                </button>
                <button onClick={Importer}
                  className="inline-flex items-center justify-center whitespace-nowrap  text-xl px-8 py-4  focus-visible:outline-none  focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 rounded-lg border-none bg-[linear-gradient(325deg,#0044ff_0%,#2ccfff_55%,#0044ff_90%)] bg-[280%_auto]   text-white shadow-[0px_0px_20px_rgba(71,184,255,0.5),0px_5px_5px_-1px_rgba(58,125,233,0.25),inset_4px_4px_8px_rgba(175,230,255,0.5),inset_-4px_-4px_8px_rgba(19,95,216,0.35)] transition-[background] duration-700 hover:bg-right-top focus:outline-none focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus-visible:ring-2 dark:focus:ring-blue-500 dark:focus:ring-offset-black font-medium"
                  role="button">Importer
                </button>
              </div>
            </div>
        }

      </div>
    </Background>
  )
}

export default Accueil;
