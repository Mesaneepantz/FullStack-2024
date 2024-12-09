const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.get('/read-users', (req, res) => {
  fs.readFile('./users.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return res.status(500).send('Error reading users data');
    }
    res.json(JSON.parse(data));
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000")
})
