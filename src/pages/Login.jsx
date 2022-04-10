import React from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

import Form from "@components/common/Form";
import userServices from "@services/userServices";
import userActions from "@actions/user-actions";
import http from "@services/httpService";
import toast from "@utils/toast";

function Login() {
    const navigate = useNavigate();
    function doSubmit(data, setErrors) {
        for (let name in data) data[name] = data[name].trim();

        userServices
            .loginUser(data, setErrors)
            .then((res) => {
                const user = res.data;
                userActions.setUser(user);

                toast.success(`Hello, ${user.username}`);

                const token = res.headers["x-auth-token"]; /* reafactor -> separate */
                localStorage.setItem("x-auth-token", token);
                http.setJwt(token);
                navigate("/games");
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
            placeholder: "username or email",
        },
        {
            name: "password",
            placeholder: "password",
            type: "password",
        },
    ];

    const validationSchema = Joi.object({
        username: Joi.string().alphanum().min(5).required(),
        password: Joi.string().min(6).required(),
    });

    return (
        <Form
            doSubmit={doSubmit}
            inputs={inputs}
            btnText="Login"
            schema={validationSchema}
        />
    );
}

export default Login;
