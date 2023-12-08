class BaseResponse{
    static ofSucceed(data){
        return {
            data: data,
            meta: {
                code: 200
            }
        }
    }

    /**
     * Return response with error info
     * @param {String} message 
     * @param {Number} code 
     * @returns 
     */
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