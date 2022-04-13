import React from "react";
import "@styles/spinner.scss";

function Spinner({ status }) {
    /*
        statuses: "loading", "success", "failed"
    */
    let className = "circle-loader";

    if (status != SPINNER_STATUSES.LOADING) className += " load-complete " + status;

    return (
        <div className={className}>
            {status == SPINNER_STATUSES.SUCCESS && <div className="checkmark"></div>}
            {status == SPINNER_STATUSES.FAILED && <div className="cross"></div>}
        </div>
    );
}

export default Spinner;
export const SPINNER_STATUSES = {
    SUCCESS: "success",
    FAILED: "failed",
    LOADING: "loading",
};
