import React from "react";
import Joi from "joi";

import Form from "@components/common/Form";
import userServices from "@services/userServices";

class Register extends Form {
    constructor(props) {
        super(props);

        this.schema = Joi.object({
            username: Joi.string().alphanum().required().min(5),
            email: Joi.string()
                .email({
                    tlds: {
                        allow: false,
                    },
                })
                .required(),
            password: Joi.string().min(6).required(),
        });
    }
    doSubmit = () => {
        const { data } = this.state;
        for (let name in data) data[name] = data[name].trim();

        userServices
            .registerUser(data)
            .then((response) => {
                this.props.navigate("/login");
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    super.setState({
                        errors: {
                            message: error.response.data.error,
                        },
                    });
                }
            });
    };

    render() {
        return (
            <form className="form" onSubmit={this.submit}>
                {this.renderInput("username", "username")}
                {this.renderInput("email", "email")}
                {this.renderInput("password", "password", "password")}
                {this.errorMessage()}
                {this.renderButton("Register")}
            </form>
        );
    }
}

export default Register;
