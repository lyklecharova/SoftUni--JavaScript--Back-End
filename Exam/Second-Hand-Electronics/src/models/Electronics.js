const mongoose = require("mongoose");

const electronicsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLenght: [10, "Name must be at least 10 characters"],
  },
  type: {
    type: String,
    required: [true, "Type  is required"],
    minLenght: [2, "Type must be at least 2 characters"],
  },
  damages: {
    type: String,
    required: [true, "Damages  is required"],
    minLenght: [10, "Damages must be at least 10 characters"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
    match: [/^https?:\/\/.+/, "Invalid URL!"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minLenght: [10, "Description must be at least minimum 10 characters"],
    maxLenght: [200, "Description must be at least maximum 200 characters"],
  },
  production: {
    type: Number,
    required: [true, "Production is required"],
    min: [1900, "Production must be at minimum 1900"],
    max: [2023, "Production must be at maximum 2023 "],
  },
  exploitation: {
    type: Number,
    required: [
      true,
      "Exploitation is required and should be a positive number",
    ],
    min: 1,
  },
  price: {
    type: Number,
    required: [true, "Price is required and should be a postive number"],
    min: 1,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  buyingList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Electronics = mongoose.model("Electronics", electronicsSchema);

module.exports = Electronics;
