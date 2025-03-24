const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(express.json());

// Ensure these are correctly imported
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/alert", require("./routes/alertRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/service-providers", require("./routes/serviceRoutes"));

app.get("/", (req, res) => res.send("Backend is running!"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
