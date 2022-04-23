const { tokenVerifier } = require("../helpers/jwt");

exports.Authentication = (req, res, next) => {
    const { access_token } = req.headers;
    if (!access_token) {
        res.status(400).json({
            success: false,
            message: "Token is not found!",
        });
    } else {
        try {
            const decoded = tokenVerifier(access_token);

            req.userData = decoded;
            next();
        } catch (err) {
            next(err);
        }
    }
};