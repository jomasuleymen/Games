import React from "react";
import Tool from "./Tool";
import {
    eraseSelectedCell,
    toggleNoteMode,
    giveHint,
    undo,
} from "./toolFunctions";


function Tools() {
    return (
        <div className="tools">
            <Tool name="Undo" func={undo} />
            <Tool name="Erase" func={eraseSelectedCell} />
            <Tool name="Notes" func={toggleNoteMode} />
            <Tool name="Hint" func={giveHint} />
        </div>
    );
}

export default Tools;
