import { responseAsHtml } from '../../libs/responseAsHtml';
import { pageRouter } from '../pageRouter';
import { InscriptionPage } from './InscriptionPage';

pageRouter.route('/inscription.html').get(async (request, response) => {
  console.log(`GET on /inscription`);

  responseAsHtml(request, response, InscriptionPage());
});
