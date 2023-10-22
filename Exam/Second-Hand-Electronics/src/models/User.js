const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minLenght: [3, "Username must be at least 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    minLenght: [10, "Username must be at least 10 characters"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minLenght: [4, "Username must be at least 4 characters"],
  },
});

userSchema.virtual("repeatPassword").set(function (value) {
  if (this.password !== value) {
    throw new Error("Password missmatch!");
  }
});

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
});
const User = mongoose.model("User", userSchema);

module.exports = User;
