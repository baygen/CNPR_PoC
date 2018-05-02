const express = require('express');
const bodyParser = require('body-parser');

const rec = require('./src/recognitionGoogle');
const config = require('./config');
const webCamera = require('./src/webCamera')
const app = express();

app.use(bodyParser.json());

app.get('/test', (req, res) => {
  // rec.getTextOf(__dirname, 'Car1.jpg').then(labels => res.send(labels))
  // console.log(Object.keys(res))
  try {
  let respKeys = Object.keys(res);
  let newRes = ''
  respKeys.forEach(key=>newRes+=res[key.toString()]+'\n');

  console.log(newRes)
  let resp = Object.assign({},res)
  res.send(`<h1 align="center">${newRes.toString()}</h1>`);
  } catch(e) {
    res.send(e)
  }
})

app.get('/picture', (req, res) => {
  webCamera.getPictureFromCamera('first').then(result=>res.send(result.html))
})
// router.use(app);

app.listen(config.api.port, () => console.log('App listening on port: ' + config.api.port ));
