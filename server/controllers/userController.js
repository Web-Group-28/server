const User = require('../models/user');
const cron = require('node-cron');
const BaseResponse = require('../utils/baseResponse');

class UserController{
    async getWeekScore(req, res){
        try {
            const user = await User.findById(req.user._id).select("-password").exec();            
            return res.status(200).send(BaseResponse.ofSucceed({
                "user_id": user._id,
                "week_score": user.weekScore
            }));
        } catch (err) {
            console.log(err);
            return res.status(400).send(BaseResponse.ofError(err))
        }
    };

    async updateWeekScore(req, res){
        try {
            const user = await User.findById(req.user_id).select("-password").exec();  
            user.weekScore = user.weekScore + req.score;
            await user.save();          
            return res.status(200).send(BaseResponse.ofSucceed({
                "user_id": user._id,
                "week_score": user.weekScore
            }));
        } catch (err) {
            return res.status(400).send(BaseResponse.ofError(err))
        }
    }

    async userData(req, res) {
        try {
            const user = await User.findById(req.user._id).select("-password").exec();            
            console.log("CURRENT_USER", user);
            return res.json(user);
        } catch (err) {
            console.log(err);
        }
    };

    constructor() {
        cron.schedule('0 0 * * 1', async () => {
            try {
                const users = await User.find().exec();
        
                for (const user of users) {
                user.weekScore = 0;
                await user.save();
                }
        
                console.log('Week scores reset successfully.');
            } catch (err) {
                console.error('Error resetting week scores:', err);
            }
        });
    }
}

module.exports = new UserController();
