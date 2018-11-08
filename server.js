
var bodyParser = require('body-parser');
var http = require('http');
var express = require('express');

var app = express();
const cp = require('child_process');

var kinectServer = cp.fork('./kinect-server.js');
kinectServer.on('message',(msg)=>{
  console.log(msg);
});

var roverServer = cp.fork('./rover-server.js');
roverServer.on('message',(msg)=>{
  console.log(msg);
});
var program = {
  port: 3000,
  host: '0.0.0.0'
}

var width = 640
var height = 480;
var boundaryID = "BOUNDARY";

var reArrangeBuffer = (type) => {
  return through(function(chunk, enc, done) {
    var data = new Buffer(width * height * 4);

    for (var i = 0, depth; i < width * height; i++) {
        data[4*i]   = type === 'depth' ? (depth = (chunk[2*i]+chunk[2*i+1]*255)/5) : chunk[3*i];
        data[4*i+1] = type === 'depth' ? depth : chunk[3*i+1];
        data[4*i+2] = type === 'depth' ? depth : chunk[3*i+2];
        data[4*i+3] = type === 'depth' ? 255 : chunk[3*i+2];;
    }
    this.push(data);
    done && done();
  })
}

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.get('/', function(req, res) {
  roverServer.send({'msg':'#>FW 200 3000<'});
  res.sendFile(__dirname + '/index.html');
});

app.get('/bundle.js', );

app.post('/tilt', function(req, res) {
  var angle = req.params.angle || req.body.angle || 0;
  kinectServer.send({'angle':angle});
  res.send({status: 'OK'})
});

http.createServer(app).listen(program.port, program.host, function() {
  console.log('Listen on %s:%s', program.host, program.port);
});
