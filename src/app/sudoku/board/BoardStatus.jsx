import React from "react";
import Spinner from "@components/common/Spinner";
import { SPINNER_STATUSES } from "@components/common/Spinner";
import STATUSES from "@store/sudoku/gameStatuses";

import { useSelector } from "react-redux";
import game from "@app/sudoku/data/game-data";

function ResumePause() {
    return (
        <div id="board_pause" onClick={() => game.resume()}>
            <div className="sign"></div>
        </div>
    );
}

function BoardStatus() {
    const { status } = useSelector(({ sudoku }) => sudoku.gameStatus);

    switch (status) {
        case STATUSES.LOADING:
            return <Spinner status={SPINNER_STATUSES.LOADING} />;
        case STATUSES.SUCCESS:
            return <Spinner status={SPINNER_STATUSES.SUCCESS} />;
        case STATUSES.FAILED:
            return <Spinner status={SPINNER_STATUSES.FAILED} />;
        case STATUSES.PAUSE:
            return <ResumePause />;
    }
    return null;
}

export default BoardStatus;
