import mongoose from "mongoose";

const ActiveSessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    deviceId: {
      type: String,
      default: null,
    },

    lastSeenAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);
ActiveSessionSchema.index(
  { lastSeenAt: 1 },
  { expireAfterSeconds: 60 }
);

export default mongoose.model("ActiveSession", ActiveSessionSchema);