import React from "react";
import Joi from "joi";
import userServices from "@services/userServices";
import Form from "@components/common/Form";
class Login extends Form {
    constructor(props) {
        super(props);

        this.schema = Joi.object({
            username: Joi.string().alphanum().min(5).required(),
            password: Joi.string().min(6).required(),
        });
    }
    doSubmit = () => {
        const { data } = this.state;
        for (let name in data) data[name] = data[name].trim();
        userServices
            .loginUser(data)
            .then(() => {
                this.props.navigate("/games");
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
                {this.renderInput("username", "username or email")}
                {this.renderInput("password", "password", "password")}
                {this.errorMessage()}
                {this.renderButton("Log in")}
            </form>
        );
    }
}

export default Login;
