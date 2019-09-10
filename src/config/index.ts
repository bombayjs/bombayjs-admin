import localConfig from './config.local';
import prodConfig from './config.prod';

const config = process.env.NODE_ENV !== 'production' ? localConfig : prodConfig;

export default {
  requestPrefix: 'http://127.0.0.1:7002',
  ...config,
};
