const express = require('express')
const axios = require('axios');

var cors = require('cors')
var app = express()

app.use(cors());

const fetchSudoku = (difficulty, res) => {
  axios.get(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
  .then(response => {
    const data = response.data.board
    res.json(data);
  })
  .catch(err => {
    console.log(err);
    res.status(404).json('error');
  })
}

app.get('/easy', function (req, res) {
  fetchSudoku('easy', res);
})

app.get('/medium', function (req, res) {
  fetchSudoku('medium', res);
})

app.get('/hard', function (req, res) {
  fetchSudoku('hard', res);
})

app.listen(3000);