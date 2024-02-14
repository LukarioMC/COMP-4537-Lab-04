/**
 * A simple API server that can handle a GET request to greet the user
 * and return the current server time.
 */
const http = require('http');
const url = require('url');
const utils = require('./modules/utils');
const dict = require('./lang/en/en');
const PORT = process.env.PORT || 8000;

const routes = {
    '/api/definitions': utils.handleDefiniton,
};

function handleRequest(req, res) {
    const reject = () => respondHTML(res, 400, 'Invalid request');
    if (!req || !req.url) reject();
    const parsedAddress = url.parse(req.url, true);
    const handler = routes[parsedAddress.pathname] || reject;
    if (handler) handler(req, res);
}

http.createServer((req, res) => {
    utils.logRequest(req);
    handleRequest(req, res);
}).listen(PORT);

console.log('Server is running on port ' + PORT + ' for requests...');
