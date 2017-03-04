const elasticsearch = require('elasticsearch');

const {config} = require('./config');

module.exports.esConnection = new elasticsearch.Client({
    host: config.es.host,
    log: config.es.log
});
