const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoUri = process.env.MONGODB_URI;
const oldId = '6a08bb0c89df08c60f917cba'; // Admin record ID
const newId = '6a12046354f4024ab0500b25'; // User record ID

async function run() {
  try {
    try {
      await mongoose.connect(mongoUri);
    } catch (err) {
      await mongoose.connect(process.env.MONGODB_URI_DIRECT);
    }

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    for (const collInfo of collections) {
      const collName = collInfo.name;
      const collection = db.collection(collName);

      const matches = await collection.find({
        $or: [
          { email: /raj\.connects/i },
          { email: 'raj.connects@gmail.com' },
          { userId: oldId },
          { userId: newId },
          { userId: new mongoose.Types.ObjectId(oldId) },
          { userId: new mongoose.Types.ObjectId(newId) },
          { chartersUserId: oldId },
          { chartersUserId: newId },
          { user: new mongoose.Types.ObjectId(oldId) },
          { user: new mongoose.Types.ObjectId(newId) },
          { _id: new mongoose.Types.ObjectId(oldId) },
          { _id: new mongoose.Types.ObjectId(newId) }
        ]
      }).toArray();

      if (matches.length > 0) {
        console.log(`\n--- Collection: ${collName} (${matches.length} matches) ---`);
        matches.forEach(m => {
          console.log({
            _id: m._id,
            email: m.email,
            userId: m.userId,
            chartersUserId: m.chartersUserId,
            user: m.user,
            pbUserId: m.pbUserId,
            role: m.role,
            status: m.status
          });
        });
      }
    }

    await mongoose.connection.close();
  } catch (err) {
    console.error("Failed:", err);
  }
}

run();
