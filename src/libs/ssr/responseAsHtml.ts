import type { Response, Request } from 'express';
import ReactDOMServer from 'react-dom/server';
import { Session, SessionContext } from '../../pages/_components/SessionContext';
import { withContext } from './withContext';

const html = String.raw;

/**
 * Call ReactDOMServer.renderToString on the element and send the response
 * @param request Express.Request instance
 * @param response Express.Response instance
 * @param element React element to render to html
 */
export function responseAsHtml(
  request: Request,
  response: Response,
  element: JSX.Element & { outerProps?: any; componentName?: string }
) {
  if (element === null) {
    return;
  }

  const bundle = extractBundleInfo(element);

  const { shouldIncludeBrowserBundle } = bundle;

  const session = getSession(request);

  response.send(
    html`
      <html style="height: 100%">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet" />
          <link href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr/dist/dsfr.min.css" rel="stylesheet" />
          <link href="style.css" rel="stylesheet" />
          ${shouldIncludeBrowserBundle
            ? html`
                <script src="/js/shared.js"></script>
                <script src="/js/${bundle.name}.js?${process.env.npm_package_version}"></script>
              `
            : ''}
        </head>
        <body style="height: 100%; overflow: hidden;">
          <script>
            // Options disponibles à l'initialisation du DSFR
            window.dsfr = {
              verbose: true,
              mode: 'runtime'
            };
          </script>
          <script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr/dist/dsfr/dsfr.module.min.js"></script>
          <script
            type="text/javascript"
            nomodule=""
            src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr/dist/dsfr/dsfr.nomodule.min.js"></script>
          <!-- prettier-ignore -->
          <div id="root">${ReactDOMServer.renderToString(withContext(SessionContext, session, element))}</div>
          ${shouldIncludeBrowserBundle
            ? html`
                <!-- prettier-ignore -->
                <script>
                  window.__INITIAL_PROPS__ = ${JSON.stringify(bundle.props || {})};
                  window.__SESSION__ = ${JSON.stringify(session || {})};
                </script>
              `
            : ''}
        </body>
      </html>
    `
  );
}

function getSession(request: Request): Session {
  if (request.session.user) {
    return { isLoggedIn: true };
  }

  return { isLoggedIn: false };
}

type BundleInfo =
  | {
      shouldIncludeBrowserBundle: true;
      props: any;
      name: string;
    }
  | { shouldIncludeBrowserBundle: false };

/**
 * Extract information from a JSX.Element.
 * If it passed through withBrowserBundle first shouldIncludeBrowserBundle is true, and props and name are provided.
 * If it's just a plain old React element, shouldIncludeBrowserBundle is false
 * @param element the JSX.Element that may have passed through withBrowserBundle
 * @returns BundleInfo
 */
function extractBundleInfo(element: JSX.Element & { outerProps?: any; componentName?: string }): BundleInfo {
  const shouldIncludeBrowserBundle = Object.prototype.hasOwnProperty.call(element, 'outerProps');
  if (shouldIncludeBrowserBundle) {
    const { children, ...props } = element.outerProps || {};

    return { props, name: element.componentName!, shouldIncludeBrowserBundle };
  }

  return { shouldIncludeBrowserBundle };
}
