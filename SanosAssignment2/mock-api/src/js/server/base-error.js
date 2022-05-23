class BaseError extends Error {
    constructor(status, type, body) {
        super();
        this.errorStatus = status;
        this.errorBody = {
            error: {
                type,
                info: {
                    message: body
                }
            }
        };
    }
}

module.exports = {
    BaseError
};
