import React from "react";
import NumpadItem from "./NumpadItem";

function Numpad() {
    return (
        <div id="numpad">
            {Array(9)
                .fill()
                .map((_, idx) => (
                    <NumpadItem num={idx + 1} key={idx} />
                ))}
        </div>
    );
}

export default Numpad;
