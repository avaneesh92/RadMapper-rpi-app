/*********************************************************
 *  Main Entry point for Rpi app.
 *  
 */
var bodyParser = require('body-parser');
var http = require('http');
var express = require('express');
var app = express();
const cp = require('child_process');

//Custom modules


/**********************Kinect handler process******************/
var kinectServer = cp.fork('./kinect-server.js');
kinectServer.on('message',(msg)=>{
  
});
/**********************Rover Movements Handler Process**********/
var roverServer = cp.fork('./rover-server.js');
roverServer.on('message',(msg)=>{
  
});

/****************Server API Interface***************************/
var program = {
  port: 3000,
  host: '0.0.0.0'
}
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
let MotionAPI = require('./api/motion.js');
new MotionAPI(app);

http.createServer(app).listen(program.port, program.host, function() {
  console.log('Listen on %s:%s', program.host, program.port);
});
