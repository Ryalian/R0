const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const fileUpload = require('express-fileupload');

const calendarApp = require('./R0/Calendar/index');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(favicon(__dirname + '/public/images/star.png'));
app.use('/', express.static('public'));
app.use('/saveImages', express.static('saveImages'));

app.get('/getS2Engines', (req, res) => {
  var s2Engines = {
    S2Kikan: [
      {
        actions: ['Sort1', 'Sort2', 'Sort3', 'Sort4'],
        state: ["A", "B", "C"],
        items: ['JS', 'HTML', 'C++'],
        appName: 'Resume'
      }
    ],
    version: "Type01"
  }
  res.send(s2Engines);
});

let events = [];
app.get('/eventList', (req, res) => {
  res.send(events)
})

app.post('/api/uploadFile', (req, res) => {

  let imageFile = req.files.file,
      fileName = imageFile.name;
      
  imageFile.mv(`${__dirname}/saveImages/${fileName}`, function(err) {
    if (err) {
      console.log(err)
      return res.status(500).send(err);
    }

    res.json({file: `/saveImages/${fileName}`});
  });
})

app.get('/api/getImagesList', (req, res) => {
  fs.readdir(`${__dirname}/saveImages`, (err, items) => {
    if (err) {
      console.log(err)
      res.status(500).send(err);
    }

    items = items.map(item => `/saveImages/${item}`);
    res.send({ items });
  })
})

calendarApp(app)

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); 
})


let port = 8080
app.listen(port, () => {
  console.log('Example app listening on port ' + port + '!');
});
