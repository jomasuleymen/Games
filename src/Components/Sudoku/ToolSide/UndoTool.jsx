import React from "react";

function UndoTool({ name }) {
    return (
        <div className="tool">
            <div className="icon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 30 31"
                    width="30px"
                    height="30px"
                >
                    <path
                        d="M13.71 2.46a1 1 0 01.14 1.32l-.08.1-2.15 2.32 3.41.02a10 10 0 11-10 10 1 1 0 112 0 8 8 0 108.25-8h-.25l-3.48-.02 2.28 2.53a1 1 0 01.01 1.32l-.09.1a1 1 0 01-1.32 0l-.09-.08-3.76-4.18a1 1 0 01-.07-1.25l.08-.1 3.7-4.02a1 1 0 011.42-.06z"
                    ></path>
                </svg>
            </div>
            <div className="tool-name">{name}</div>
        </div>
    );
}

export default UndoTool;
