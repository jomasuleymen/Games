import React, { useEffect } from "react";

import game from "@components/sudoku/data/game-data";
import Status from "./Status";

function Timer() {
    useEffect(() => {
        const timerHtml = document.getElementById("timer");

        function getTimeWithFormat(time) {
            if (time < 10) {
                return `0${time}`;
            }
            return time;
        }

        setInterval(() => {
            if (!game.isPaused) {
                game.timer += 1;
                let time = "";
                const hour = getTimeWithFormat(Math.floor(game.timer / 3600));
                const minute = getTimeWithFormat(Math.floor((game.timer % 3600) / 60));
                const second = getTimeWithFormat(game.timer % 60);

                if (hour > 0) {
                    time = `${hour}:${minute}:${second}`;
                } else {
                    time = `${minute}:${second}`;
                }
                timerHtml.innerText = time;
            }
        }, 1000);
    }, []);
    return (
            <div className="time">
                <div id="timer">00:00</div>
                <Status />
            </div>
    );
}

export default Timer;
