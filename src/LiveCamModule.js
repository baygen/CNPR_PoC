const LiveCam = require('livecam'),
  fs = require("fs");
alpr = require('./openALPR');

let previousImage = null;
let counter = 0;
var path = null;
let identified = false;

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
  onImage: image => {

    path = __dirname + `/../out.jpg`;

    console.time('Saving to file');
    fs.writeFile(path, image, 'base64', console.errorLog);
    console.timeEnd('Saving to file')

    console.log('Writing image number' + counter + '\n\n');
    // if (!identified) {
    // console.time('Identifying')
    // alpr.identifyMocked(
    //   // path
    // ).then(output => {
    //   identified = true;
    //   console.info(output)
    //   console.timeEnd('Identifying')
    //   // fs.unlink(path)
    // })
    // .catch(console.error)
    // }
    // if (previousImage && previousImage === image) {
    counter++;
    // }
    // previousImage = image;
  }
};

// const webcam = config.webcam || {};

// const webcam_server = new LiveCam(config);
// webcam_server.broadcast();
module.exports.startTranslation = (conf = {}) => {
  const webcam_server = new LiveCam({ config, ...conf });
  webcam_server.broadcast();
}
