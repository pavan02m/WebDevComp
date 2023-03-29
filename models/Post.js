import mongoose, { Schema } from "mongoose";
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    img: { type: String },
    likes: { type: Number, default: 0 },
    comments: {
        type: [Schema.Types.ObjectId],
        ref : "comment",
    },
    userId: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

export default mongoose.model("post", postSchema);
