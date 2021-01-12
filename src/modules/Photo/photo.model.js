import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema(
  {
    photoLabel: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
    },
  }
);

const Photo = mongoose.model('photos', photoSchema);

export default Photo;
