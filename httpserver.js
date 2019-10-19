const http = require('http');

const server = http.createServer((request, response) => {
    if (request.url === '/hello') {
        response.writeHead(200, {
            'Content-Type': 'text/plain'
        })
        response.end('hello world');
    } else {
        response.end('Ok 123');
    }
});

server.listen('3000', '127.0.0.1', () => {
    console.log('server is listen: http://127.0.0.1');
})

// const http = require('http');
// const server = http.createServer((request, response) => {
//     if (request.url === '/hello') {
//         console.log(request);
//         response.writeHead(200, {
//             'Content-Type': 'text/plain',
//         });
//         response.end('hello world!');
//     } else {
//         response.end('OK!');
//     }
// });

// server.listen(3000, '127.0.0.1', () => {
//     console.log('service is listening at http://127.0.0.1:3000');
// });
