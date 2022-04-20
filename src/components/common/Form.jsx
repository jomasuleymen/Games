import React from "react";
import Input from "./Input";
import "@styles/form.scss";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            errors: {},
        };
    }

    // Child classess must implement: schema, doSubmit

    validate = () => {
        const { data } = this.state;
        const { error } = this.schema.validate(data, { abortEarly: false });
        if (!error) return null;

        const errorDetails = {};
        for (let err of error.details) errorDetails[err.path[0]] = err.message;
        return errorDetails;
    };

    submit = (e) => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit();
    };

    inputChange = ({ target: input }) => {
        this.setState({
            data: { ...this.state.data, [input.name]: input.value },
        });
    };

    renderInput = (name, placeholder, type) => {
        const value = this.state.data[name] || "";
        const error = this.state.errors[name];
        return (
            <Input
                name={name}
                placeholder={placeholder}
                type={type}
                onChange={this.inputChange}
                error={error}
                value={value}
            />
        );
    };

    errorMessage = () => {
        const { message } = this.state.errors;
        if (!message) return null;

        return (
            <div className="alert alert-danger error">
                {message}
            </div>
        );
    };

    renderButton = (name) => {
        return <button className="btn btn-primary">{name}</button>;
    };
}

export default Form;
