// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

module.exports.getTextOf = (pathToImg, imgName) => {
  // Performs label detection on the image file
  console.log()
  return client
    .textDetection(pathToImg+'/'+imgName)
    .then(results => {
      const labels = results[0].labelAnnotations;

      console.log('Labels:');
      labels.forEach(label => console.log(label.description));
      return labels
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

// export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/PoC-CNPR-8e29757a6e34.json"