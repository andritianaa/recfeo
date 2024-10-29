import logo from "../assets/logo.png"
import logodark from "../assets/logodark.png"
import { Sun, Moon, Facebook, Twitter, Instagram, Github, Youtube } from "lucide-react"
import ispm from "../assets/ispm.png"
import { Link } from "react-router-dom"

import { useState } from "react"
export default function Aide() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }
  const commonProps = {
    color: darkMode ? "white" : "#0A132D"
  };

  return (
    // logo sy Menu 
    <div className={`${darkMode && "dark"}`}>
      <div className=" bg-[#C7CFE9]  dark:bg-[#0A132D] dark: text-white">

        <header className="sticky top-4 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full">
          <nav className="relative max-w-[66rem] w-full bg-[#D5DAF3] dark:bg-[#3B405C] rounded-[28px] p-3 md:flex md:items-center md:justify-between md:py-0 mx-2 lg:mx-auto" aria-label="Global">
            <div className="flex items-center justify-between">

              <a className="flex justify-between rounded-md text-xl items-center font-semibold focus:outline-none focus:opacity-80" href="../templates/agency/index.html" aria-label="Preline">
                <img src={ispm} className="h-14 ml-2 mt-2 rounded-full" />
                {darkMode ? <img src={logo} className="h-12 " /> : <img src={logodark} className="h-10 m-3 " />}

                <p className="text-[#0A132D] text-center dark:text-white font-bold">Rec'feo</p>
              </a>
              <div className="md:hidden">
                <button type="button" className="hs-collapse-toggle size-8 flex justify-center items-center text-sm font-semibold rounded-full bg-neutral-800 text-white disabled:opacity-50 disabled:pointer-events-none" data-hs-collapse="#navbar-collapse" aria-controls="navbar-collapse" aria-label="Toggle navigation">
                  <svg className="hs-collapse-open:hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                  <svg className="hs-collapse-open:block hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>
              </div>
            </div>


            <div id="navbar-collapse" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block espace-y-4 ">
              <div className="flex flex-col md:flex-row md:items-center md:justify-end py-2 md:py-0 md:ps-">
                <Link className="font-bold font-raleway py-3 ps-px sm:px-3 md:py-4 text-sm text-[#0A132D] hover:text-white focus:outline-none focus:text-white dark:text-white hover:text-black focus:outline-none focus:text-black dark:hover:text-[#C7CFE9] focus:outline-none focus:text-black group p-2 px-4" to="/chanter">
                  Chanter <div className="bg-white dark:bg-[#C7CFE9] h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
                </Link>
                <Link className="font-bold font-raleway py-3 ps-px sm:px-3 md:py-4 text-sm text-[#0A132D] hover:text-white focus:outline-none focus:text-white dark:text-white dark:hover:text-[#C7CFE9] focus:outline-none focus:text-black group p-2 px-4" to="/importer">Importer<div className="bg-white dark:bg-[#C7CFE9] h-[2px] w-0 group-hover:w-full transition-all duration-500"></div></Link>
                <button onClick={toggleDarkMode}>{darkMode ? <Sun size={20} color="white" /> : <Moon size={20} color="black" />}</button>
                <Link className="font-bold font-raleway py-3 ps-px sm:px-3 md:py-4 text-sm text-[#0A132D] hover:text-white focus:outline-none focus:text-white dark:text-white dark:hover:text-[#C7CFE9] focus:outline-none focus:text-black group p-2 px-4" to="/enregistrement" aria-current="page" state={[]} >Enregistrement<div className="bg-white dark:bg-[#C7CFE9] h-[2px] w-0 group-hover:w-full transition-all duration-500"></div></Link>

              </div>
            </div>
          </nav>
        </header>

        <div className="flex flex-col gap-0.5 items-center ">
          <body>

            <div className=" h-20 w-full flex items-center justify-center ">
              <p className="dark:text-white text-black  font-raleway text-xl">Concept du site :</p>
            </div>

            <div>
              <p className="dark:text-white text-black font-raleway ">
                L'application web utilise l'intelligence artificielle pour détecter les notes d'une chanson ou d'une prise vocale en direct. <br />Elle permet aux utilisateurs d'analyser la musique pour obtenir une interprétation précise des notes jouées ou chantées.
              </p>
            </div>

            <div className=" h-10 w-full flex items-center justify-center m-4">
              <p className="dark:text-white text-black  font-raleway text-xl ">Mode d'emploi :</p>
            </div>

            <div >
              <p className="dark:text-white text-black font-raleway ">
                Accueil
                <br />
                - Sur la page d'accueil, vous trouverez un grand bouton "Rec" pour enregistrer votre voix ou une chanson.
                <br />
                <br />
                <p className="text-xl h-5 w-full flex items-center justify-center ">Enregistrement </p>
                <br />
                - Cliquez sur "Prêt" pour démarrer l'enregistrement.
                <br />
                - Chantez ou jouez la chanson clairement.
                <br />
                - Cliquer sur "Restart" pour réinitialiser la prise de la chanson.
                <br />
                - Cliquer sur l'icône "Casque" pour reécouter la chanson.
                <br />
                - Cliquez à nouveau sur "Stop" pour arrêter l'enregistrement.
                <br />
                - Cliquer sur l'icône "Corbeille" pour supprimer une chanson prise.
                <br />
                <br />
                <p className="text-xl h-5 w-full flex items-center justify-center ">Importation de chansons</p>
                <br />
                - Vous pouvez également importer une chanson à partir de votre appareil pour analyse.
                <br />
                <br />
                <p className="text-xl h-5 w-full flex items-center justify-center ">Analyse des notes</p>
                <br />
                - L'IA analyse l'enregistrement ou la chanson importée pour détecter les notes.
                <br />
                - Les notes détectées s'affichent sur une partition musicale ou un diagramme de fréquences.
                <br />
                <p className="text-xl h-5 w-full flex items-center justify-center p-4 m-2">Résultats :</p>
                <br />
                <p className="h-20 p-2">
                  - Les résultats incluent les noms des notes, leur hauteur et leur durée.

                </p>
              </p>


            </div>
          </body>
        </div>
        <div>
          <footer>
            <div class="bg-gray-800 py-4 text-gray-400">
              <div class="container px-4 mx-auto">
                <div class="-mx-4 flex flex-wrap justify-between">
                  <div class="px-4 my-4 w-full xl:w-1/5">
                    <a className="flex text-justify-between rounded-md text-xl items-center font-semibold focus:outline-none focus:opacity-80" href="../templates/agency/index.html" aria-label="Preline">
                      <img src={logo} className="h-12 m-2 " />
                      <p className="text-white font-bold">Rec'feo</p>
                    </a>
                    <p class="text-justify">
                      <br />
                      Rec'feo est une application web pour détecter la Tonalité d'une chanson en chantant ou en important une chanson depuis votre ordinateur.

                    </p>
                  </div>

                  <div class="px-4 my-4 w-full sm:w-auto">
                    <div>
                      <h2 class="inline-block text-2xl pb-4 mb-4 border-b-4 border-[#A6B2DA]">Companie</h2>
                    </div>
                    <ul class="leading-8">
                      <li><a href="#" class="hover:text-blue-400">ReactJs.com</a></li>
                      <li><a href="#" class="hover:text-blue-400">Tailwind.com</a></li>
                      <li><a href="#" class="hover:text-blue-400">Lucide-react.com</a></li>
                      <li><a href="#" class="hover:text-blue-400">Preline</a></li>
                    </ul>
                  </div>
                  <div class="px-4 my-4 w-full sm:w-auto">
                    <div>
                      <h2 class="inline-block text-2xl pb-4 mb-4 border-b-4 border-[#A6B2DA]">Blog</h2>
                    </div>
                    <ul class="leading-8">
                      <li><Link to="/chanter" class="hover:text-blue-400">Chanter</Link></li>
                      <li><Link to="/importer" class="hover:text-blue-400">Importer</Link></li>
                      <li><Link to="/enregistrement" class="hover:text-blue-400">Enregistrement</Link></li>
                      <li><Link to="/aide" class="hover:text-blue-400">Aide</Link></li>
                    </ul>
                  </div>
                  <div class="px-4 my-4 w-full sm:w-auto xl:w-1/5 ">
                    <div>
                      <h2 class="inline-block text-2xl pb-4 mb-4 border-b-4 border-[#A6B2DA]">Connecte-toi avec nous</h2>
                    </div>
                    <a href="#" class="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
                      <Facebook className="w-4 h-4 " />
                    </a>
                    <a href="#" class="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
                      <Twitter className="w-4 h-4 " />
                    </a>
                    <a href="#" class="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
                      <Instagram className="w-4 h-4 " />
                    </a>
                    <a href="#" class="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
                      <Github className="w-4 h-4" />
                    </a>
                    <a href="#" class="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full hover:text-blue-400 hover:border-blue-400">
                      <Youtube className="w-4 h-4" />

                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-[#A6B2DA] py-4 text-gray-100">
              <div class="container mx-auto px-4">
                <div class="-mx-4 flex flex-wrap justify-between">
                  <div class="px-4 w-full text-center sm:w-auto sm:text-left">
                    Copyright © 2023
                    <script>new Date().getFullYear() 2020 && document.write("- " + new Date().getFullYear())</script>- 2024
                    Rec'feo.
                  </div>
                  <div class="px-4 w-full text-center sm:w-auto sm:text-left">
                    Réalisé avec ❤️ par ViavyInTech .
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
