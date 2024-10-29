import { useEffect, useState } from "react";
import logo from "../assets/logo.png"
import ispm from "../assets/ispm.png"
import { useNavigate } from "react-router-dom"
import logovideo from "../assets/logovideo.mp4"
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
    <div className="video bg[#0A132D] ">
      {
        // video animation logo
        loading ?
          <div className="bg-[#0A132D] h-screen fixed w-full ">
            <video width="" className="h-5/6 w-full mt-10" autoPlay loop muted playsInline>
              <source src={logovideo} type="video/mp4" />
            </video>
          </div>
          :


          <div className=" bg-cover h-screen bg-[url('/back.png')] ">
            {/* // Logo sy Titre Recfeo */}
            <div className=" flex flex-col items-center justify-center h-screen gap-6">
              <div className=" gap-80 flex">

                <img src={ispm} className=" object-cover h-48" />
                <img src={logo} className="h-36  object-cover" />
              </div>
              <h1 className="font-lato my-5 text-4xl font-bold text-white">Rec'Feo</h1>

              {/* Bouton Importer sy Chanter */}
              {/* <button onClick={Importer} className=" font-lato w-60 m-30 h-16 my-6 text-xl font-bold text-white bg-transparent border-2 border-white rounded-full">Importer</button>
              <button onClick={Chanter} className="font-lato w-60 m-30  h-16 my-6 text-xl font-bold text-white bg-transparent border-2 border-white rounded-full">Chanter</button>
            </div> */}
              {/* <div class="h-screen w-screen bg-black flex justify-center items-center"> */}

              <div className="group  relative inline-flex">
                <div
                  className="absolute transitiona-all duration-1000 opacity-0 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
                </div>
                <button onClick={Chanter}
                  className="font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 h-14 w-60  relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border-2 rounded-full"
                  role="button">Chanter
                </button>
              </div>

              <div className="group  relative inline-flex m-4">
                <div
                  className="absolute transitiona-all duration-1000 opacity-0 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
                </div>
                <button onClick={Importer}
                  className="font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 h-14 w-60  relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border-2 rounded-full"
                  role="button">Importer
                </button>
              </div>
            </div>

          </div>
      }

    </div>
  )
}

export default Accueil;
