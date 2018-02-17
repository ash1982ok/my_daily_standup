//
// # Standup Server
//
// A simple server for standup module
//
var http = require('http');
var path = require('path');

var async = require('async');
var express = require('express');

var bodyParser = require('body-parser')


//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);

router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var dbConnection = require('./app.js');
var dbCon = new dbConnection();

router.use(express.static(path.resolve(__dirname, 'client')));

router.post('/api/saveTask', function (req, res) {
    
    dbCon.saveTaskToDb(req.body.taskItem,function(err){
      if(err) {
        console.log("Error in saving!!!");
        res.render("Error in saving!!!");
      }
       dbCon.getTaskListFromDb(function(doc){
        res.send(doc);
      });
    
    });
});

router.get('/api/getTasks', function (req, res) {
   
    dbCon.getTaskListFromDb(function(doc){
      res.send(doc);
    });
});

router.get('/api/removeTasks', function (req, res) {
   
    dbCon.removeAllTasks(function(){
      res.send("removed");
    });
});


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Standup Server listening at", addr.address + ":" + addr.port);
});
