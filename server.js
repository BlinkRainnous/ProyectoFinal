const express = require('express');
const app = express();

const hbs = require('hbs');

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/database/'));

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/planes', (req, res) => {
  res.render('planes');
});

app.get('/general', (req, res) => {
  res.render('general');
});

app.get('/error', (req, res) => {
  res.render('error');
});

app.listen(port, () => {
  console.log('Listen port ' + port)
});