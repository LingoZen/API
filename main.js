//import polyfills (needed for async/await)
import 'babel-polyfill';

//run main from app
import {main} from './app';
main().catch((err) => {
    console.error(err);
    process.exit(-1);
});
