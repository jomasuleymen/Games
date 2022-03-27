import React, { useEffect } from "react";

import { board } from "@components/sudoku/data/board-data";

import "@styles/gameInfo.scss";

function GameInfo() {
    let isPaused = false;

    useEffect(() => {
        const timerHtml = document.getElementById("timer");
        let timer = 0;

        function getTimeWithFormat(time) {
            if (time < 10) {
                return `0${time}`;
            }
            return time;
        }

        setInterval(() => {
            if (!isPaused){
                timer += 1;
                let time = "";
                const hour = getTimeWithFormat(Math.floor(timer / 3600));
                const minute = getTimeWithFormat(Math.floor((timer % 3600) / 60));
                const second = getTimeWithFormat(timer % 60);
    
                if (hour > 0) {
                    time = `${hour}:${minute}:${second}`;
                } else {
                    time = `${minute}:${second}`;
                }
                timerHtml.innerHTML = time;
            }
        }, 1000);
    }, []);
    return (
        <div className="game-info">
            <div className="auto-check">
                <span className="text">Auto-Check for Mistakes</span>
                <input type="checkbox" id="checkMistakes" />
                <label
                    htmlFor="checkMistakes"
                    onClick={() => {
                        board.toggleAutoCheck();
                    }}
                ></label>
            </div>
            <div className="time">
                <div id="timer">00:00</div>
                <div
                    className="status-icon"
                    onClick={(event) => {
                        let childClasses = event.target.classList;
                        if (!event.target.classList.contains('play-pause-icon'))
                            childClasses = event.target.firstChild.classList;

                        if (board.status == 'play') {
                            childClasses.remove("icon-pause");
                            childClasses.add("icon-play");
                            document.getElementById('board_pause').style.display = 'flex';
                            document.getElementById('board').classList.add('pause');
                        } else {
                            childClasses.remove("icon-play");
                            childClasses.add("icon-pause");
                            document.getElementById('board_pause').style.display = 'none';
                            document.getElementById('board').classList.remove('pause');
                        }
                        board.toggleStatus();
                        isPaused = !isPaused;
                    }}
                >
                    <div className="play-pause-icon icon-pause"></div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(GameInfo);
