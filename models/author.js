const mongoose = require("mongoose");
const { v4 } = require("uuid");

const AuthorSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

module.exports = mongoose.model("Author", AuthorSchema);
