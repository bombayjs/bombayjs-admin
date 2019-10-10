const { MOCK } = process.env;

export default {
  requestPrefix: MOCK === 'none' ? 'http://127.0.0.1:7002' : '',
};
