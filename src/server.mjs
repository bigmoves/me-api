import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';

const app = express();

// App Port
app.set('port', parseInt(process.env.PORT, 10) || 9000);

// App Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(
  // bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit: 1000000 })
  bodyParser.urlencoded({ extended: true })
);
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'http://totallyrad.club'
        : 'http://localhost:3000'
  })
);

// Routes
import routes from './routes';
app.use('/', routes);

// Conenct to Mongo
import storage from './storage';
storage.connect(
  process.env.NODE_ENV === 'test'
    ? 'mongodb://mongo:27017/test'
    : 'mongodb://mongo:27017/app'
);

// Server
const server = http.createServer(app);

server.listen(app.get('port'), () => {
  console.log('Listening on port %s', server.address().port);
});

export default server;
