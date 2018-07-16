const LiveCam = require('livecam'),
  fs = require("fs"),
  { identifyUA } = require('./openALPR');

let counter = 0;
var path = __dirname + `/tests/out.jpg`;
var mockedPath = __dirname + `/tests/ua1.jpg`;
let identifying = false;

console.errorLog = log => console.error(`Error : ` + log);

const config = {
  gst_addr: "127.0.0.1",
  gst_port: 10000,
  ui_addr: "127.0.0.1",
  ui_port: 11000,
  broadcast_addr: "127.0.0.1",
  broadcast_port: 12000,
  start: function () {
    console.log('WebCam server started!');
  },
  webcam: {
    fake: false,
    width: 1280,
    height: 720,
    framerate: 0,
    grayscale: false,
  },
  // @arg image in base64 format
  onImage: (image) => {
    console.log('onImage default')
  }
};

module.exports.startTranslation = (conf = {}) => {
  const webcam_server = new LiveCam({ ...config, ...conf });
  webcam_server.broadcast();
}
