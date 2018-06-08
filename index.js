const restify = require('restify');
const logger = require('restify-logger');
const server = restify.createServer();
const jwt = require('restify-jwt-community');
const jwks = require('jwks-rsa');
const corsMiddleware = require('restify-cors-middleware');

const cors = corsMiddleware({
    origins: ['*'],
});

server.pre(cors.preflight);
server.use(cors.actual);

server.use(restify.plugins.bodyParser());
server.use(logger('combined'));
server.use(jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: ''
    }),
    audience: '',
    issuer: '',
    algorithms: ['RS256']
}));

require('./controllers/todo.controller')(server);

server.listen(8080, () => console.log(`${server.name} listening at ${server.url}`));
