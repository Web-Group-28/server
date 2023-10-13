const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcryptjs = require('bcryptjs');

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [validator.isEmail, "Invalid email"],
        createIndexes: { unique: true },
    },
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false,
    },
},
{
    timestamps: true,
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    try {
        const salt = await bcryptjs.genSalt(10);
        this.password = await bcryptjs.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.validatePassword = function (password) {
    return bcryptjs.compare(password, this.password);
};

module.exports = model('User', userSchema);
