'use strict';



/**
 * Sends the given content and set the response http status
 */
module.exports.sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.jsonp(content);
};



/**
 * Check whether the token is valid and exist. If not it will create  a json response with the
 * error.
 */
module.exports.checkIfTokenValid = function (req, res) {
    
    if (!req.headers.authorization) {
        httpHelper.sendJsonResponse(res, 401, {
            "message": "Authorization is required"
        });
        return;
    };


    var token = req.headers.authorization.split(' ')[1];
    var decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
        httpHelper.sendJsonResponse(res, 401, {
            "message": "Authorization has failed, wrong token"
        });
        return;
    };

};