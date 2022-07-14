import express    from 'express';
import Promise    from 'bluebird';
import bodyParser from 'body-parser';
import io         from './middlewares/io_middleware';
import trace      from './middlewares/trace_middleware';
import error      from './middlewares/error_middleware';
import translate from './middlewares/translate_middleware';
import routes     from './routes';
import passportConfigure from './middlewares/passport_configure_middleware';
import { middleMung, middleMorgan } from './middlewares/log_middleware';
import rateLimit from './middlewares/ratelimit_hostname_middleware';

// Replace promises with bluebird
global.Promise = Promise;

const app = express();


app.use(translate);
app.use(io);
app.use(middleMung);
app.use(middleMorgan);
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(trace);
app.use(rateLimit);
app.use(routes);
app.use(passportConfigure());

// 404 Routes
app.use((req, res, next) => res.io({ code: 404 }));

// THIS MANDATORY NEEED TO BE THE LAST MIDDLEWARE
// DON USE MIDDLEWARES AFTER THIS
app.use(error);

export default app;
