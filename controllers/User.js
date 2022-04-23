const { User } = require('../models/user');
const { tokenGenerator } = require('../helpers/jwt');
const { decryptPassword } = require('../helpers/bcrypt');

class UserController {
    static async register(req, res, next) {
        try {
            let obj = {};
            const { username, email, password } = req.body;
            if (username) obj.username = username;
            if (email) obj.email = email;
            if (password) obj.password = password;

            let result = await User.create(obj);
            const access_token = tokenGenerator(result);
            res.status(200).json({
                success: true,
                message: "Successfully registered!",
                user: result,
                access_token
            });
        } catch (err) {
            next(err);
        }
    }

    static async login(req, res, next) {
        try {
            const { username, password } = req.body;
            if (!username) next({ message: "Please enter your username" });
            if (!password) next({ message: "Please enter your password!" });

            const find = await User.findOne({ username });
            if (!find) next({ message: "Account not found!" });

            if (decryptPassword(password, find.password)) {
                const access_token = tokenGenerator(find);
                const user = {
                    username : find.username,
                    email : find.email
                }
                res.status(200).json({
                    success: true,
                    message: "Login success!",
                    user : user,
                    access_token
                });
            } else {
                next({ message: "Password incorrect!" })
            }
        } catch (err) {
            next(err);
        }
    }

    static async getUser(req, res, next) {
        try {
            let result = await User
                .find()
                .select("-password")

            res.status(200).json({
                success: true,
                message: "Successfully showing all users!",
                data: result
            });
        } catch (err) {
            next(err);
        }
    }

    static async detailUser(req, res, next) {
        try {
            const { username } = req.userData;
            const user = await User
                .findOne({username})
                .select('-password')

            res.status(200).json({
                success: true,
                message: "Successfully showing user!",
                data: user
            });
        } catch (err) {
            next(err);
        }
    }
}
module.exports = UserController;
