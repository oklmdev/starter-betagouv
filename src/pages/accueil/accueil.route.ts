import { responseAsHtml } from '../../libs/ssr';
import { pageRouter } from '../pageRouter';
import { AccueilPage } from './AccueilPage';
import AccueilContents from './accueil.json';

pageRouter.route('/').get(async (request, response) => {
  responseAsHtml(request, response, AccueilPage(AccueilContents));
});
