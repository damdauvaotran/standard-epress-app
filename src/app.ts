import express from 'express';

import createError from 'http-errors';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import cookieParser from 'cookie-parser';
// const logger = require('morgan');
import cors from 'cors';
// const fs = require('fs');
import helmet from 'helmet';

import indexRouter from './apis';
import swaggerSpec from './swagger';
import httpLogger from './middleware/httpLogger';
import db from './models';
import cache from './cached';

const app = express();

// db initial
db.init();
cache.init();

// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Logger setup
// const logFile = fs.createWriteStream('./myLogFile.log', { flags: 'a' }); // us

app.use(cors());
// app.use(logger('common', { stream: logFile }));
// app.use(logger('dev'));
app.use(httpLogger);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// Docs
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// all router
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((_req: express.Request, _res: express.Response, next: Function) => {
  next(createError(404));
});

// error handler
app.use(
  (err: any, req: express.Request, res: express.Response, _: Function) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  },
);

export default app;
