const { Document } = require("mongoose");

const User = {
    email: String,
    username: String,
    password: String,
    createdAt: Date,
};

const UserDocument = {
    ...User,
    validatePassword: Function,
};

module.exports = { User, UserDocument };
