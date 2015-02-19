var fs = require("fs"),
    http = require("http"),
    filePath = require("file_path"),
    io = require("socket.io");


var livereload = exports,
    socket = null,
    server = null;


livereload.reload = function() {
    if (socket) {
        socket.emit("reload");
    }
};

livereload.close = function() {
    if (server) {
        socket.close();
        server.close();
        server = socket = null;
    }
};

livereload.listen = function(options) {
    if (!server) {
        options = options || {};

        options.port = options.port || 35729;
        options.host = options.host || "127.0.0.1";

        server = new http.Server(function(req, res) {
            var path;

            if ((req.method === "GET" || req.method === "HEAD") && req.url === "/livereload.js") {
                path = filePath.join(__dirname + "/livereload.min.js");

                fs.stat(path, function(err, stat) {
                    if (err) {
                        res.end(err);
                    } else {
                        res.writeHead(200, {
                            "Content-Type": "application/javascript",
                            "Content-Length": stat.size
                        });

                        fs.createReadStream(path).pipe(res);
                    }
                });
            } else {
                res.end();
            }
        });

        server.listen(options.port, options.host);
        socket = io(server);
    }
};
