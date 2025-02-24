const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  created_Date: { type: Date, default: Date.now },
  status: { type: Number, default: 1 }, // 1 = Active, 0 = Soft Deleted
  tags: [{ type: String }],
  image: { type: String },
  comments: [
    {
      comment: { type: String, required: true },
      commentedAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Blog", blogSchema);
