import React from "react";
import Tool from "./Tool";
import NoteTool from "./NoteTool";

import {
    eraseSelectedCell,
    toggleNoteMode,
    giveHint,
    undo,
} from "./toolFunctions";

import { UndoIcon, EraseIcon, NotesIcon, HintIcon } from "./icons";

function Tools() {
    return (
        <div className="tools">
            <Tool name="Undo" func={undo} Icon={UndoIcon} />
            <Tool name="Erase" func={eraseSelectedCell} Icon={EraseIcon} />
            <NoteTool name="Notes" func={toggleNoteMode} Icon={NotesIcon} />
            <Tool name="Hint" func={giveHint} Icon={HintIcon} />
        </div>
    );
}

export default Tools;
