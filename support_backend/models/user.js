const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  CompanyName: {
    type: String,
    required: true,
    trim: true,
  },
  RegistrationNumber: {
    type: Number,
    required: true,
    trim: true,
  },
  RegistrationAddress: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  State: {
    type: String,
    required: true,
    trim: true,
  },
  postalcode: {
    type: Number,
    required: true,
    trim: true,
    minlength: 6,
  },
  PAN_Number: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.authToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user.id.toString() }, "myApp");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  // console.log(user);
  if (!user) {
    throw new Error("unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("unable to login");
  }
  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  //console.log("new user",user);
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  //console.log("save user",user);
  next();
});

let User = mongoose.model("User", userSchema);
module.exports = User;
