const express = require('express');
const app = express();
var favicon = require('serve-favicon');

app.use(favicon(__dirname + '/public/images/star.png'));
app.use('/', express.static('public'));


app.get('/', function (req, res) {
  res.send('Hello World!');
});

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
})


let port = 8080
app.listen(port, () => {
  console.log('Example app listening on port ' + port + '!');
});
