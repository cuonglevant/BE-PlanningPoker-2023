import { ROUTES } from '../../constants/routes.js';
import authRouter from './auths.js';
import siteRouter from './sites.js';

const route = (app) => {
  app.use(ROUTES.ROOT.PATH, siteRouter);
  app.use(ROUTES.AUTH.PATH, authRouter);
};
export default route;
