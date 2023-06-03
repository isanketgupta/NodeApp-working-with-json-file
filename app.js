const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const routes = require('./routes/route.js');

app.use(routes)




app.listen(3000, () => {
  console.log('Server is running on port 3000');
});