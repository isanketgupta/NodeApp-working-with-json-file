const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  const filePath = file.path;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Failed to read the uploaded file.');
    } else {
      const jsonData = JSON.parse(data);
      res.render('table', { jsonData });
    }
  });
});


  
app.get('/download',(req, res) => {
  const jsonData = req.query.data;  
  console.log(jsonData+' data')

  const filename = 'output.json';
  const filePath = path.join(__dirname, 'uploads', filename);
console.log(filePath)
  fs.writeFile(filePath, jsonData, 'utf8', (err) => {
    if (err) {
        console.log('error in file creating'+err)
      console.error(err);
      res.status(500).send('Failed to create the JSON file.');
    } else {
      res.download( filePath, (err) => {
        if (err) {
            console.log('error in file download')
          console.error(err);
          res.status(500).send('Failed to download the JSON file.');
        }
        // fs.unlinkSync(filePath);
      });
    }
  });


});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});