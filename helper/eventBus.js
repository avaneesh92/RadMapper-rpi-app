var EventEmitter = require('events').EventEmitter;
var pubsub = new EventEmitter();

module.exports.evntBus = new EventEmitter();
