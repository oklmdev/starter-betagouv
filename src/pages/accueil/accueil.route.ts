import { responseAsHtml } from '../../libs/responseAsHtml';
import { pageRouter } from '../pageRouter';
import { AccueilPage } from './AccueilPage';

pageRouter.route('/').get(async (request, response) => {
  console.log(`GET on /`, request.user);

  responseAsHtml(request, response, AccueilPage());
});
