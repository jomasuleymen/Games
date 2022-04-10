import React, { useState } from "react";

function NoteItem({ name, func, Icon }) {
    const [noteMode, setNodeMode] = useState(false);

    return (
        <div className="control-item">
            <div className={`note-status ${noteMode ? "note-on" : "note-off"}`}>{noteMode ? "ON" : "OFF"}</div>
            <div
                className="control-icon"
                onClick={() => {
                    func();
                    setNodeMode(!noteMode);
                }}
                style={
                    {border: noteMode ? "2px solid #0072E3" : null}
                }
            >
                <Icon />
            </div>
            <div className="control-name">{name}</div>
        </div>
    );
}

export default NoteItem;
