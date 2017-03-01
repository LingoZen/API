export const config = {
    server: {
        portNumber: 3000,
        host: `localhost`
    },
    db: {
        name: `lingozen`,
        host: `localhost`,
        dialect: `mysql`
    },
    es: {
        host: `localhost:9200`,
        index: `lingozen`,
        log: `trace`,
        sourceSentenceIndexPrefix: `source-sentences-`,
        sourceSentenceType: `source-sentence`
    },
    languages: [
        `english`,
        `french`,
        `spanish`
    ]
};
