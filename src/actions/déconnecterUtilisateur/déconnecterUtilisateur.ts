import { pageRouter } from '../../pages/pageRouter';

pageRouter.get('/logout', async (request, response) => {
  if (request.session) {
    request.session.destroy((error) => {
      if (error) {
        response.status(400).send('Impossible de se déconnecter');
      } else {
        response.redirect('/');
      }
    });
  } else {
    response.redirect('/');
  }
});
