const cloudinary = require('cloudinary'),
  config = require('../config')

const path = `${__dirname}/../Car1.jpg`;
const options = {
  ocr: "adv_ocr"
};
cloudinary.config(config.cloudinary);

module.exports.cloudinaryUploadMocked = () => new Promise((resolve, reject) => {
  cloudinary.v2.uploader.upload(path,
    options,
    (err, result) => {
      if (err) return reject(err);
      // const { width, height, format, bytes,
      //   info: {
      //     ocr: {
      //       adv_ocr
      //     }
      //   } } = result;

      return resolve(result.info.ocr.adv_ocr)
    })
})
