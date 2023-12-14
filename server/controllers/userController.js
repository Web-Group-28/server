const User = require('../models/user');
const cron = require('node-cron');

class UserController{
    async getWeekScore(req, res){
        try {
            const user = await User.findById(req.user._id).select("-password").exec();            
            return res.json({ weekScore: user.weekScore });
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
