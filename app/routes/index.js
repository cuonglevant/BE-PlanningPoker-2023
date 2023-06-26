import { ROUTES } from '../../constants/routes';
import authRouter from './auths';
import roomRouter from './room';
import siteRouter from './sites';

const route = (app) => {
  app.use(ROUTES.ROOT.PATH, siteRouter);
  app.use(ROUTES.AUTH.PATH, authRouter);
  app.use(ROUTES.ROOM.PATH, roomRouter);
};
export default route;
