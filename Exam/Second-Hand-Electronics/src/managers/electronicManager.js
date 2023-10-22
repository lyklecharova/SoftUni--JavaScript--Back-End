const Electronics = require("../models/Electronics");

exports.getAll = () => Electronics.find().populate("owner");

exports.getOne = (electronicId) =>
  Electronics.findById(electronicId).populate("owner");

exports.create = (electronicData) => Electronics.create(electronicData);

exports.delete = (electronicId) => Electronics.findByIdAndDelete(electronicId);

exports.edit = (electronicId, electronicData) =>
  Electronics.findByIdAndUpdate(electronicId, electronicData);

exports.buy = async (electronicId, electronicData) => {
  const electronic = await Electronics.findById(electronicId);

  electronic.buyingList.push(electronicData);

  return electronic.save();
};

exports.getByOwner = (userId) => Electronics.find({ owner: userId });
