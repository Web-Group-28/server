class BaseResponse{
    static ofSucceed(data){
        return {
            data: data,
            meta: {
                code: 200
            }
        }
    }

    static ofError(message, code){
        return {
            data:{
                "error": message
            },
            meta: {
                code: code
            }
        }
    }
}

module.exports = BaseResponse;