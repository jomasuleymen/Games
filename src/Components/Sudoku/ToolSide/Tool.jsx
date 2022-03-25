import React from "react";

function Tool({ name, func, Icon }) {
    return (
        <div className="tool">
            <div className="icon" onClick={func}>
                < Icon /> 
            </div>
            <div className="tool-name">{name}</div>
        </div>
    );
}

export default Tool;
