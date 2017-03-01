import elasticsearch from 'elasticsearch';

import {config} from './config';

export const esConnection = new elasticsearch.Client({
    host: config.es.host,
    log: config.es.log
});
