/****************************************************
 *   Low level motion functions
 * 
 */
var validate = require('jsonschema').validate;

const MOTION_MOVE_SCHEMA = {
    "type": "object",
    "properties": {
      "dir": {
        "type": "string",
        "enum":["FW","BW"]
      },
      "speed": {"type": "number"},
      "timeout": {"type": "number"}
    },
    "required": ["dir","speed"]
};

const reqValidateMove = async function(req){
    return validate(req,MOTION_MOVE_SCHEMA);
 }