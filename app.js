var express = require('express'),
    cradle = require('cradle');

var app = express.createServer(express.bodyParser());
var conn = new(cradle.Connection)();
var db = conn.database('users');
var dba = conn.database('admin');
var dbc = conn.database('candidate');

require('jade');
app.set('view engine', 'jade');
app.set('view options', {layout: false});
app.use(express.logger());

app.configure(function(){
  app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
  res.render('home');
});

app.post('/register', function(req, res){
  var data = req.body;

  db.get(data.username, function(err, doc) {
    if(doc) {
      res.render('home', {flash: 'Username is already in use'});
    } else {
      db.save(data.username, data,
        function(db_err, db_res) {
          res.render('index');
        });
    }
  });
});

app.post('/admin-enter', function(req, res){
  var data = req.body;

  // Check if there is a corresponding user in db
  dba.get(data.adminname,function(err, doc){
      if(!doc) {
        res.render('admin', {flash: 'No user found'});
      } else if(doc.password != data.password) {
        res.render('admin', {flash: 'Wrong password'});
      } else { 
		res.render('results'); 
	  }
  });
});

app.post('/polled', function(req, res){
	if(req.body.candidate == "val1") {
		res.render('success', {flash: 'you have selected candidate1'});
	}
	else if(req.body.candidate == "val2") {
		res.render('success', {flash: 'you have selected candidate2'});
	}
	else {
		res.render('success', {flash: 'you have selected candidate3'});
	}
});

app.post('/admin', function(req, res){
    res.render('admin');
});



app.listen(3344);


