import { ROUTES } from '../../constants/routes.js';
import authRouter from './auths.js';
import roomRouter from './room.js';
import siteRouter from './sites.js';

const route = (app) => {
  app.use(ROUTES.ROOT.PATH, siteRouter);
  app.use(ROUTES.AUTH.PATH, authRouter);
  app.use(ROUTES.ROOM.PATH, roomRouter);
};
export default route;
