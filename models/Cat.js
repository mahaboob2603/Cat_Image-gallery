const mongoose = require("mongoose");

const catSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    breed: { type: String, trim: true },
    age: { type: Number },
    description: { type: String, trim: true },
    imageUrl: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cat", catSchema);