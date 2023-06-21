import siteRouter from './sites.js';

const route = (app) => {
  app.use('/', siteRouter);
};

export default route;
