import { pageRouter } from '../../pages/pageRouter';

pageRouter.get('/logout', async (request, response) => {
  if (request.session) {
    request.session.destroy((err) => {
      if (err) {
        response.status(400).send('Unable to log out');
      } else {
        response.redirect('/');
      }
    });
  } else {
    response.end();
  }
});
