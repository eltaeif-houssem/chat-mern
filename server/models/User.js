// Import core modules
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Import custom modules
import customError from "../handlers/customError.js";

// Define userSchema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Hash the password
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Signup a user
userSchema.statics.register = async function (body) {
  const usernameExist = await User.findOne({ username: body.username });
  if (usernameExist) throw customError("username already in use.", 400);

  const emailExist = await User.findOne({ email: body.email });
  if (emailExist) throw customError("email already in use.", 400);

  const newUser = await User.create(body);
  delete newUser._doc.password;

  return newUser;
};

// Login a user
userSchema.statics.login = async function (body) {
  const userExist = await User.findOne({ email: body.email });
  if (!userExist) throw customError("no user was found.", 404);

  const isMatch = bcrypt.compare(body.password, userExist.password);
  if (!isMatch) throw customError("email or password are incorrect!", 404);

  delete userExist._doc.password;

  return userExist;
};

// Define user model
const User = mongoose.model("users", userSchema);
export default User;
