const pool = require('../config/db');

// Create Farmer
exports.createFarmer = async (req, res) => {
    try {
        const { name, cp_id } = req.body;
        if (!cp_id) {
            return res.status(400).json({ error: "cp_id is required" });
        }

        const [result] = await pool.query(
            "INSERT INTO farmer (name, cp_id) VALUES (?, ?)",
            [name, cp_id]
        );

        res.status(201).json({ id: result.insertId, name, cp_id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};


// Get Farmers
exports.getAllFarmers = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM farmer");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
