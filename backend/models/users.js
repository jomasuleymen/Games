const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true
    },
    dateRegister: {
        type: Date,
        default: Date.now,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});
const User = mongoose.model("users", userSchema);

const validateSchema = Joi.object({
    username: Joi.string().min(3).max(255).required().messages({
        "string.min": "name must have at least 3 characters",
    }),
    password: Joi.string().min(6).max(30).required()
}).options({ stripUnknown: true });

function validate(data) {
    return validateSchema.validate(data);
}

module.exports = { User, validate };
