const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 2,
      max: 40,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 2,
      max: 40,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
      min: 2,
      max: 4,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      required: true,
      min: 8,
    },
    role: {
      type: String,
      enum: ["user", "admin", "super-admin"],
      default: "admin",
    },
    contactNumber: {
      type: String,
      required: true,
      unique: true,
      min: 10,
      max: 13,
    },
    profilepicture: {
      type: String,
    },
  },
  { timestamps: true }
);

adminSchema.virtual("password").set(function (password) {
  this.hash_password = bcrypt.hashSync(password, 8);
});

adminSchema.virtual("fullName").set(() => {
  return `${this.firstName} ${this.lastName}`;
});

adminSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compareSync(password, this.hash_password);
  },
};

module.exports = mongoose.model("Admin", adminSchema);
