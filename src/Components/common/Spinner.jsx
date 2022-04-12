import React from "react";
import "@styles/spinner.scss";

function Spinner({ status }) {
    /*
        statuses: "loading", "success", "failed"
    */
    let className = "circle-loader";

    if (status != "loading") className += " load-complete " + status;

    return (
        <div className={className}>
            {status == "success" && <div className="checkmark"></div>}
            {status == "failed" && <div className="cross"></div>}
        </div>
    );
}

export default Spinner;
