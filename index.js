const restify = require('restify');
const server = restify.createServer();

server.use(restify.plugins.bodyParser());

require('./controllers/todo.controller')(server);

server.listen(8080, () => console.log(`${server.name} listening at ${server.url}`));
