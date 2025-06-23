const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const postsRouter = require("./routes/posts");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin"); // <-- Make sure this exists

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // React app origin
  credentials: true
}));
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/myblog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);    // Authentication routes
app.use("/api/posts", postsRouter);  // Posts routes
app.use("/admin", adminRoutes);      // <-- Admin routes (MUST be before 404 handler)

// Default route (optional, for health check)
app.get("/", (req, res) => {
  res.send("API is running");
});
const notificationsRoutes = require('./routes/notifications');
app.use('/api/notifications', notificationsRoutes);

// 404 handler (should be last)
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Start server
const PORT = 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
