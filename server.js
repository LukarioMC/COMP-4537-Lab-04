/**
 * A simple API server that can handle a GET request to greet the user
 * and return the current server time.
 */
const http = require('http');
const url = require('url');
const utils = require('../modules/utils');
const dict = require('./lang/en/en');
const PORT = process.env.PORT || 8000;

function handleDate(req, res) {
    const parsedAddress = url.parse(req.url, true);
    const name = parsedAddress.query['name'] || 'Guest';
    const currDate = utils.getDate();
    const response = dict.EN.dateString
        .replace('{0}', name)
        .replace('{1}', currDate);
    const data = `<span style="color: blue">${response}</span>`;
    respondHTML(res, 200, data);
}

const routes = {
    '/COMP4537/labs/3/getDate': handleDate,
    '/getDate': handleDate,
};

function respondHTML(res, statusCode, data) {
    res.writeHead(statusCode, { 'content-type': 'text/html' });
    res.write(data);
    res.end();
}

function logRequest(req) {
    console.log('The server received a request!');
    console.log('Request details: ' + req.url);
}

function handleRequest(req, res) {
    const reject = () => respondHTML(res, 400, 'Invalid request');
    if (!req || !req.url) reject();
    const parsedAddress = url.parse(req.url, true);
    const handler = routes[parsedAddress.pathname] || reject;
    if (handler) handler(req, res);
}

http.createServer((req, res) => {
    logRequest(req);
    handleRequest(req, res);
}).listen(PORT);

console.log('Server is running on port ' + PORT + ' for requests...');

// let fs = require('fs');
// fs.readFile('.' + q.pathname, (err, data) => {
//     if (err) {
//         // Handle 404 error
//     }
//     res.writeHead(200, { 'content-type': 'text/html' });
//     res.write(data);
//     return res.end();
// });
