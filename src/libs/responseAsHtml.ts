import type { Response, Request } from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { SessionContext } from '../pages/_components/SessionContext';

/**
 * Call ReactDOMServer.renderToString on the element and send the response
 * @param request Express.Request instance
 * @param response Express.Response instance
 * @param element React element to render to html
 */
export function responseAsHtml(request: Request, response: Response, element: JSX.Element) {
  if (element === null) {
    return;
  }

  response.send(
    ReactDOMServer.renderToString(
      React.createElement(SessionContext.Provider, { value: { isLoggedIn: !!request.session.user } }, element)
    )
  );
}
