import React from "react";
import "@styles/spinner.scss";

function Spinner({ status }) {
    /*
        statuses: "loading", "success", "error"
    */
    return (
        <div
            className={`circle-loader ${
                status != "loading" ? "load-complete" : ""
            }`}
        >
            {status == "success" && <div className="checkmark"></div>}
        </div>
    );
}

export default Spinner;
