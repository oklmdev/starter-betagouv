import express, { Express } from 'express';
import ReactDOMServer from 'react-dom/server';
import { Hello } from './Hello';

const PORT: number = parseInt(process.env.PORT ?? '3000');

const app: Express = express();

app.get('/ping', (_: express.Request, response: express.Response): void => {
  response.send(ReactDOMServer.renderToString(Hello()));
});

app.listen(PORT, (): void => {
  // eslint-disable-next-line no-console
  console.log('Server listening to port', PORT);
});
