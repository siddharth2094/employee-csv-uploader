const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const options = {
  toJSON: {
    transform: (doc, obj) => {
      delete obj.__v;
      delete obj.id;
      return obj;
    },
    virtuals: false,
  },
  strict: false,
  collection: "Employee",
};

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
      trim: true,
    },
    reporting_manager: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  options
);

module.exports = mongoose.model("Employee", employeeSchema);
