import express, { Express } from 'express';
import session from 'express-session';
import { eventBus } from './dependencies/eventBus';
import { keycloak } from './dependencies/keycloak/keycloak';
import { resolveUserFromKeycloak } from './dependencies/keycloak/resolveUserFromKeycloak';
import { tables } from './tables';
import { sessionStore } from './dependencies/session';
import { router } from './router';

const PORT: number = parseInt(process.env.PORT ?? '3000');

const app: Express = express();

app.use(
  express.urlencoded({
    extended: false,
    limit: '10mb',
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
    saveUninitialized: false,
  })
);

app.use(keycloak.middleware());

app.use(resolveUserFromKeycloak);

app.use(router);

app.listen(PORT, (): void => {
  // eslint-disable-next-line no-console
  console.log('Server listening to port', PORT);

  eventBus.subscribeAll(async (event) => {
    for (const projectionTable of tables) {
      await projectionTable.handleEvent(event);
    }
  });
});
