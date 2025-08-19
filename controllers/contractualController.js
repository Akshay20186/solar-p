// contractualController.js
const pool = require('../config/db');

exports.createContractual = async (req, res) => {
    try {
        const { farmer_id, details } = req.body;

        if (!farmer_id || !details) {
            return res.status(400).json({ error: "farmer_id and details are required" });
        }

        const [result] = await pool.query(
            'INSERT INTO contractual (farmer_id, details) VALUES (?, ?)',
            [farmer_id, details]
        );

        res.status(201).json({
            message: "Contractual created successfully",
            contractualId: result.insertId
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
};
// contractualController.js
exports.getAllContractual = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM contractual');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
};

