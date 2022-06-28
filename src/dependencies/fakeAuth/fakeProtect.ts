import { RequestHandler } from 'express';

export const fakeProtect: RequestHandler = (request, response, next) => {
  if (!request.session.user) {
    return response.redirect(`/login.html?redirectTo=${request.url}`);
  }
  next();
};
