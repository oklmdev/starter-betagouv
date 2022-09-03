import { responseAsHtml } from '../../libs/ssr';
import { pageRouter } from '../pageRouter';
import { AccueilPage } from './AccueilPage';

pageRouter.route('/').get(async (request, response) => {
  console.log(`GET on /`, request.session.user);

  responseAsHtml(request, response, AccueilPage());
});
