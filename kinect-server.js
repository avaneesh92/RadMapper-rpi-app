/*
* Kinect service, Runs as new node process and sends data events to parent process
*/
const nkinect = require('./nkinect/module/nkinect');
const config = require('./config.js');
const kInit = 0;
var kcam = null;
var depthStream = null;
const getKinect = function(devNum = 0){
    if(kcam === null){
        kcam = new nkinect.NKinect();
        kcam.setTiltAngle(0);
        return kcam;
    }
    else{
        return kcam;
    }
}
//Helper for depth stream
const reArrengeBuffer = function(chunk) {
    var data = new Buffer(width * height * 4);

    for (var i = 0, depth; i < width * height; i++) {
        data[4*i]   = type === 'depth' ? (depth = (chunk[2*i]+chunk[2*i+1]*255)/5) : chunk[3*i];
        data[4*i+1] = type === 'depth' ? depth : chunk[3*i+1];
        data[4*i+2] = type === 'depth' ? depth : chunk[3*i+2];
        data[4*i+3] = type === 'depth' ? 255 : chunk[3*i+2];;
    }
    console.log(data);
  }
//Data stream server start
const depthStreamInit = async function(){
    let kinect =  getKinect();
    depthStream = kinect.createDepthStream();
    depthStream.on('data', (data)=>{
        reArrengeBuffer(data);
    })
}
//Init function. To run when process starts
const init = async function(){
    try{
        let kinect = getKinect();
        kinect.setTiltAngle(0);
        if (config.DEBUG) console.log("KINECT SERVER: Connected to Kinect");
        depthStreamInit();
    }
    catch(e){
        if (config.DEBUG){
            console.log("KINECT SERVER: Failed to connect to kinect, Retrying...");
            console.log(e);
        } 
        //Failed to open kinect. Try after some time
        setTimeout(function(){
            init();
        },config.KINECT_RETRY_TIMEOUT);
    }
}
/**************Incoming message handler*********/
process.on('message',(msg)=>{
    
});

//Start the process
init();

