/********************************************************
 *  Motion API
 * provides HTTP motion command inteface for operator
 */
const routes =  require('../routes.js');

const eventBus = require('../helper/eventBus.js').evntBus;
const eventDef = require('../helper/eventsDef.js');
const motionModel =  require('../model/motion.js');
class MotionAPI {
    constructor(app){
        //Movement handler
        app.post(routes.MOTION_MOVE, async function(req, res) {
            let data = req.body;
            if(await motionModel.reqValidateMove(data).valid){
                eventBus.emit(eventDef.ROVER_CMD,data);
                res.json({"status":"ok","msg":"command received"});
            }
            else{
                res.json({"status":"error","msg":"Invalid command"});
            }
        });
        //Turn handler
        app.post(routes.MOTION_TURN, function(req, res) {
            res.json({"status":"ok","msg":"command received"});
        });
    }
}
module.exports = MotionAPI;