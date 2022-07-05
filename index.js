const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const parse = require('csv-parse').parse;
const os = require('os');
const multer  = require('multer');
const upload = multer({ dest: os.tmpdir() });
const fs = require('fs');
// const stringify = require('csv-stringify').stringify

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/read', upload.single('file'), (req, res) => {
    const file = req.file
  
    const data = fs.readFileSync(file.path)          // FIRST READ THE FILE USNIG READfILEsYNC()
    parse(data, (err, records) => {                  // THEN PARSE THE DATA USING csv PARSE
      if (err) {
        console.error(err)
        return res.status(400).json({success: false, message: 'An error occurred'})
      }
  
      return res.json({data: records})
    })
  })

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

