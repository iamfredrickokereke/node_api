// create standardized response

const _respond = (res, next, status, data, http_code) => {
    var response = {
        'status' : status,
        'data' : data
    }
    res.setHeader('content-type', 'application/json');
	res.writeHead(http_code);
    res.end(JSON.stringify(response));
    //return next()
}

module.exports.success = (res, next, data) => {   
    _respond(res, next, 'success', data, 200);
}
module.exports.failure = (res, next, data, http_code) => {
    _respond(res, next, 'oops, an error occured', data, http_code);   
}