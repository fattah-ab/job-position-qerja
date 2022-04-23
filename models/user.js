const mongoose = require('mongoose');
const { encryptPassword } = require("../helpers/bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, `Please enter your username!`]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/, `Email format is incorrect!`]
    },
    password: {
        type: String,
        required: [true, `Please enter your password!`]
    }
}, { timestamps: true, versionKey: false });

userSchema.pre("save", async function (next) {
    let user = this;
    if (user.password && user.isModified("password")) {
        user.password = await encryptPassword(user.password);
    }
    next();
});


userSchema.post("save", (error, doc, next) => {
    let errorMessage = {};
    if (error.errors.name) errorMessage.name = error.errors.name.properties.message;
    if (error.errors.email) {
        if (error.errors.email.kind === 'unique') {
            errorMessage.email = `Email already used, use another email!`
        } else {
            errorMessage.email = error.errors.email.properties.message
        }
    };
    if (error.errors.phone) errorMessage.phone = error.errors.phone.properties.message;
    if (error.errors.password) errorMessage.password = error.errors.password.properties.message;
    if (error) {
        next({ message: errorMessage });
    } else {
        next();
    }
});

userSchema.plugin(uniqueValidator);
exports.User = mongoose.model("User", userSchema);