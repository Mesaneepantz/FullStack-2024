const express = require('express')

const app = express()

const axios = require('axios');

app.get('/kanye', async (req, res) => {
   try {
       const url = 'https://api.kanye.rest/'; 
       const response = await axios.get(url);
       console.log(response)
       res.json(response.data); // Send the fetched data as a response
   } catch (error) {
       res.status(500).send('Error fetching data');
   }
});

app.listen(3000, () => {
    console.log("Server started on port 3000!")
})