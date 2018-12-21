/********************************************************
 *  Motion API
 * provides HTTP motion command inteface for operator
 */
const routes =  require('../routes.js');


class MotionAPI {
    constructor(app){
        //Movement handler
        app.get(routes.MOTION_MOVE, function(req, res) {
            
        });
        //Turn handler
        app.get(routes.MOTION_TURN, function(req, res) {
            
        });
    }
}
module.exports = MotionAPI;