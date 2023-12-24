const User = require('../models/user');
const BaseResponse = require('../utils/baseResponse');

class LeaderBoardController{
    async getTopUser(req, res){
        try{
            const size = req.query.size || 10;
            const page = req.query.page || 0;
            const users = await User.find({}).select("-password").sort({weekScore: -1})
                .skip(page * size).limit(size).exec();
            const count = await User.count();
            return res.status(200).send(BaseResponse.ofSucceed(users, page, size, count));
        }
        catch(err){
            return res.status(400).send(BaseResponse.ofError(err, 400))
        }
    }
}

module.exports = new LeaderBoardController();