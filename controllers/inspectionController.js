const pool = require('../config/db');

exports.createInspection = async (req, res) => {
    try {
        const { contractual_id, remarks } = req.body;

        if (!contractual_id || !remarks) {
            return res.status(400).json({ error: "contractual_id and remarks are required" });
        }

        const [result] = await pool.query(
            "INSERT INTO inspection (contractual_id, remarks) VALUES (?, ?)",
            [contractual_id, remarks]
        );

        res.status(201).json({
            message: "Inspection created successfully",
            id: result.insertId,
            contractual_id,
            remarks
        });
    } catch (err) {
        console.error("❌ SQL Error:", err.sqlMessage || err);
        res.status(500).json({ error: err.sqlMessage || "Database error" });
    }
};

exports.getAllInspections = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM inspection");
        res.json(rows);
    } catch (err) {
        console.error("❌ SQL Error:", err.sqlMessage || err);
        res.status(500).json({ error: err.sqlMessage || "Database error" });
    }
};
