var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var stringifyFile;

app.use(bodyParser.json());
app.use(express.static('assets'));

app.get('/', function (req, res) {
  res.sendFile('/index.html');

  // fs.readFile('./test.json', 'utf-8', function (err, data) {
  //   if (err) throw err;
  //   stringifyFile = data;
  //   res.send(data);
  // })
});
app.get('/userform', function (req, res) {
  const response = {
    first_name: req.query.first_name,
    last_name: req.query.last_name
  };
  res.send(JSON.stringify(response));
});

app.get('/getNote', function (req, res) {
  fs.readFile('./test.json', 'utf-8', function (err, data) {
    if (err) throw err;
    stringifyFile = data;
    res.send(data);
    console.log("Data was fetch");
  })
});

app.post('/updateNote/:note', function (req, res) {
  fs.readFile('./test.json', 'utf-8', function (err, data) {
    if (err) throw err;
    stringifyFile = JSON.parse(data);
    stringifyFile.note.push(req.params.note);
    fs.writeFile('./test.json', JSON.stringify(stringifyFile), function (err) {
      if (err) throw err;
      console.log('File updated' + " - " + res);
    });
  });
  res.send();
});

var server = app.listen(3000, 'localhost', function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Przykładowa aplikacja nasłuchuje na http://' + host + ':' + port);
});