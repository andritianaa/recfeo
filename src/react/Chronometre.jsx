import React, { useState, useEffect } from 'react';

const Chronometer = () => {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);

    useEffect(() => {
        let interval = null;
        if (isActive && !isPaused) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
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
        const getSeconds = `0${(time % 60)}`.slice(-2);
        const minutes = `${Math.floor(time / 60)}`;
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

        return `${getHours} : ${getMinutes} : ${getSeconds}`;
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-bold mb-4">Enregistrement Audio</h1>
                <div className="text-3xl font-mono text-gray-700 mb-4">{formatTime()}</div>
                <div className="flex space-x-4">
                    {!isActive && !isPaused ? (
                        <Chanter
                            onButtonClick={handleStart}
                        />


                    ) : (
                        <button
                            onClick={handlePause}
                            className={`px-4 py-2 ${isPaused ? 'bg-green-500' : 'bg-red-500'
                                } text-white rounded`}
                        >
                            {isPaused ? 'Continuer' : 'Pause'}
                        </button>
                    )}
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 bg-yellow-500 text-white rounded"
                        disabled={!isActive}
                    >
                        Réinitialiser
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chronometer;
