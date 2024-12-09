const express = require('express');
const app = express();
const port = 3000;

// Route สำหรับ /about
app.get('/about', (req, res) => {
  res.send('This is about page.');
});

// Route สำหรับ /my-json-api3
app.get('/my-json-api3', (req, res) => {
  res.json({ University: 'PIM' });
});

// Route สำหรับ /users2
app.get('/users2', (req, res) => {
  res.json([
    { id: 1, firstname: 'Somchai', lastname: 'Jaidee' },
    { id: 2, firstname: 'Tony', lastname: 'Stark' }
  ]);
});

app.listen(3000, () => {
  console.log("Server started on port 3000")
})
