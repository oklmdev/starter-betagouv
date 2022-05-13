import express, { Express } from 'express';
import session from 'express-session';
import { subscribeAll } from './infra/eventBus';
import { keycloak } from './infra/keycloak/keycloak';
import { resolveUserFromKeycloak } from './infra/keycloak/resolveUserFromKeycloak';
import { projections } from './infra/projections';
import { sessionStore } from './infra/session';
import { router } from './routes';

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

  subscribeAll(async (event) => {
    for (const projection of projections) {
      await projection.handleEvent(event);
    }
  });
});
