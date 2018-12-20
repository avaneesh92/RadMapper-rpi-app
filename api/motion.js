/********************************************************
 *  Motion API
 * provides HTTP motion command inteface for operator
 */
const routes =  require('../routes.js');


class MotionAPI {
    constructor(app){
        // Forward movement
        app.get(routes.MOTION_MOVE_FW, function(req, res) {
            
        });
    }
}
module.exports = MotionAPI;