//import polyfills (needed for async/await)
import 'babel-polyfill';

//run main from app
import {main} from './seed-db-helper';
main().catch((err) => {
    console.error(err);
    process.exit(-1);
});
