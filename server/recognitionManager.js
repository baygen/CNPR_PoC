const moment = require('moment'),
  fs = require('fs'),
  identifyPlateFromImage = require('./openALPR').identifyPlateFromImage;

module.exports.createRecoginzer = function ({
  pathToSaveImage,
  onFinish = null,
  beforeRecognize = image => { },
  getConfig = () => ({
    minNumberLength: 7,
    delay: 5000,
    confidence: 87
  })
}) {
  this.identifying = false;
  this.lastResult = null;

  return image => {
    if (!this.identifying) {
      this.identifying = true;
      new Promise((resolve, reject) =>
        fs.writeFile(pathToSaveImage, image, 'base64', (err) => {
          if (err) return reject(err);
          resolve()
        })
      ).then(() => {
        beforeRecognize(image);
        return identifyPlateFromImage({ pathToImage: pathToSaveImage })
      }).then(result => {
        const { minNumberLength, delay, confidence } = getConfig();
        if (result.results.length && result.results[0].plate.length >= minNumberLength && result.results[0].confidence > confidence) {
          result.dateTime = moment(result.epoch_time).format('DD.MM.YYYY hh:mm:ss')
          if (this.lastResult && (this.lastResult.results[0].plate === result.results[0].plate)) {
            const diff = result.epoch_time - this.lastResult.epoch_time;
            console.log('Last result is exist: ' + diff)
            if (diff < delay) {
              return;
            }
          }
          console.log(result.results[0].plate)
          this.lastResult = result;
          onFinish && onFinish(result)
        }
      })
        .catch(console.error)
        .then(() => {
          this.identifying = false;
        })
    }
  }
}