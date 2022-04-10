import React from "react";

import NewGameBtn from "./NewGameBtn";
import ControlItems from "./ControlItems";
import Numpad from "./Numpad";

import "./control.scss";

function Control() {
    return (
        <div className="control">
            <NewGameBtn />
            <ControlItems />
            <Numpad />
        </div>
    );
}

export default React.memo(Control);
