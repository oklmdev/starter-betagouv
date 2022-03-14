import express, { Express } from 'express';
import { subscribeAll } from './infra/eventBus';
import { projections } from './infra/projections';
import { router } from './routes';

const PORT: number = parseInt(process.env.PORT ?? '3000');

const app: Express = express();

app.get('/ping', (_: express.Request, response: express.Response): void => {
  response.send('pong');
});

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
