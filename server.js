const express = require('express');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(__dirname + '/views/partials');

require('./routes')(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
