const SerialPort = require('serialport');
const Ready = require('@serialport/parser-ready');
const config = require('./config.js');
const arduino = new SerialPort(config.SERIAL_PORT_ARDUINO);

const parser = port.pipe(new Ready({ delimiter: '\n' }));
parser.on('ready', () => console.log('the ready byte sequence has been received'));
parser.on('data', console.log);

/**************Listen for Messages from parent*********/
process.on('message',(data)=>{
    console.log(data);
    port.write(data.msg);
})