const User = require("../models/user");
const auth_utils = require("../utils/auth");
const jwt = require("jsonwebtoken");
const BaseResponse = require("../utils/baseResponse");

class AuthController{

    async register(req, res) {
        try {
            // console.log(req.body);
            const { name, email, password } = req.body;
            // validation
            if (!name) return res.status(400).send(BaseResponse.ofError("Name is required", 400));
            if (!password || password.length < 6) {
            return res
                .status(400)
                .send(BaseResponse.ofError("Password is required and should be min 6 characters long", 400));
            }
            let userExist = await User.findOne({ email }).exec();
            if (userExist) return res.status(400).send(BaseResponse.ofError("Email is taken", 400));

            // hash password
            const hashedPassword = await auth_utils.hashPassword(password);

            // register
            const user = new User({
            name,
            email,
            password: hashedPassword,
            });
            await user.save();
            return res.json(BaseResponse.ofSucceed(user));
        } catch (err) {
            console.log(err);
            return res.status(400).send(BaseResponse.ofError(err, 400));
        }
    };

    async login(req, res) {
        try {
            const { email, password } = req.body;
            // check if our db has user with that email
            const user = await User.findOne({ email }).exec();
            if (!user) return res.status(400).send(BaseResponse.ofError("No user found", 400));
            // check password
            const match = await auth_utils.comparePassword(password, user.password);
            if (!match) return res.status(400).send(BaseResponse.ofError("Wrong password", 400));

            // create signed jwt
            const token = jwt.sign({ _id: user._id }, "HJKAHFKJ4O930909JEJR998392J0R9H89438RH3490R043", {
                expiresIn: "7d",
            });
            // return user and token to client, exclude hashed password
            user.password = undefined;
            // send token in cookie
            res.cookie("token", token, {
                httpOnly: true,
            // secure: true, // only works on https
            });
            // send user as json response
            res.send(BaseResponse.ofSucceed(user));
        } catch (err) {
            console.log(err);
            return res.status(400).send(BaseResponse.ofError(err, 400));
        }
    };

    async logout(req, res)  {
        try {
            res.clearCookie("token");
            return res.send(BaseResponse.ofSucceed({ message: "Signout success" }));
        } catch (err) {
            console.log(err);
            return res.status(400).send(BaseResponse.ofError(err, 400));
        }
    };

    async currentUser(req, res) {
        try {
            const user = await User.findById(req.user._id).select("-password").exec();            
            console.log("CURRENT_USER", user);
            return res.send(BaseResponse.ofSucceed(user));
        } catch (err) {
            console.log(err);
            return res.status(400).send(BaseResponse.ofError(err, 400));
        }
    };

}

module.exports = new AuthController();