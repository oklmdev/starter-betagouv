import express, { Express } from 'express';
import { subscribeAll } from './infra/eventBus';
import { projections } from './infra/projections';
import { router } from './routes';

import { keycloak } from './infra/keycloak';
import session from 'express-session';
import { sessionStore } from './infra/session';

const PORT: number = parseInt(process.env.PORT ?? '3000');

const app: Express = express();

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

app.use(router);

app.listen(PORT, (): void => {
  // eslint-disable-next-line no-console
  console.log('Server listening to port', PORT);

  subscribeAll(async (event) => {
    for (const projection of projections) {
      await projection.handleEvent(event);
    }
  });
});
