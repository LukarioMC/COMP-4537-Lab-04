const { storeDefinition, retrieveDefinition } = require('definitions.js');

exports.handleDefinition = (req, res) => {
    const method = res.method;
    if (method === 'GET') retrieveDefinition(req, res);
    else if (method === 'POST') storeDefinition(req, res);
};

function respondHTML(res, statusCode, data) {
    res.writeHead(statusCode, { 'content-type': 'text/html' });
    closeWithData(res, data);
}

function respondJSON(res, statusCode, data) {
    res.writeHead(statusCode, { 'content-type': 'text/json' });
    closeWithData(res, data);
}

function closeWithData(res, data) {
    res.write(data);
    res.end();
}

function logRequest(req) {
    console.log('The server received a request!');
    console.log('Request details: ' + req.url);
}

module.exports = {
    respondHTML,
    respondJSON,
    logRequest,
};
