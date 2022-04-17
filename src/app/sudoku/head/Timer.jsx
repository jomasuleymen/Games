import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import Status from "./Status";
import game from "@app/sudoku/data/game-data";
import STATUSES from "@store/sudoku/gameStatuses";
import { formatTime } from "@utils/timeUtils";

function Timer() {
    const { status } = useSelector(({ sudoku }) => sudoku.gameStatus);

    useEffect(() => {
        if (status === STATUSES.PLAYING) {
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
                isPause={status === STATUSES.PAUSE}
                isToggable={
                    status === STATUSES.PAUSE || status === STATUSES.PLAYING
                }
            />
        </div>
    );
}

export default Timer;
