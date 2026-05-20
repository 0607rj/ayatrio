import "./src/config/loadEnv.js";
import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import {
  startUserSheetExporter,
  stopUserSheetExporter,
} from "./src/scripts/exportUsersToSheet.js";

const PORT = process.env.PORT || 10000;
const SHOULD_START_SHEET_EXPORTER =
  process.env.ENABLE_SHEET_EXPORT !== "false" &&
  Boolean(
    process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  );

// Connect to MongoDB then start server
const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected");

    // Auto-seed default Admin user if not present
    try {
      const adminPhone = process.env.SEED_ADMIN_PHONE || "+919999999999";
      const adminPassword = process.env.SEED_ADMIN_PASSWORD || "SecureAdmin123!";
      
      const User = (await import("./src/models/User.model.js")).default;
      const adminExists = await User.findOne({ phoneNumber: adminPhone });
      if (!adminExists) {
        console.log(`[Auto-Seed] Seeding default Admin user in database for number: ${adminPhone}...`);
        await User.create({
          name: "System Admin",
          email: "admin@chartersbusiness.com",
          phoneNumber: adminPhone,
          password: adminPassword,
          role: "admin",
          isFirstLogin: false,
          status: "active"
        });
        console.log("[Auto-Seed] Default Admin user seeded successfully!");
      } else {
        console.log(`[Auto-Seed] Admin user (${adminPhone}) already exists in database.`);
      }
    } catch (err) {
      console.error("[Auto-Seed] Failed to seed default Admin user:", err);
    }

    const server = app.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`
      );
    });

    if (SHOULD_START_SHEET_EXPORTER) {
      void startUserSheetExporter().catch((error) => {
        console.error("Google Sheets exporter failed to start:", error.message);
      });
    }

    const shutdown = () => {
      console.log("Shutting down server...");

      void stopUserSheetExporter()
        .catch((error) => {
          console.error(
            "Google Sheets exporter shutdown error:",
            error.message
          );
        })
        .finally(() => {
          server.close(() => {
            console.log("Server closed");
            process.exit(0);
          });
        });
    };

    // Graceful shutdown
    process.on("SIGINT", shutdown);

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();



// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  process.exit(1);
});

// Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});
