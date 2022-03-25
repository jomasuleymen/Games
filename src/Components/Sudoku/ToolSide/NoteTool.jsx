import React, { useState } from "react";

function NoteTool({ name, func, Icon }) {
    const [noteMode, setNodeMode] = useState(false);

    return (
        <div className="tool">
            <div className={`noteStatus ${noteMode ? "noteOn" : "noteOff"}`}>{noteMode ? "ON" : "OFF"}</div>
            <div
                className="icon"
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
            <div className="tool-name">{name}</div>
        </div>
    );
}

export default NoteTool;
