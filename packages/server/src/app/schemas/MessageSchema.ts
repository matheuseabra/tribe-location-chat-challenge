import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    name: String,
    text: String,
    location: {
      type: { type: String },
      coordinates: Array,
    },
  },
  {
    timestamps: {},
  },
);

MessageSchema.index({ location: '2dsphere' });

export default mongoose.model('Message', MessageSchema);
