import { useState, useEffect } from "react";

function Pomo() {
    // Laikmatis ir jo būsena
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minučių pagal nutylėjimą
    const [isRunning, setIsRunning] = useState(false);
    const [isWorkMode, setIsWorkMode] = useState(true);
    const [workTime, setWorkTime] = useState(25);
    const [breakTime, setBreakTime] = useState(5);
    const [isPaused, setIsPaused] = useState(false);

    // Laikmačio logika
    useEffect(() => {
        let interval;
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            // Perjungti tarp darbo ir pertraukos
            setIsWorkMode(!isWorkMode);
            setTimeLeft((isWorkMode ? breakTime : workTime) * 60);
        }
        return () => clearInterval(interval);
    }, [isRunning, timeLeft, isWorkMode, workTime, breakTime]);

    // Pradėti laikmatį
    const startTimer = () => {
        setIsRunning(true);
        setIsPaused(false);
    };

    // Pristabdyti laikmatį
    const pauseTimer = () => {
        setIsRunning(false);
        setIsPaused(true);
    };

    // Atstatyti laikmatį
    const resetTimer = () => {
        setIsRunning(false);
        setIsPaused(false);
        setTimeLeft(workTime * 60);
        setIsWorkMode(true);
    };

    // Atnaujinti darbo laiką
    const updateWorkTime = (minutes) => {
        if (minutes >= 1 && minutes <= 500) {
            setWorkTime(minutes);
            if (!isRunning && isWorkMode) {
                setTimeLeft(minutes * 60);
            }
        }
    };

    // Atnaujinti pertraukos laiką
    const updateBreakTime = (minutes) => {
        if (minutes >= 1 && minutes <= 60) {
            setBreakTime(minutes);
            if (!isRunning && !isWorkMode) {
                setTimeLeft(minutes * 60);
            }
        }
    };

    // Formatavimo funkcijos
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="pomodoro-container">
            <h2 className={isWorkMode ? 'work-mode' : 'break-mode'}>
                {isWorkMode ? 'Work Time' : 'Break Time'}
            </h2>
            <div className="timer-display">{formatTime(timeLeft)}</div>
            
            <div className="timer-controls">
                <button onClick={startTimer} disabled={isRunning}>Start</button>
                <button onClick={pauseTimer} disabled={!isRunning}>Pause</button>
                <button onClick={resetTimer}>Reset</button>
            </div>

            <div className="timer-settings">
                <div className="setting">
                    <label htmlFor="workTime">Work Time (minutes):</label>
                    <input
                        type="number"
                        id="workTime"
                        value={workTime}
                        onChange={(e) => updateWorkTime(parseInt(e.target.value))}
                        min="1"
                        max="500"
                        disabled={isRunning}
                    />
                </div>
                <div className="setting">
                    <label htmlFor="breakTime">Break Time (minutes):</label>
                    <input
                        type="number"
                        id="breakTime"
                        value={breakTime}
                        onChange={(e) => updateBreakTime(parseInt(e.target.value))}
                        min="1"
                        max="60"
                        disabled={isRunning}
                    />
                </div>
            </div>
        </div>
    );
}

export default Pomo;