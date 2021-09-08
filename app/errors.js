class UserError extends Error{
    constructor(errorMessage) {
        super();
        return new Error(errorMessage);
    }
}

module.exports = {UserError};