const express = require("express");
const UserModel = require('../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require("../../config");

const normalizeUser = (user) => {
    const token = jwt.sign({ id: user.id, email: user.email }, secret);
    return {
        email: user.email,
        username: user.username,
        id: user.id,
        token,
    };
};

const register = async (req, res, next) => {
    try {
        const newUser = new UserModel({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        });
        const savedUser = await newUser.save();
        res.send(normalizeUser(savedUser));
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            const messages = Object.values(err.errors).map((err) => err.message);
            return res.status(422).json(messages);
        }
        next(err);
    }
};

module.exports = {
    register,
};