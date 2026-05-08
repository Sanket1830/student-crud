const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  course: String,
  age: Number,
  address: String
});

module.exports = mongoose.model("Student", studentSchema);