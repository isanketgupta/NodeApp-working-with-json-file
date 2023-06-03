const path = require('path');
const fs = require('fs');


exports.downloadJSONFile = (req, res, next) => {
    const jsonData = req.query.data;  
    console.log(jsonData+' data')

    const filename = 'output.json';
    const filePath = path.join(__dirname, '..' , 'uploads', filename);
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
                console.log('deleting file node.js')
                // fs.unlinkSync(filePath);
            });
        }
    });
};