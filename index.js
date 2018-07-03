'use strict'
const express = require('express'),
  fs = require('fs'),
  bodyParser = require('body-parser'),
  config = require('./config'),
  liveCamera = require('./src/LiveCamModule'),
  { identifyPlateFromImage } = require('./src/openALPR'),
  app = express();

// router.use(app);
// let { tempResult } = require('./res');

app.use(bodyParser.json());

app.get('/teststream', (req, res) => {
  let identifying = false;
  let counter = 0;
  const path = __dirname + '/src/tests/out.jpg';
  liveCamera.startTranslation({
    ui_port: 1808,
    onImage: image => {
      if (!identifying) {
        console.log('\n')
        identifying = true;
        new Promise((resolve, reject) =>
            fs.writeFile(path, image, 'base64', (err) => {
              if (err) return reject(err);
              resolve()
            })
          ).then(() => identifyPlateFromImage({ pathToImage: path })
          ).then(result => {
            if (result.results.length && result.results[0].confidence > 87) {
              console.log('IDENTIFIED NUMBER PLATE')
              console.log(result);
              let html = "<img src='data:image/jpeg;base64," + image + "' height='450' width='800'>" +
                `<p>${JSON.stringify(result.results[0])}</p>`
              res.send(html)
            }
          })
          .catch(console.error)
          .then(() => {
            identifying = false;
            counter++;
          })
      }
    }
  });
});

// app.get('/picture', (req, res) => {
//   webCamera.getPictureFromCamera('first').then(result => res.send(result.html + `</br><p>${result.base64}</p>`))
// });


app.listen(config.api.port, () => console.log('App listening on port: ' + config.api.port));
