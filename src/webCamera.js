var NodeWebcam = require("node-webcam");

const opts = {
  //Picture related
  width: 1280,
  height: 720,
  quality: 200,

  //Delay to take shot
  delay: 0,

  //Save shots in memory
  saveShots: false,

  // [jpeg, png] support varies
  // Webcam.OutputTypes
  output: "jpeg",

  //Which camera to use
  //Use Webcam.list() for results
  //false for default device
  device: false,

  // [location, buffer, base64]
  // Webcam.CallbackReturnTypes
  callbackReturn: "base64",

  //Logging
  verbose: false
};

var WebcamBase64 = NodeWebcam.create({...opts, ...{callbackReturn: 'base64'}});

//Will automatically append location output type
// Webcam.capture("test_picture", function (err, data) { });


//Also available for quick use
// NodeWebcam.capture("test_picture", opts, function (err, data) {
// });


//Get list of cameras

WebcamBase64.list(function (list) {
  //Use another device
  var anotherCam = NodeWebcam.create({ device: list[0] });
});

//Return type with base 64 image
var picOpts = {
  callbackReturn: "base64"
};

module.exports.getPictureFromCamera = (pictureName) => {
  return new Promise((resolve, reject) => {
    WebcamBase64.capture(pictureName, (err, data) => {
      if (err) reject(err);
      resolve({
        html: "<img src='" + data + "' height='450' width='800'>",
        base64: data
      })
    });
  });
};
