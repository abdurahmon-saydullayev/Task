const mongoose = require("mongoose");
const { v4 } = require("uuid");

const BookSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    name: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "price is REQUIRED"],
    },
    author_id: {
      type: String,
      required: [true, "author_id is REQUIRED"],
    },
    year: {
      type: Number,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
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

 module.exports = mongoose.model("Book", BookSchema);
