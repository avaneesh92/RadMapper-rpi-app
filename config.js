module.exports.DEBUG = true; 

//Motor Driver hardware related constants
module.exports.SERIAL_PORT_ARDUINO = '/dev/ttyUSB0';
module.exports.MOTION_DEFAULT_TIMEOUT = 1000; 
module.exports.MOTION_MAX_SPEED = 255; 
module.exports.MOTION_MIN_SPEED = 60; 
//Kinect related settings
module.exports.KINECT_RETRY_TIMEOUT = 5000; //In milli seconds
module.exports.KINECT_DEPTH_WIDTH = 640;
module.exports.KINECT_DEPTH_HEIGHT = 480;
module.exports.KINECT_LIMIT_Z = 5; //In meters
