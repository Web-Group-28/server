const jwt = require('jsonwebtoken');
const BaseResponse = require('./baseResponse');

class Utils{
    static normalizeUser(user){
        const secret = process.env.SECRET || "secret"
        const token = jwt.sign({ id: user.id, email: user.email }, secret);
        const data = {
            email: user.email,
            username: user.username,
            id: user.id,
            token,
        };
        
        return BaseResponse.ofSucceed(data);
    };
}

module.exports = Utils;