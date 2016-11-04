var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/public'));


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/getS2Engines', (req, res) => {
  var s2Engines = {
    S2Kikan: [
      {
        actions: ['Sort1', 'Sort2', 'Sort3', 'Sort4'],
        state: ["A", "B", "C"],
        items: ['JS', 'HTML', 'C++']
      }
    ],
    version: "Type01"
  }
  res.send(s2Engines);
})

app.listen(80, () => {
  console.log('Example app listening on port 80!');
});
