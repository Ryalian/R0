var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/public'));


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/getSomething', (req, res) => {
    res.send({abc: "oops"});
})

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});
