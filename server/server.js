const express = require('express');
const body_parser = require('body-parser');
const _ = require('lodash');
const hbs = require('hbs');
const path = require('path');
const {mongoose} = require('./db/mongoose.js');
const {Url} = require('./models/shortUrl.js');


const app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));
let main_url;


app.get('/', (req, res) => {
  // Need to be changed
  main_url = 'http://localhost:3000';
  res.redirect('/urls');
})

app.get('/urls', (req, res) => {
  Url.find()
    .then(urls => {
      res.render('new.hbs', {
        main_url,
        urls
      });
    }, e => {
      res.status(404).send(e);
    })
})
app.post('/urls', (req, res) => {
  let original_url = req.body.original_url;
  if (original_url.indexOf('http://') === -1 && original_url.indexOf('https://') === -1) {
    original_url = 'http://' + original_url;
    console.log(original_url);
  }

  const url = new Url({
    original_url: original_url,
    shortened_url: req.body.shortened_url
  })

  url.save()
    .then(doc => {
      res.redirect('/');
    }, e => {
      res.status(404).send(e);
    })
})

app.get('/urls/new_Url', (req, res) => {
  res.render('new_Url.hbs');
})

app.get('/urls/:short', (req, res) => {
  const short = req.params.short;
  Url.find({shortened_url: short})
    .then(urls => {
      res.redirect(urls[0].original_url);
    }, e => {
      res.status(404).send(e)
    })
})



app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
})


































//
