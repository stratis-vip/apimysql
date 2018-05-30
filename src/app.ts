import * as express from 'express';
import {Application} from 'express';
import * as path from 'path';

import * as favicon  from 'serve-favicon';
import * as logger  from 'morgan';
import * as cookieParser  from 'cookie-parser';
import * as bodyParser from 'body-parser';

import index from './routes/index';
import athletes from './routes/athletes';
import weights from './routes/weights';
import zones from './routes/zones';
import pubCategories from './routes/pub-categories';

const app:Application = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const d=new Date();
let localTime = d.getTime();
console.log(d.getTimezoneOffset()*60000/3600000);
//DATABASE

import * as mysql  from 'mysql';
import { NextFunction } from 'connect';

app.use(function(req, res, next){
	res.locals.connection = mysql.createConnection({
		host     : 'db20.papaki.gr',
		user     : 'y6089_user',
		password : '$lk7Og47',
		database : 'sports'
	});
  res.locals.connection.connect();
  console.log(`${res.locals.connection} is made `);
	next();
});


app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use('/', index);
app.use('/athletes', athletes);
app.use('/weights', weights);
app.use('/zones', zones);
app.use('/pub-categories', pubCategories);

// catch 404 and forward to error handler
interface Error{
  status?: number;
  message?: string;
}

app.use(function (req, res, next) {
  const err = new Error('Not Found');
  res.status(404);
  next(err);
});

// error handler
app.use(function (err:any, req:any, res:any, next:any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;