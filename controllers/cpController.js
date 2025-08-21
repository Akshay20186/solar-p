const db = require('../config/db');

// Get all CPs
exports.getAllCP = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM cp");
        res.json(rows);
    } catch (err) {
        console.error("❌ getAllCP Error:", err);
        res.status(500).json({ error: err.message });
    }
};

// Create new CP
exports.createCP = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: "Name is required" });

        const [result] = await db.query("INSERT INTO cp (name) VALUES (?)", [name]);
        res.json({ id: result.insertId, name });
    } catch (err) {
        console.error("❌ createCP Error:", err);
        res.status(500).json({ error: err.message });
    }
};

// Get full hierarchy
exports.getFullHierarchy = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                cp.id AS cp_id, cp.name AS cp_name,
                f.id AS farmer_id, f.name AS farmer_name,
                c.id AS contractual_id, c.details AS contractual_details,
                i.id AS inspection_id, i.remarks AS inspection_remarks
            FROM cp
            LEFT JOIN farmer f ON f.cp_id = cp.id
            LEFT JOIN contractual c ON c.farmer_id = f.id
            LEFT JOIN inspection i ON i.contractual_id = c.id
        `);

        res.json(rows);
    } catch (error) {
        console.error("❌ getFullHierarchy SQL Error:", error.sqlMessage || error.message);
        res.status(500).json({
            error: "Database query failed",
            details: error.sqlMessage || error.message
        });
    }
};
