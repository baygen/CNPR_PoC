'use strict'
const express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path'),
  { config } = require('../config'),
  liveCamera = require('./LiveCamModule'),
  app = express(),
  socketServer = require('http').createServer(app),
  io = require('socket.io')(socketServer),
  recognitionManager = require('./recognitionManager'),
  imagePath = __dirname + '/tests/out.jpg',
  Store = require('./TemporaryStorage')//;
  ,
  Storage = new Store();
// Storage = require('./TemporaryStorage').createInstance();


io.on('connection', socket => {
  console.log('IO connected');

  socket.on('plate', addPlate);
  socket.on('config', changeConfig)
  socket.on('plate.status', onPlateStatusChange)

  io.emit('config', Storage.config)
  io.emit('plates', Storage.plate)
  io.emit('log', Storage.logs)
});

const onPlateStatusChange = ({ id, isAllowed }) => {
  Storage.changePlateStatusById({ id, isAllowed })
  io.emit('plates', Storage.plate)
}

const addPlate = (plate) => {
  Storage.addPlate(plate)
  io.emit('plates', Storage.plate)
}

const changeConfig = config => {
  Storage.changeConfig(config);
  io.emit('config', Storage.config);
}

const recognize = recognitionManager.createRecoginzer({
  pathToSaveImage: imagePath,
  onFinish: result => {
    const { plate, confidence, region } = result.results[0];
    const matchedPlate = Storage.plate.find(pl => pl.plate.replace(' ', '') === plate);
    console.log('Matched plate is ')
    console.info(matchedPlate)
    const report = {
      dateTime: result.dateTime,
      plate,
      isAllowed: matchedPlate ? matchedPlate.isAllowed : false,
      confidence,
      region,
      approved: matchedPlate ? matchedPlate.isAllowed : false,
      id: matchedPlate ? matchedPlate.id : null
    };
    Storage.addToLog(report)
    io.emit('plate', report);
    io.emit('log', Storage.logs)
  },
  getConfig: () => Storage.config
})

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname, '/tests')))
app.use(express.static(path.join(__dirname, '../dist')))

app.get('/plates', (req, res) => {
  res.json(Storage.plate)
});

// app.post('/plates', (req, res) => {
//   Storage.addPlate(req.body.plate)
//   io.emit('plates', Storage.plate)
//   res.sendStatus(200)
// })

app.delete('/plates/:number', (req, res) => {
  Storage.removePlateByNumber(req.params.number)
  io.emit('plates', Storage.plate)
  res.sendStatus(200)
})

app.get('*', (req, res) => {
  console.log('app.get("*")')
  res.sendFile(path.join(__dirname, '../dist/index.html'))
});

socketServer.listen(config.api.port, () => {
  liveCamera.startTranslation({
    ui_port: 1808,
    onImage: recognize
  });
  console.log('App listening on port: ' + config.api.port)
});
