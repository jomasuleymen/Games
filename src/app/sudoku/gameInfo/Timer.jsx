import React, { useEffect } from "react";

import game from "@app/sudoku/data/game-data";
import Status from "./Status";

const getTimeWithFormat = (time) => {
    if (time < 10) return `0${time}`;
    return time;
};

const formatTime = (millis) => {
    const hour = getTimeWithFormat(Math.floor(millis / 3600));
    const minute = getTimeWithFormat(Math.floor((millis % 3600) / 60));
    const second = getTimeWithFormat(millis % 60);

    if (hour > 0) return `${hour}:${minute}:${second}`;
    return `${minute}:${second}`;
};

function Timer() {
    useEffect(() => {
        const timerHtml = document.getElementById("timer");

        const interval = setInterval(() => {
            if (!game.isPaused) {
                game.timer += 1;
                timerHtml.innerText = formatTime(game.timer);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <div className="time">
            <div id="timer">00:00</div>
            <Status />
        </div>
    );
}

export default Timer;
