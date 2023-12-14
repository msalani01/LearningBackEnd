import express from 'express';

const app = express();
const PORT = 8080;
var __dirname = 'C:/Users/M/Documents/Dev/LearningBackEnd/src'
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.mjs');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
