'use strict'
const express = require('express'),
  fs = require('fs'),
  util = require('util'),
  bodyParser = require('body-parser'),
  // rec = require('./src/recognitionGoogle'),
  config = require('./config'),
  webCamera = require('./src/webCamera'),
  liveCamera = require('./src/LiveCamModule'),
  { identifyMocked, identifyFromStreamStart, identifyFromStreamStop } = require('./src/openALPR'),
  { cloudinaryUploadMocked } = require('./src/cloudinaryApi'),
  app = express();

// router.use(app);
let { tempResult } = require('./res');

app.use(bodyParser.json());

app.get('/test', (req, res) => {
  // rec.getTextOf(__dirname, 'Car1.jpg').then(labels => res.send(labels))
  // console.log(Object.keys(res))
  try {
    let respKeys = Object.keys(res);
    let newRes = '';
    respKeys.forEach(key => newRes += res[key.toString()] + '\n');

    console.log(newRes);
    let resp = Object.assign({}, res);
    res.send(`<h1 align="center">${newRes.toString()}</h1>`);
  } catch (e) {
    res.send(JSON.stringify(e))
  }
})


app.get('/teststream', (req, res) => {
  liveCamera.startTranslation({
    ui_port: 1808
  });
  res.send('ok')
});


app.get('/testunstream', (req, res) => {
  identifyFromStreamStop()
})

app.get('/clapi', (req, res) => {
  console.time('/clapi')
  cloudinaryUploadMocked()
    .then(({ status, data }) => {
      console.log('Result is ')
      const out = util.format(JSON.stringify(data), 'utf8');
      // const { textAnnotations, fullTextAnnotation } = data[0];
      // temporary = data[0];
      fs.writeFileSync(`${__dirname}/res.json`, out, (err) => console.error(err));
      console.info(data[0].textAnnotations[0])
      console.timeEnd('/clapi')
      res.send(data[0])
    })
    .catch(err => {
      console.error(err)
      res.send(err)
    });
});

app.get('/temp', (req, res) => {
  console.time('/temp STRICT')
  tempResult.temp = [];
  let o = null;
  for (var i = 0; i < parseInt(req.query.times || 10000); i++) {
    o = { [i]: "dseww" + i };
    tempResult.temp.push(o)
  }
  fs.writeFileSync(`${__dirname}/${req.query.name}.json`, util.format(JSON.stringify(tempResult)), (err) => console.error(err));
  res.send(tempResult)
  console.timeEnd('/temp STRICT')
})

app.get('/alpr', (req, res) => {
  console.timeStamp(`REQUEST RECEIVED TO "/alpr"`)
  identifyMocked()
    .then(result => {
      result.results = result.results.sort((a, b) =>
        a.confidence === b.confidence ? 0 : a.confidence > b.confidence ? -1 : 1
      )
      console.log('Result /alpr : is '); console.log(result.results)
      res.send(result)
    })
    .catch(err => {
      console.error(err)
      res.send(err)
    });
})

app.get('/picture', (req, res) => {
  webCamera.getPictureFromCamera('first').then(result => res.send(result.html + `</br><p>${result.base64}</p>`))
})

app.listen(config.api.port, () => console.log('App listening on port: ' + config.api.port));
