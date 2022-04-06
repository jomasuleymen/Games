import React, { useMemo, useState } from "react";
import Input from "./Input";

import "@styles/form.scss";

const validate = (data, schema) => {
    const { error } = schema.validate(data, { abortEarly: false });
    if (!error) return null;
    const errors = {};

    for (let err of error.details) errors[err.path[0]] = err.message;
    return errors;
};

function Form({ inputs, doSubmit, btnText, schema }) {
    const defaultData = useMemo(() => {
        const data = {};
        inputs.forEach((input) => {
            data[input.name] = "";
        });
        return data;
    }, []);

    const [data, setData] = useState(defaultData);
    const [errors, setErrors] = useState({});

    function submit(e) {
        e.preventDefault();
        const errors = validate(data, schema);
        setErrors(errors || {});
        if (errors) return;

        doSubmit(data, setErrors);
    }

    function inputChange({ target: input }) {
        setData({ ...data, [input.name]: input.value });
    }

    return (
        <form className="register-form" onSubmit={submit}>
            {inputs.map(({ name, placeholder, type }, idx) => (
                <Input
                    name={name}
                    error={errors[name]}
                    type={type}
                    value={data[name]}
                    placeholder={placeholder}
                    onChange={inputChange}
                    key={idx}
                />
            ))}

            {errors.message && (
                <div className="alert alert-danger p-1 error w-25 mt-1 mb-0">
                    {errors.message}
                </div>
            )}
            <button className="btn btn-primary mt-2 w-25">{btnText}</button>
        </form>
    );
}

export default Form;
