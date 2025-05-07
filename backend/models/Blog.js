const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin', 
    required: true
  },
  content: [
    {
      type: {
        type: String,
        enum: ['text', 'image'],
        required: true
      },
      data: {
        type: String,
        required: true
      }
    }
  ],
  category: { type: String, required: true },
  created_Date: { type: Date, default: Date.now },
  status: { type: Number, default: 1 }, // 1 = Active, 0 = Soft Deleted
  tags: [{ type: String }]
});

module.exports = mongoose.model("Blog", blogSchema);
