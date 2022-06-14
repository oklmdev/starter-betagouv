import type { Response } from 'express';
import ReactDOMServer from 'react-dom/server';

/**
 * Call ReactDOMServer.renderToString on the element and send the response
 * @param response Express.Response instance
 * @param element React element to render to html
 */
export function responseAsHtml(response: Response, element: JSX.Element) {
  response.send(ReactDOMServer.renderToString(element));
}
