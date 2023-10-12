const ErrorHandler = (err, req, res, next) => {
    const errMsg = err.message;

    res.json({
        success: false,
        message: errMsg
    })
}

module.exports = ErrorHandler