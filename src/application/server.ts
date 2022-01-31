import express from 'express';
import ReactDOMServer from 'react-dom/server';
import { Hello } from './Hello';

const app = express();

app.get('/ping', (request, response): void => {
  response.send(ReactDOMServer.renderToString(Hello()));
});

app.listen('3000', () => {
  console.log('Server listening to port 3000');
});
