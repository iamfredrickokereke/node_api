module.exports = (server, restify, restifyValidator) =>{

    server.use(restify.plugins.acceptParser(server.acceptable));
    server.use(restify.plugins.queryParser());
    server.use(restify.plugins.jsonBodyParser());
    server.use(restify.plugins.bodyParser());
    server.use(restifyValidator)

}