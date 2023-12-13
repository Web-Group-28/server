const User = require("../models/user");
const auth_utils = require("../utils/auth");
const jwt = require("jsonwebtoken");

class AuthController{

    async register(req, res) {
        try {
            // console.log(req.body);
            const { name, email, password } = req.body;
            // validation
            if (!name) return res.status(400).send("Name is required");
            if (!password || password.length < 6) {
            return res
                .status(400)
                .send("Password is required and should be min 6 characters long");
            }
            let userExist = await User.findOne({ email }).exec();
            if (userExist) return res.status(400).send("Email is taken");

            // hash password
            const hashedPassword = await auth_utils.hashPassword(password);

            // register
            const user = new User({
            name,
            email,
            password: hashedPassword,
            });
            await user.save();
            return res.json({ ok: true });
        } catch (err) {
            console.log(err);
            return res.status(400).send("Error. Try again.");
        }
    };

    async login(req, res) {
        try {
            const { email, password } = req.body;
            // check if our db has user with that email
            const user = await User.findOne({ email }).exec();
            if (!user) return res.status(400).send("No user found");
            // check password
            const match = await auth_utils.comparePassword(password, user.password);
            if (!match) return res.status(400).send("Wrong password");

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
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(400).send("Error. Try again.");
        }
    };

    async logout(req, res)  {
        try {
            res.clearCookie("token");
            return res.json({ message: "Signout success" });
        } catch (err) {
            console.log(err);
        }
    };

    async currentUser(req, res) {
        try {
            const { id } = req.body;
            const user = await User.findById(id).select("-password").exec();
            console.log("CURRENT_USER", user);
            return res.json({ ok: true });
        } catch (err) {
            console.log(err);
        }
    };

}

module.exports = new AuthController();