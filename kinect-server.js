/*
* Kinect service, Runs as new node process and sends data events to parent process
*/
const nkinect = require('./src/module/nkinect');
const kInit = 0;
var kcam = null;
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

/**************Listen for Messages from parent*********/
process.on('message',(msg)=>{
    var kinect = getKinect();
    kinect.setTiltAngle(msg.angle);
    console.log("Angle to : "+msg.angle);
    process.send({'msg':'OK'});
})


