const {UserInputError} = require("apollo-server");

const User = require("../../models/User");
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config")
const {validateRegisterInput} = require("../../utils/validation");



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
              throw new UserInputError('Errors', {errors})
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

          const token = jwt.sign({
              id: res.id,
              email: res.email,
              userName: res.userName
          }, SECRET_KEY, { expiresIn: '1h' });

          return {
              ...res._doc,
              id: res._id,
              token
          }
    },
  },
};
