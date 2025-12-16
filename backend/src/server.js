import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

/* Render requires this */
const PORT = process.env.PORT;

/* Fix __dirname in ES modules */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Middleware */
app.use(express.json());
app.use(cors());

/* Rate limit ONLY APIs */
app.use("/api", rateLimiter);

/* API routes */
app.use("/api/notes", notesRoutes);

/* Serve frontend */
const frontendPath = path.join(__dirname, "../../frontend/dist");
console.log("Serving frontend from:", frontendPath);

app.use(express.static(frontendPath));

/* React Router fallback */
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

/* Start server */
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
