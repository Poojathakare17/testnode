var express = require('express'),
    http = require('http'),
    path = require('path'),
    bodyParser = require('body-parser');
cors = require('cors');
var app = express();
var mysql = require('mysql');
var md5 = require('md5');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
})

app.set('port', 3000);
connection.connect();
app.use(express.static(path.normalize(__dirname + '/')));
app.use(cors({ origin: '*' }));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing       application/x-www-form-urlencoded



app.post('/view1', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var dob = req.body.dob;
    // insert into db
    insertData(req.body);
    res.end();
});

function insertData(body) {
    console.log(body);
    connection.query('INSERT INTO people (name) VALUES (?)', [body.name], function(err,result) {
        if(err) throw err;
        console.log(result);
    });
}

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});