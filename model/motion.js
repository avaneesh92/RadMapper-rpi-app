/****************************************************
 *   Low level motion functions
 * 
 */
var validate = require('jsonschema').validate;

const MOTION_MOVE_SCHEMA = {
    "type": "object",
    "properties": {
      "dir": {"type": "string"},
      "speed": {"type": "number"},
      "timeout": {"type": "number"}
    },
    "required": ["dir","speed"]
};

const reqValidateMove = (req) => {
    return validate(req,MOTION_MOVE_SCHEMA);
 }

 module.exports = {reqValidateMove}