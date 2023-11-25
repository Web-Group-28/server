const { NextFunction, Request, Response } = require("express");
const UserModel = require('../../models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const secret = require("../../config/config");
const normalizeUser = (user) => {
    const token = jwt.sign({ id: user.id, email: user.email }, secret.secret);
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

const login = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email }).select(
            "+password"
        );
        const errors = { emailOrPassword: "Incorrect email or password" };

        if (!user) {
            return res.status(422).json(errors);
        }

        const isSamePassword = await user.validatePassword(req.body.password);

        if (!isSamePassword) {
            return res.status(422).json(errors);
        }
        req.session.user = String(user._id);
        res.send(normalizeUser(user));
    } catch (err) {
        next(err);
    }
};

const currentUser = (req, res) => {
    if (!req.user) {
        return res.sendStatus(401);
    }
    res.send(normalizeUser(req.user));
};

module.exports = {
    register,
    login,
    currentUser
};