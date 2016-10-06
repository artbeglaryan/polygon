var express = require('express');
var app     = express();

app.use(express.static(__dirname + '/build'));

app.all('/*', function (req, res) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('/build/index.html', { root: __dirname });
});

app.listen(8080);
console.log('Magic happens on 8080');
