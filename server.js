//'use strict';
const log = console.log


const express = require('express');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session')

// const cors = require('cors');

const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'nexus',
  host: 'localhost',
  database: 'supermom',
  password: 'password',
  port: 5432,
})


const app = express();

var router = express.Router();
// app.use(cors)
app.use(express.static(path.join(__dirname, 'public')));
app.use("/js", express.static(__dirname + '/public/js'))
app.use("/css", express.static(__dirname + '/public/css'))
app.use("/img", express.static(__dirname + '/public/img'))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// app.use((req, res, next) => {
//     res.append('Access-Control-Allow-Origin', ['*']);
//     res.append('Access-Control-Allow-Origin', ['null']);
//     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.append('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended:true }));

function isValid(p) {
  var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
  var digits = p.replace(/\D/g, "");
  return phoneRe.test(digits);
}

function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/home.html');
})

app.get('/activities', (req, res) => {
  res.sendFile(__dirname + '/public/activities.html');
})

app.get('/blogs', (req, res) => {
  res.sendFile(__dirname + '/public/blogs.html');
})

app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/public/signUp.html');
})

app.get('/userProfile', (req, res) => {
  res.sendFile(__dirname + '/public/profile.html');
})

app.get('/users', (req, res) => {
  log("request received!")
  res.status(200).send()
})


app.post('/users', (req, res) => {
  log("request received!")
  log(req.body)
  pool.query('INSERT INTO members(username, password, firstName, lastName) VALUES($1, $2, $3, $4)', [req.body.username, req.body.password, req.body.firstName, req.body.lastName], (err, resp) => {
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    else {
      log(resp);
    }
  })
  res.status(200).redirect('/')
})

app.post('/userLogin', (req, res) => {
  log(req.body.username, req.body.password)
  pool.query('SELECT * FROM members where username=$1 AND password=$2', [req.body.username, req.body.password], (err, resp) => {
    if (err) {
      res.status(500).send(err)
    }
    else if (resp.rows[0]) {
      log(resp.rows[0])
      res.status(200).send(resp.rows[0])
    } else {
      res.status(400).send()
    }
  })
})

app.patch('/userProfile', (req, res) => {
  log(req.body)
})










app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))