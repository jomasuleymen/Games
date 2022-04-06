import React from "react";

const Input = ({ name, error, type="text", ...rest }) => {
    return (
        <div className="form-group w-25 mt-3">
            <input
                name={name}
                id={name}
                type={type}
                className="form-control"
                autoComplete="off"
                {...rest}
            />
            {error && <div className="alert alert-danger p-1 error mb-0">{error}</div>}
        </div>
    );
};

export default Input;
