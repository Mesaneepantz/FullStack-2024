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

// Route: ค้นหาหนังสือจากชื่อ เช่น "Mar" ค้นหาแล้วต้องเจอ
app.get('/search-books', async (req, res) => {
    const search = 'Mar';
    try {
        const [rows] = await pool.query('SELECT * FROM books WHERE title LIKE ?', [`%${search}%`]);
        console.log('ผลลัพธ์การค้นหา:', rows);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error searching books');
    }
});

// Route: ดึงหนังสือมาแสดง 2 เล่มแรกที่ชื่อมีตัวอักษร "o"
app.get('/books-with-o', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM books WHERE title LIKE ? LIMIT 2', [`%o%`]);
        console.log('หนังสือที่มีตัว "o":', rows);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching books with "o"');
    }
});

// Route: หาว่าขายหนังสือได้กี่เล่ม
app.get('/total-books-sold', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT SUM(sold) AS totalSold FROM books');
        console.log('ขายหนังสือได้ทั้งหมด:', rows[0].totalSold);
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error calculating total books sold');
    }
});

// Route: หาหนังสือที่ขายออก (แสดงเฉพาะ ISBN)
app.get('/sold-books-isbn', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT isbn FROM books WHERE sold > 0');
        console.log('ISBN หนังสือที่ขายออก:', rows);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching sold books ISBN');
    }
});

// Route: หายอดเงินทั้งหมดจากการขายหนังสือ
app.get('/total-sales', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT SUM(sold * price) AS totalSales FROM books');
        console.log('ยอดขายทั้งหมด:', rows[0].totalSales);
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error calculating total sales');
    }
});

// เริ่ม Server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
