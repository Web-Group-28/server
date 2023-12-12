const User = require('../models/userModel');

class UserController{
    async getProfile(req, res){
        try {
            const userId = req.body;
            const user = await User.findOne({ _id: userId }).populate({
            path: 'courses',
            populate: {
                path: 'parts',
                populate: {
                path: 'lessons',
                },
            },
            });

            if (!user) {
            return res.status(404).json({ error: 'User not found' });
            }

            let totalPoints = 0;

            user.courses.forEach((course) => {
            course.parts.forEach((part) => {
                part.lessons.forEach((lesson) => {
                totalPoints += lesson.userScore || 0;
                });
            });
            });

            res.json({ _id: user._id, name: user.name, point: totalPoints });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

}

module.exports = new UserController();
