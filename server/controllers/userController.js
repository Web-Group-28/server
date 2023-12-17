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

    async addScore(req, res) {
        try {
            const { score } = req.body;

            if (!score || isNaN(score)) {
                return res.status(400).json({ error: 'Invalid score provided' });
            }

            const user = await User.findById(req.user._id).exec();

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            user.weekScore += parseFloat(score);
            await user.save();

            return res.json({ message: 'Score added successfully', weekScore: user.weekScore });
        } catch (err) {
            console.error('Error adding score:', err);
            return res.status(500).json({ error: 'Internal server error' });
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
