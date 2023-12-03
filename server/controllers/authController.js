const UserModel=require('../models/user');
const BaseResponse = require('../utils/baseResponse');
const Utils=require('../utils/utils');
const mongoose = require('mongoose');

class AuthController{
    async register(req, res, next){
        try {
            const user = await UserModel.findOne({ email: req.body.email });

            if(user != null){
                res.status(400).json(BaseResponse.ofError("Email " + req.body.email + " is already exist", 400));
                return;
            }

            const newUser = new UserModel({
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
            });
            const savedUser = await newUser.save();

            res.send(Utils.normalizeUser(savedUser));
        } catch (err) {
            if (err instanceof mongoose.Error.ValidationError) {
                const messages = Object.values(err.errors).map((err) => err.message);
                return res.status(500).json(BaseResponse.ofError(messages, 500));
            }
            next(err);
        }
    }

    async login(req, res, next){
        try {
            const user = await UserModel.findOne({ email: req.body.email }).select(
                "+password"
            );
            const error = "Incorrect email or password" ;
    
            if (!user) {
                return res.status(422).json(errors);
            }
    
            const isSamePassword = await user.validatePassword(req.body.password);
    
            if (!isSamePassword) {
                return res.status(400).json(BaseResponse.ofError(error, 400));
            }
            req.session.user = String(user._id);
            res.send(Utils.normalizeUser(user));
        } catch (err) {
            next(err);
        }
    }

    currentUser(req, res) {
        if (!req.user) {
            return res.sendStatus(401);
        }
        res.send(Utils.normalizeUser(req.user));
    };

    logout(req, res){
        req.session.destroy(); 
        res.status(200).send(BaseResponse.ofSucceed({message: "Logged out"}));
    }
}

module.exports = new AuthController();