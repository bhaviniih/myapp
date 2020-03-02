// server setup start

const http = require('http');

const app = require('./app');

const port = process.env.DB_PORT || 3306;

const server = http.createServer(app);

server.listen(port);

// server setup end