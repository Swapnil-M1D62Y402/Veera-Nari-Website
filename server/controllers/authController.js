const pool = require("../config/db");

// Register user
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, password, role]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Login user (placeholder logic for now)
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  res.json({ message: `User logged in: ${email}` });
};

module.exports = { registerUser, loginUser };
