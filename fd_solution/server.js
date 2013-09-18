var url = require('url');
var path = require('path');
var http = require('http');
var socket = require('socket.io');
var fs = require('fs');

var defaultPage = 'index.html';
var getContentType = function(filePath) {
    var contentType = '';
    var ext = path.extname(filePath);
    switch(ext) {
        case '.html':
            contentType = 'text/html';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.ico':
            contentType = 'image/icon';
            break;
        default:
            contentType = 'application/octet-stream';
    }
    return contentType;
};
var log = function(text) {
    var line = '\n-------------------------------------------\n';
    console.log(line + text + line);
};

var app = http.createServer(function(req, res) {
    var reqUrl = req.url;
    var pathName = url.parse(reqUrl).pathname;
    var extName = path.extname(pathName);
    if(extName) {
        var filePath = path.join('./', pathName);
        fs.exists(filePath, function(exists) {
            if(exists) {
                res.writeHead(200, {'Content-Type': getContentType(filePath) });
                var stream = fs.createReadStream(filePath, {flags: 'r', encoding: null});
                stream.on('error', function() {
                    res.writeHead(404);
                    res.end('<h1>404 Read Error</h1>');
                });
                stream.pipe(res);
            } else {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end('<h1>404 Not Found</h1>');
            }
        });
    } else {
        fs.readFile(__dirname + '/' + defaultPage, function(err, data) {
            if(err) {
                res.writeHead(404);
                res.end('Error loading ' + defaultPage);
            } else {
                res.writeHead(200);
                res.end(data);
            }
        });
    }
});
app.listen(9999);
var io = socket.listen(app);

var page = 1;
var max = 12;
io.sockets.on('connection', function(socket) {
    socket.on('total', function(data) {
        max = +data.total;
        log('total page:' + max);
    });
    socket.on('status', function() {
        log('send client total:' + max + ', and current:' + page);
        socket.emit('status', { total: max, current: page });
    });
    socket.on('prev', function(data) {
        if(page > 1) {
            page--;
            socket.broadcast.emit('page', { page: page });
            socket.emit('result', { page: page });
            log('prev event, now page: ' + page);
        }
    });
    socket.on('next', function(data) {
        if(page < max) {
            page++;
            socket.broadcast.emit('page', { page: page });
            socket.emit('result', { page: page });
            log('next event, now page: ' + page);
        }
    });
});