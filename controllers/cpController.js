const pool = require('../config/db');

exports.getAllCP = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM cp"); // no callback
        res.json(rows);
    } catch (err) {
        console.error(err); // log the error
        res.status(500).json({ error: err.message });
    }
};

exports.createCP = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: "Name is required" });

        const [result] = await db.query("INSERT INTO cp (name) VALUES (?)", [name]);
        res.json({ id: result.insertId, name });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}; const db = require('../config/db');

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
        console.error("❌ SQL Error:", error.sqlMessage || error.message);
        res.status(500).json({ error: "Database query failed", details: error.sqlMessage || error.message });
    }
};

