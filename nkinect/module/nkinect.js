var NKinectDevice = require("./nkinect-device").NKinectDevice;
var kStreams = require("./nkinect-streams");
var NKinectDepthStream = kStreams.NKinectDepthStream;
var NKinectVideoStream = kStreams.NKinectVideoStream;

class NKinect extends NKinectDevice {
    constructor(options){
        super(options);
    }
    init(options){
        return new NKinect(options);
    }
    createVideoStream(options){
        return new NKinectVideoStream(this, options);
    }
    createDepthStream(options){
        return new NKinectDepthStream(this, options);
    }
}

module.exports = {NKinect};