const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const tokenGenerator = (user) => {
    const { _id, username, email } = user;

    return jwt.sign({
        _id,
        username,
        email
    },
        secretKey
    );
};

const tokenVerifier = (token) => {
    return jwt.verify(token, secretKey);
};

module.exports = {
    tokenGenerator,
    tokenVerifier
};
