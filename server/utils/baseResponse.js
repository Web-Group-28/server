class BaseResponse{
    static ofSucceed(data){
        return {
            "data": data,
            "meta": {
                "code": 200
            }
        }
    }

    static ofSucceed(data, page, size, count){
        return {
            "data": data,
            "meta": {
                "code": 200,
                "page": page,
                "size": size,
                "count": count
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
            "meta": {
                "code": code,
                "message": message
            }
        }
    }
}

module.exports = BaseResponse;