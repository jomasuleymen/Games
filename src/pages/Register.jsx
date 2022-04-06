import React from "react";
import Joi from "joi";

import Form from "@components/common/Form";
import userServices from "@services/userServices";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    function doSubmit(data, setErrors) {
        for (let name in data) data[name] = data[name].trim();

        userServices
            .registerUser(data)
            .then((res) => {
                navigate("/login");
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    setErrors(error.response.data);
                }
            });
    }

    const inputs = [
        {
            name: "username",
            placeholder: "username",
        },
        {
            name: "email",
            placeholder: "email",
        },
        {
            name: "password",
            placeholder: "password",
            type: "password",
        },
    ];

    const validationSchema = Joi.object({
        username: Joi.string().alphanum().required().min(5),
        email: Joi.string()
            .email({
                tlds: {
                    allow: false,
                },
            }).required(),
        password: Joi.string().min(6).required(),
    });

    return (
        <Form
            doSubmit={doSubmit}
            inputs={inputs}
            btnText="Register"
            schema={validationSchema}
        />
    );
}

export default Register;
