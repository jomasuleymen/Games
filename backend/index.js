const express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

const initialData = [
    [0, 0, 0, 0, 2, 0, 4, 0, 0],
    [0, 8, 4, 0, 0, 0, 6, 0, 3],
    [1, 7, 0, 0, 0, 3, 0, 0, 9],
    [0, 0, 0, 0, 6, 0, 7, 8, 0],
    [0, 4, 9, 3, 7, 2, 5, 1, 0],
    [7, 5, 6, 4, 0, 8, 3, 9, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 7],
    [0, 0, 0, 1, 0, 4, 9, 0, 0],
    [4, 6, 0, 2, 9, 0, 0, 0, 0],
];

app.get('/easy', function (req, res) {
  console.log("Request");
  res.json(initialData);
})

app.listen(3000);