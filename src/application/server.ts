import express, { Express } from 'express';
import { router } from './routes';
import { seed } from './seeds';
import { projections } from './infra/projections/projections';
import { subscribeAll } from './infra/eventBus';

const PORT: number = parseInt(process.env.PORT ?? '3000');

const app: Express = express();

app.get('/ping', (_: express.Request, response: express.Response): void => {
  response.send('pong');
});

app.use(router);

app.listen(PORT, (): void => {
  // eslint-disable-next-line no-console
  console.log('Server listening to port', PORT);
  seed();

  subscribeAll(async (event) => {
    for (const projection of projections) {
      await projection.handleEvent(event);
    }
  });
});
