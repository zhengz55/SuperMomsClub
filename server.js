//'use strict';
const log = console.log

// const http = require('http')

const ejs = require('ejs')

const express = require('express');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const path = require('path');
// const session = require('express-session')

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

Date.withOffset = function( offset ){
    var r = new Date();
    r.setHours(r.getHours()+offset);
    return r;
};

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

app.get('/shopping', (req, res) => {
  res.sendFile(__dirname + '/public/shopping.html');
})


app.get('/userProfile', (req, res) => {
  res.sendFile(__dirname + '/public/profile.html');
})

app.get('/viewProfile', (req, res) => {
  res.sendFile(__dirname + '/public/viewProfile.html');
})

app.get('/workshops', (req, res) => {
  res.sendFile(__dirname + '/public/workshop.html');
})

app.get('/faq', (req, res) => {
  res.sendFile(__dirname + '/public/faq.html');
})

app.get('/blogView', (req, res) => {
  res.sendFile(__dirname + '/public/blogView.html');
})

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/public/contact.html');
})

app.get('/cart', (req, res) => {
  res.sendFile(__dirname + '/public/cart.html');
})

app.get('/product', (req, res) => {
  res.sendFile(__dirname + '/public/product.html');
})

// app.get('/users', (req, res) => {
//   log("request received!")
//   res.status(200).send()
// })

app.get('/member', (req, res) => {
  res.sendFile(__dirname + '/public/info.html');
})

app.get('/event/:member_id', (req, res) => {
  pool.query('SELECT * FROM events where member_id=$1', [req.params.member_id], (err, resp) => {
    if (err) {
      res.status(500).send(err)
    }
    else if (resp.rows[0]) {
      log(resp.rows[0])
      res.status(200).send(resp.rows)
    } else {
      res.status(400).send()
    }
  })
})

app.get('/blogs/:member_id', (req, res) => { // still dangerous
  pool.query('SELECT * FROM blogs where member_id=$1', [req.params.member_id], (err, resp) => {
    if (err) {
      res.status(500).send(err)
    }
    else if (resp.rows[0]) {
      log(resp.rows[0])
      res.status(200).send(resp.rows)
    } else {
      res.status(400).send()
    }
  })
})

app.get('/blog/:id', (req, res) => {
  log(req.params.id)
  pool.query('SELECT * FROM blogs where blogid=$1', [req.params.id], (err, resp) => {
    log(resp.rows)
    if (err) {
      res.status(500).send(err)
    }
    else if (resp.rows[0]) {
      log(resp.rows[0])
      res.status(200).send(resp.rows)
    } else {
      res.status(400).send()
    }
  })
})

app.get('/events', (req, res) => {
  pool.query('SELECT * FROM events', (err, resp) => {
    if (err) {
      res.status(500).send(err)
    }
    else if (resp.rows[0]) {
      log(resp.rows[0])
      res.status(200).send(resp.rows)
    } else {
      res.status(400).send()
    }
  })
})

app.get('/messages', (req, res) => {
  pool.query('SELECT * FROM messages', (err, resp) => {
    if (err) {
      res.status(500).send(err)
    }
    else if (resp.rows[0]) {
      log(resp.rows[0])
      res.status(200).send(resp.rows)
    } else {
      res.status(400).send()
    }
  })
})

app.get('/users', (req, res) => {
  pool.query('SELECT * FROM members', (err, resp) => {
    if (err) {
      log(err)
      res.status(500).send(err)
    }
    else if (resp.rows[0]) {
      log(resp.rows[0])
      res.status(200).send(resp.rows)
    } else {
      res.status(400).send()
    }
  })
})



app.get('/fetchAllProducts', (req, res) => {
  pool.query('SELECT * FROM products', (err, resp) => {
    if (err) {
      res.status(500).send(err)
    }
    else if (resp.rows[0]) {
      log(resp.rows[0])
      res.status(200).send(resp.rows)
    } else {
      res.status(400).send()
    }
  })
})

// app.get('/fetchBlogs', (req, res) => {
//   pool.query('SELECT * FROM blogs', (err, resp) => {
//     if (err) {
//       res.status(500).send(err)
//     }
//     else if (resp.rows[0]) {
//       log(resp.rows[0])
//       res.status(200).send(resp.rows)
//     } else {
//       res.status(400).send()
//     }
//   })
// })

app.get('/fetchBlogs', (req, res) => {
  pool.query('SELECT * FROM blogs LEFT OUTER JOIN members ON blogs.member_id = members.memberid', (err, resp) => {
    if (err) {
      res.status(500).send(err)
    }
    else if (resp.rows[0]) {
      log(resp.rows[0])
      res.status(200).send(resp.rows)
    } else {
      res.status(400).send()
    }
  })
})

app.get('/comment/:id', (req, res) => {
  let id = req.params.id;
  pool.query('SELECT * FROM comments where blog_id=$1', [id], (err, resp) => {
    if (err) {
      res.status(500).send(err)
    }
    else if (resp.rows[0]) {
      log(resp.rows[0])
      res.status(200).send(resp.rows)
    } else {
      res.status(400).send()
    }
  })
})


app.get('/fetchWorkshops', (req, res) => { // not tested yet
  pool.query('SELECT * FROM workshops', (err, resp) => {
    if (err) {
      res.status(500).send(err)
    }
    else if (resp.rows[0]) {
      log(resp.rows[0])
      res.status(200).send(resp.rows)
    } else {
      res.status(400).send()
    }
  })
})

app.post('/users', (req, res) => {
  log("request received!")
  log(req.body)
  pool.query('INSERT INTO members(username, password, firstName, lastName, email, interests, type) VALUES($1, $2, $3, $4, $5, $6, $7)', [req.body.username, req.body.password, req.body.firstName, req.body.lastName, "Enter your email", "[]", 1], (err, resp) => {
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

app.post('/fetchUser', (req, res) => {
  var user = req.body.user
  pool.query('SELECT * FROM members where username=$1', [user], (err, resp) => {
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
  let curUser = JSON.parse(req.body.user);
  log(curUser.id)
  pool.query('UPDATE members SET email=$1, type=$2, bio=$3, interests=$4 where memberid=$5', [curUser.email, curUser.type, curUser.bio, curUser.interests, curUser.id], (err, resp) => {
    if (err) {
      res.status(500).send(err)
    }
    else {
      res.status(200).send()
    }
  })

})

app.patch('/photo', (req, res) => {
  let photo = JSON.parse(req.body.photo)
  pool.query('UPDATE members SET image=$1 where memberid=$2', [photo, req.body.id], (err, resp) => {
    if (err) {
      res.status(500).send(err)
    }
    else {
      res.status(200).send()
    }
  })

})

app.patch('/workshop', (req, res) => {
  let id = req.body.workshopID
  log(typeof id)
  pool.query('SELECT * from  workshops where id=$1', [req.body.workshopID], (err, resp) => {
    if (err) {
      res.status(500).send(err)
    }
    else {
      log(resp.rows[0])
      let newParticipants = resp.rows[0].participants
      newParticipants = JSON.parse(newParticipants)
      log(typeof newParticipants, newParticipants)
      newParticipants.push(req.body.username)
      newParticipants = JSON.stringify(newParticipants)
      pool.query('UPDATE workshops SET participants=$1 where id=$2', [newParticipants, id], (e, r) => {
        if (err) {
          res.status(501).send(err)
        } else {
          res.status(200).send()
        }
      })
    }
  })

})

app.post('/products', (req, res) => {
  let product = JSON.parse(req.body.product);
  pool.query('INSERT INTO products(name, stock, description, image, price, purchases) VALUES($1, $2, $3, $4, $5, $6)', [product.name, product.stock, product.description, product.photo, product.price, 0], (err, resp) => {
    if (err) {
      res.status(500).send(err)
    }
    else {
      res.status(200).send()
    }
  })
})

app.post('/messages', (req, res) => {
  let message = JSON.parse(req.body.message);
  let ts = Date.withOffset(-7)
  pool.query('INSERT INTO messages(member_id, content, ts) VALUES($1, $2, $3)', [message.id, message.content, ts], (err, resp) => {
    if (err) {
      res.status(400).send(err)
    }
    else {
      res.status(200).send()
    }
  })
})

app.post('/activities', (req, res) => {
  let event = JSON.parse(req.body.event);
  log(event.title, event.start_date, event.end_date, event.start_time, event.end_time, event.headcount, event.description, event.site, event.member_id)
  pool.query('INSERT INTO events(title, start_date, end_date, start_time, end_time, headcount, description, site, member_id, photo) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [event.title, event.start_date, event.end_date, event.start_time, event.end_time, event.headcount, event.description, event.site, event.member_id, event.photo], (err, resp) => {
    if (err) {
      res.status(500).send(err)
    }
    else {
      res.status(200).send()
    }
  })
})

app.post('/blogs', (req, res) => {
  let blog = JSON.parse(req.body.blog);
  log(blog)
  let timestamp = Date.withOffset(-7)
  pool.query('INSERT INTO blogs(title, content, photo, ts, member_id) VALUES($1, $2, $3, $4, $5)', [blog.title, blog.content, blog.photo.toString(), timestamp, blog.member_id], (err, resp) => {
    if (err) {
      res.status(500).send(err)
    }
    else {
      res.status(200).send()
    }
  })
})

app.post('/workshops', (req, res) => {
  let workshop = JSON.parse(req.body.workshop);



  let start_day = workshop.start_date.split("-")
  let start_hour = workshop.start_time.split(":")
  let end_day = workshop.end_date.split("-");
  let end_hour = workshop.end_time.split(":")



  let ts_start = new Date(start_day[0], start_day[1] - 1, start_day[2], start_hour[0], start_hour[1])
  let ts_end = new Date(end_day[0], end_day[1] - 1, end_day[2], end_hour[0], end_hour[1])
  log(ts_start, ts_end)

  let arr = [workshop.title, workshop.photo, workshop.description, workshop.link, ts_start, ts_end, workshop.site, workshop.headcount, workshop.member_id, workshop.price, "[]"];

  pool.query('INSERT INTO workshops(name, image, description, link, signup_start, signup_end, site, capacity, member_id, price, participants) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', arr, (err, resp) => {
    res.status(200).send()
  })
})

app.post('/comments', (req, res) => {
  let comment = JSON.parse(req.body.comment);
  log(comment)
  let timestamp = new Date().withOffset(-7)
  pool.query('INSERT INTO comments(member_name, member_id, content, blog_ID, ts) VALUES($1, $2, $3, $4, $5)', [comment.member_name, comment.member_id, comment.content, comment.blogID, timestamp], (err, resp) => {
    if (err) {
      log(err)
      res.status(500).send(err)
    }
    else {
      res.status(200).send()
    }
  })
})






app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))