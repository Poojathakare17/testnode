"use strict";
import express      from 'express';
import path         from 'path';
import http         from 'http';
import bodyParser   from 'body-parser';
import cors         from 'cors';
let app = express();
import mysql         from 'mysql';
import md5         from 'md5';
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


app.post('/view1',  (req, res) => {
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
    connection.query('INSERT INTO people (name) VALUES (?)', [body.name], function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}

http.createServer(app).listen(app.get('port'),  ()=> {
    console.log('Express server listening on port ' + app.get('port'));
});


module.exports = app;