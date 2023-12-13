const express = require('express')

const app = express()

var __dirname = "C:/Users/M/Documents/Dev/LearningBackEnd/src"
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.mjs');
});

app.listen(8080, ()=>{
    console.log('Escuchando en el puerto 8080')
})