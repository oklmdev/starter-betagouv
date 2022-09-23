import express, { Express } from 'express';
require('express-async-errors');
import session from 'express-session';
import path from 'node:path';
import { sessionStore } from './dependencies/session';
import { pageRouter } from './pages';

const PORT: number = parseInt(process.env.PORT ?? '3000');

const app: Express = express();

app.use(
  express.urlencoded({
    extended: false,
    limit: '10mb'
  })
);
app.use(express.json({ limit: '10mb' }));

app.get('/ping', (_: express.Request, response: express.Response): void => {
  response.send('pong');
});

app.use(
  session({
    secret: 'super-secret',
    store: sessionStore,
    resave: false,
    proxy: true,
    saveUninitialized: false
  })
);

app.use(pageRouter);

app.use(express.static(path.join(__dirname, 'assets')));

app.listen(PORT, (): void => {
  // eslint-disable-next-line no-console
  console.log('Server listening to port', PORT);
});
