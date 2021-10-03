const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const fs = require('fs');
const wordListPath = require('word-list');
const wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n');

const findWords = (letterArr, word, results) => {
  const wordArr = word.split("");
  const newLetterArr = [...letterArr];
  for (let letter of wordArr) {
    if (!newLetterArr.includes(letter)) {
      return;
    }
    newLetterArr.splice(newLetterArr.indexOf(letter), 1);
  }
  results.push(word);
}

app.get('/getSomeWords', (req, res) => {
  const { letters, wordLength } = req.query;
  const letterArr = letters.split("");
  const results = [];
  for (let word of wordArray) {
    if (word.length === parseInt(wordLength)) {
      findWords(letterArr, word, results);
    }
  }
  res.json(results);
})

app.listen(process.env.PORT || 3001, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})
