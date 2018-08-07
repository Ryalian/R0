const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

const calendarApp = require('./R0/Calendar/index');

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

let events = [];
app.get('/eventList', (req, res) => {
  res.send(events)
})

calendarApp(app)


app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); 
})


let port = 8080
app.listen(port, () => {
  console.log('Example app listening on port ' + port + '!');
});
