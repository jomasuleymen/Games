import React from "react";
import ControlItem from "./ControlItem";
import ControlNoteItem from "./ControlNoteItem";

import {
    eraseSelectedCell,
    toggleNoteMode,
    giveHint,
    undo,
} from "./scripts/control-functions";

import { UndoIcon, EraseIcon, NotesIcon, HintIcon } from "./scripts/icons";

function ControlItems() {
    return (
        <div className="control-items">
            <ControlItem name="Undo" func={undo} Icon={UndoIcon} />
            <ControlItem name="Erase" func={eraseSelectedCell} Icon={EraseIcon} />
            <ControlNoteItem name="Notes" func={toggleNoteMode} Icon={NotesIcon} />
            <ControlItem name="Hint" func={giveHint} Icon={HintIcon} />
        </div>
    );
}

export default ControlItems;
