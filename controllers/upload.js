const path = require('path');
const fs = require('fs');


exports.uploadJSONFile = (req, res, next) => {
    
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
  };