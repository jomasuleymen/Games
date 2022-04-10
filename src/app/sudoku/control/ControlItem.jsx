import React from "react";

function ControlItem({ name, func, Icon }) {
    return (
        <div className="control-item">
            <div className="control-icon" onClick={func}>
                <Icon />
            </div>
            <div className="control-name">{name}</div>
        </div>
    );
}

export default ControlItem;
