export class AppConfig {
    static config = {
        server: {
            portNumber: 3000,
            host: 'localhost'
        },
        db: {
            name: 'lingozen',
            host: 'localhost',
            dialect: 'mysql',
            logging: console.log,
            username: process.env.LINGOZEN_CONFIG_DB_USERNAME,
            password: process.env.LINGOZEN_CONFIG_DB_PASSWORD
        },
        es: {
            host: 'localhost:9200',
            index: 'lingozen',
            log: null,
            sentenceIndexPrefix: 'source-sentences-',
            sentenceType: 'source-sentence'
        },
        languages: [
            'english',
            'french',
            'spanish'
        ]
    };
}
