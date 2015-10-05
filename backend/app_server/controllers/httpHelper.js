'use strict';



/**
 * Sends the given content and set the response http status
 */
module.exports.sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.jsonp(content);
};


