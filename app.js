const express = require('express');
const bodyParser = require('body-parser');

const app = express();
let events = [];
var favicon = require('serve-favicon');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(favicon(__dirname + '/public/images/star.png'));
app.use('/', express.static('public'));

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

app.get('/eventList', (req, res) => {
  res.send(events)
})

app.post('/createEvent', (req, res) => {
  console.log(req.body);
  events.push(req.body)
  res.send("event saved");
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); 
})


let port = 8080
app.listen(port, () => {
  console.log('Example app listening on port ' + port + '!');
});
