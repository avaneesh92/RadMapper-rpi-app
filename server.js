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
const eventBus = require('./helper/eventBus.js').evntBus;
const eventDef = require('./helper/eventsDef.js');

/**********************Kinect handler process******************/
var kinectServer = cp.fork('./kinect-server.js');
//Listen for kinect mcommand events
eventBus.on(eventDef.KINECT_CMD,function(data){
    kinectServer.send({"type":"cmd","payload":data});
})
kinectServer.on('message',(msg)=>{
  
});

/**********************Rover Movements Handler Process**********/
var roverServer = cp.fork('./rover-server.js');
//Listen for incoming rover commands on event bus
eventBus.on(eventDef.ROVER_CMD,function(data){
    roverServer.send({"type":"cmd","payload":data});
})

roverServer.on('message',(msg)=>{
  
});
process.on('exit', function () {
  roverServer.kill();
  kinectServer.kill();
});
/****************Server API Interface***************************/
var program = {
  port: 3000,
  host: '0.0.0.0'
}
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
let MotionAPI = require('./api/motion.js');
const mApi = new MotionAPI(app);

app.get('*', function(req,res){
  res.json({"status":"error","msg":"Invalid URL"});
});
app.post('*', function(req,res){
  res.json({"status":"error","msg":"Invalid URL"});
});
http.createServer(app).listen(program.port, program.host, function() {
  console.log('Listen on %s:%s', program.host, program.port);
});
