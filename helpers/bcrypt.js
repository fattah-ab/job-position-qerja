const bcrypt = require('bcryptjs');
const saltRound = Number(process.env.SALT_ROUND);

const encryptPassword = (password) => bcrypt.hash(password, saltRound);
const decryptPassword = (password, userPassword) => bcrypt.compareSync(password, userPassword);

module.exports = {
    encryptPassword,
    decryptPassword,
};