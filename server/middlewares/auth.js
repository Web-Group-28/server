const { NextFunction, Response } = require("express");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/config.env");
const UserModel = require("../models/user");

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.sendStatus(401);
        }
        const token = authHeader.split(' ')[1];
        const data = jwt.verify(token, secret);

        const user = await UserModel.findById(data.id);

        if (!user) {
            return res.sendStatus(401);
        }

        req.user = user;
        next();
    } catch (err) {
        res.sendStatus(401);
    }
};
