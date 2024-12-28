const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

// ตั้งค่าการเชื่อมต่อ MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bookstore',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// GET /query-1: ดึงหนังสือมาแสดง 2 เล่มแรกที่ชื่อมีตัวอักษร "o"
app.get('/query-1', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM books WHERE title LIKE ? LIMIT 2', ['%o%']);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching books with "o"' });
    }
});

// GET /query-2: หาว่าขายหนังสือได้กี่เล่ม
app.get('/query-2', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT SUM(sold) AS totalSold FROM books');
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error calculating total books sold' });
    }
});

// GET /query-3: หาว่ามีหนังสืออะไรบ้างที่ขายออก (แสดงเฉพาะ ISBN)
app.get('/query-3', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT isbn FROM books WHERE sold > 0');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching sold books ISBN' });
    }
});

// GET /query-4: หาว่าขายหนังสือได้เงินทั้งหมดเท่าไร
app.get('/query-4', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT SUM(sold * price) AS totalSales FROM books');
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error calculating total sales' });
    }
});

// เริ่ม Server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
