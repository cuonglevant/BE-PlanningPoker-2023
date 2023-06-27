import { SERVER_URL } from '../../config';

export const swaggerDefinition = {
  openapi: '3.0.1',
  info: {
    title: 'Sample API',
    version: '1.0.0',
  },
  servers: [
    {
      url: SERVER_URL,
    },
  ],
};
