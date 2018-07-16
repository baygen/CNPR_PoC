const path = 'http://127.0.0.1';
const port = 8080;

const config = {
  api: {
    port,
    path
  },
  API: `${path}:${port}`,
  cloudinary: {
    cloud_name: 'cpd-cnpr',
    api_key: '671224932345491',
    api_secret: '0M4lSdZx_XZxdUJinTs6ixb7cSM'
  }
}

module.exports.config = config;
