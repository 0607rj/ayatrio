import ActiveSession from "../models/ActiveSession.model.js";

export const heartbeat = async (req, res) => {
  const userId = req.user?.id || null;
  const { sessionId, deviceId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ success: false, message: "sessionId required" });
  }

  await ActiveSession.findOneAndUpdate(
    { sessionId },
    { sessionId, userId, deviceId: deviceId || null, lastSeenAt: new Date() },
    { upsert: true, new: true },
  );

  return res.json({ success: true });
};

export const concurrentCount = async (req, res) => {
  // active docs in last 60 seconds are kept by TTL
  const count = await ActiveSession.countDocuments({});
  return res.json({ success: true, concurrentUsers: count });
};