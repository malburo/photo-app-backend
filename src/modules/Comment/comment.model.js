import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    photoId: { type: mongoose.Schema.Types.ObjectId, ref: 'photos' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    content: String,
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
    },
  }
);

const Comment = mongoose.model('comment', commentSchema);

export default Comment;
