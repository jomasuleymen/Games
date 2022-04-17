import React from "react";

const Input = ({ name, error, type = "text", ...rest }) => {
    return (
        <div className="form-group">
            <input
                name={name}
                id={name}
                type={type}
                className="form-control"
                autoComplete="off"
                {...rest}
            />
            {error && (
                <div className="alert alert-danger error">{error}</div>
            )}
        </div>
    );
};

export default Input;
