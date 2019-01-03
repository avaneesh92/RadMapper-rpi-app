/*
* Kinect service, Runs as new node process and sends data events to parent process
*/
const nkinect = require('./nkinect/module/nkinect');
const config = require('./config.js');
var through = require('through');
const kInit = 0;
var kcam = null;
var depthStream = null;
var videoStream = null;
var width = config.KINECT_DEPTH_WIDTH;
var height = config.KINECT_DEPTH_HEIGHT;
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
const reArrengeBuffer = (type)=> {
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
  });
}
//Data stream server start
const depthStreamInit = async function(){
    let kinect =  getKinect();
    depthStream = kinect.createDepthStream().pipe(reArrengeBuffer('depth'));
    var count =0;
    depthStream.on('data', (data)=>{
        //console.log(data[5]);
        count+=1;
    });
    setInterval(()=>{
        console.log("DEPTH FPS: "+count/5);
        count =0;
    },5000);
}
//Video Stream Init
const videoStreamInit = async function(){
    let kinect =  getKinect();
    videoStream = kinect.createVideoStream().pipe(reArrengeBuffer('video'));
    var count =0;
    videoStream.on('data', (data)=>{
        //console.log(data[5]);
        count+=1;
    });
    setInterval(()=>{
        console.log("VIDEO FPS: "+count/5);
        count =0;
    },5000);
}
//Init function. To run when process starts
const init = async function(){
    try{
        let kinect = getKinect();
        kinect.setTiltAngle(0);
        if (config.DEBUG) console.log("KINECT SERVER: Connected to Kinect");
        depthStreamInit();
       // videoStreamInit();
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

//close Kinect on exit
process.on('SIGINT',()=>{
    if(kcam !== null){
        console.log("KINECT SERVER: Closing kinect");
        kcam.close();
    }
    process.exit();//Very important. Process will not exit otherwise
})
