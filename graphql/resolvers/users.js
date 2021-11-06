const { UserInputError } = require("apollo-server");

const User = require("../../models/User");
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config")
const { validateRegisterInput, validatorLoginInput } = require("../../utils/validation");

const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        userName: user.userName
    }, SECRET_KEY, { expiresIn: '1hr' });
}

module.exports = {
    Mutation: {
        register: async (
            _,
            { registerInput: { userName, email, password, confirmPassword } },
            context,
            info
        ) => {
            //TODO validate data
            const { valid, errors } = validateRegisterInput(userName, email, password, confirmPassword)
            if (!valid) {
                throw new UserInputError('Errors', { errors })
            }
            //make sure user doesn't already exist

            const user = await User.findOne({ userName });
            if (user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        userName: "This username is taken"
                    }
                })
            }
            // hash password and create auth token
            password = await bcryptjs.hash(password, 12)
            const newUser = new User({
                email,
                userName,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = generateToken(res)

            return {
                ...res._doc,
                id: res._id,
                token
            }
        },
        login: async (_, { userName, password }) => {
            const { errors, valid } = validatorLoginInput(userName, password);
            const user = await User.findOne({ userName })

            if (!valid) {
                throw new UserInputError("Errors", { errors })
            }
            if (!user) {
                errors.general = "User not found"
                throw new UserInputError("User not found", { errors })
            }

            const match = await bcryptjs.compare(password, user.password)
            if (!match) {
                errors.general = "Wrong Credentials"
                throw new UserInputError("Wrong Credentials", { errors })
            }

            const token = generateToken(user)

            return {
                ...user._doc,
                id: user._id,
                token
            }
        }
    },
};
