const mongoose = require ('mongoose');

const commentSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);


const hootSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["News", "Sports", "Games", "Movies", "Music", "Television"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

// This shouldnt wok unless we use typescript or set the type of project to module, but we do that only if we know what
// we are doing bc that breaks a bunch of stuff
// export const Hoot = mongoose.model("Hoot", hootSchema);


module.exports= mongoose.model("Hoot", hootSchema);
