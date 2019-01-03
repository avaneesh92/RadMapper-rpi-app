const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline')
const config = require('./config.js');
const arduino = new SerialPort(config.SERIAL_PORT_ARDUINO);

const parser = arduino.pipe(new Readline());
parser.on('ready', () => console.log('Rover is ready'));
//Incoming data from Arduino
parser.on('data', (response)=>{
    if (config.DEBUG) console.log("ROVER SERVER: Arduino=> "+response);
});
/**************Movement commands processing ***********/
const procCmd = function(data){
    let speed = config.MOTION_MIN_SPEED;
    let timeout = config.MOTION_DEFAULT_TIMEOUT;
    if(data.speed > config.MOTION_MIN_SPEED && data.speed <= config.MOTION_MAX_SPEED){
        speed = data.speed;
    }
    if(typeof data.timeout !== 'undefined' ){
        timeout = data.timeout;
    }
    let cmd = "#>"+data.dir+" "+speed+" "+timeout+"<";
    arduino.write(cmd);
    if (config.DEBUG) console.log("ROVER SERVER: Command to arduino=> "+cmd);
    //TODO: wait for response and log the motion
}
/**************Listen for Messages from parent*********/
process.on('message',(data)=>{
    if(data.type === 'cmd'){
        procCmd(data.payload);
    }
    else{
        console.log("ROVER-SERVER: Invalid message format");
    }
})