const { User, validate } = require("../models/users");

async function register(userData) {
    const { value, error } = validate(userData);
    if (error) {
        throw new Error(error.details[0].message);
    } else {
        const res = await User.create(value)
        .catch(err => {
            if (err.code == 11000){
                throw new Error(Object.keys(err.keyValue)[0] + " exists");
            }
            throw new Error(err.message);
        });

        return res;
    }
}

module.exports = { register };
