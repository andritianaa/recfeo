import logo from "../assets/logo.png";
import logodark from "../assets/logodark.png";
import { Sun, Moon } from "lucide-react";
import ispm from "../assets/ispm.png";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Chanter({ onButtonClick }) {
    const [listeAudio, setListeAudio] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    //manao dark mode sy light mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };
    const commonProps = {
        color: darkMode ? "white" : "#0A132D",
    };

    return (
        <header className="top-4 md:justify-start md:flex-nowrap fixed inset-x-0 z-50 flex flex-wrap w-full">
            <nav
                className="relative max-w-[66rem] w-full bg-[#D5DAF3] dark:bg-white/5 rounded-[28px] p-3 md:flex md:items-center md:justify-between md:py-0 mx-2 lg:mx-auto"
                aria-label="Global"
            >
                <div className="flex items-center justify-between">
                    <a
                        className="focus:outline-none focus:opacity-80 flex items-center justify-between text-xl font-semibold rounded-md"
                        href="#"
                        aria-label="Preline"
                    >
                        <img src={ispm} className="h-14 mt-2 ml-2 rounded-full" />
                        {darkMode ? (
                            <img src={logo} className=" h-12 m-2" />
                        ) : (
                            <img src={logodark} className=" h-10 m-3" />
                        )}
                        <p className="text-[#0A132D] text-center dark:text-white font-bold  ">
                            Rec'feo
                        </p>
                    </a>

                    <div className="md:hidden">
                        <button
                            type="button"
                            className="hs-collapse-toggle size-8 bg-neutral-800 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center text-sm font-semibold text-white rounded-full"
                            data-hs-collapse="#navbar-collapse"
                            aria-controls="navbar-collapse"
                            aria-label="Toggle navigation"
                        >
                            <svg
                                className="hs-collapse-open:hidden size-4 flex-shrink-0"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="3" x2="21" y1="6" y2="6" />
                                <line x1="3" x2="21" y1="12" y2="12" />
                                <line x1="3" x2="21" y1="18" y2="18" />
                            </svg>
                            <svg
                                className="hs-collapse-open:block size-4 flex-shrink-0 hidden"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div
                    id="navbar-collapse"
                    className="hs-collapse basis-full grow md:block hidden overflow-hidden transition-all duration-300"
                >
                    <div className="md:flex-row md:items-center md:justify-end md:py-0 md:ps- flex flex-col py-2">
                        <Link
                            className="font-bold font-raleway py-3 ps-px sm:px-3 md:py-4 text-sm text-[#0A132D] hover:text-white focus:outline-none focus:text-white dark:text-white dark:hover:text-[#C7CFE9] focus:outline-none focus:text-black group p-2 px-4"
                            to="/importer"
                        >
                            Importer
                            <div className="bg-white dark:bg-[#C7CFE9] h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
                        </Link>
                        <Link
                            className="font-bold font-raleway py-3 ps-px sm:px-3 md:py-4 text-sm text-[#0A132D] hover:text-white focus:outline-none focus:text-white dark:text-white dark:hover:text-[#C7CFE9] focus:outline-none focus:text-black group p-2 px-4"
                            to="/enregistrement"
                            aria-current="page"
                            state={listeAudio}
                        >
                            Enregistrement
                            <div className="bg-white dark:bg-[#C7CFE9] h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
                        </Link>
                        <button onClick={toggleDarkMode}>
                            {darkMode ? (
                                <Sun size={20} color="white" />
                            ) : (
                                <Moon size={20} color="black" />
                            )}
                        </button>
                        <Link
                            className="font-bold font-raleway py-3 ps-px sm:px-3 md:py-4 text-sm text-[#0A132D]  dark:text-white hover:text-white focus:outline-none focus:text-white dark:hover:text-[#C7CFE9] focus:outline-none focus:text-black group p-2 px-4"
                            to="/aide"
                        >
                            Aide
                            <div className="bg-white dark:bg-[#C7CFE9] h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
