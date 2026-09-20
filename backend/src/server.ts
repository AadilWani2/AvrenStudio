import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/database.js";
import { verifyEmailTransporter } from "./services/emailService.js";

const PORT = process.env.PORT || 5000;

function startKeepAlive() {
  const serviceUrl =
    process.env.RENDER_EXTERNAL_URL ||
    process.env.API_URL ||
    "https://avrenstudio.onrender.com";

  // Ping every 14 minutes (Render sleeps after 15 minutes of inactivity on free tier)
  const INTERVAL = 14 * 60 * 1000;

  setInterval(async () => {
    try {
      const res = await fetch(`${serviceUrl}/api/health`);
      console.log(`[Keep-Alive] Pinged ${serviceUrl}/api/health: ${res.status}`);
    } catch (err: any) {
      console.warn(`[Keep-Alive] Ping failed: ${err.message}`);
    }
  }, INTERVAL);
}

async function startServer() {
  await connectDatabase();
  verifyEmailTransporter();

  app.listen(PORT, () => {
    console.log(`Nexora API running on port ${PORT}`);

    if (process.env.NODE_ENV === "production" || process.env.RENDER) {
      startKeepAlive();
    }
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});