import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import Status from "./Status";
import game from "@app/sudoku/data/game-data";

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
    const { status } = useSelector(({ sudoku }) => sudoku.gameStatus);

    useEffect(() => {
        if (status === game.STATUSES.PLAYING) {
            const timerHtml = document.getElementById("timer");

            const interval = setInterval(() => {
                game.timer += 1;
                timerHtml.innerText = formatTime(game.timer);
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [status]);

    return (
        <div className="time">
            <div id="timer">00:00</div>
            <Status
                isPause={status === game.STATUSES.PAUSE}
                isToggable={
                    status === game.STATUSES.PAUSE ||
                    status === game.STATUSES.PLAYING
                }
            />
        </div>
    );
}

export default Timer;
