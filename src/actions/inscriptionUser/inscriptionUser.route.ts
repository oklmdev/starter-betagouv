import { responseAsHtml } from '../../libs/responseAsHtml';
import { transaction } from '../../dependencies/eventStore';
import { actionsRouter } from '../actionsRouter';

actionsRouter.route('/inscription').post(async (request, response) => {
  console.log(`POST on /inscription`);

  const { userId, username, email } = request.body;
});
