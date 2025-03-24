const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  res.send("User registered!");
});

module.exports = router; // ✅ Correct export
