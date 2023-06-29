import { ROUTES } from '../../constants/routes';
import authRouter from './auths';
import roomRouter from './room';
import siteRouter from './sites';
import docsRouter from './docs';
import userRouter from './user';

const route = (app) => {
  app.use(ROUTES.ROOT.PATH, siteRouter);
  app.use(ROUTES.AUTH.PATH, authRouter);
  app.use(ROUTES.ROOM.PATH, roomRouter);
  app.use(ROUTES.USER.PATH, userRouter);
  app.use(ROUTES.DOCS.PATH, docsRouter);
};
export default route;
