module.exports.config = {
    server: {
        portNumber: 3000,
        host: `localhost`
    },
    db: {
        name: `lingozen`,
        host: `localhost`,
        dialect: `mysql`,
        logging: console.log
    },
    es: {
        host: `localhost:9200`,
        index: `lingozen`,
        log: null,
        sourceSentenceIndexPrefix: `source-sentences-`,
        sourceSentenceType: `source-sentence`
    },
    languages: [
        `english`,
        `french`,
        `spanish`
    ]
};
