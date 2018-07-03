const openalpr = require("node-openalpr"),
  fs = require('fs'),
  exec = require('child_process').exec;

const path = `${__dirname}/tests/ua1.jpg`;

openalpr.Start();
console.log('ALPR version: ')
console.log(openalpr.GetVersion());

module.exports.identifyMocked = (pathToImage = path) => new Promise((resolve, reject) =>
  openalpr.IdentifyLicense(
    pathToImage,
    {
      detectRegion: true
    },
    function (error, output) {
      console.log('\nLicense recognizing is finished !!!\n');
      if (error) return reject(error)
      return resolve(output)
    })
);

module.exports.identifyFromStreamStart = stream => {
  openalpr.queueLoop();
  console.log('Queue started')
  openalpr.StartQueue();
}

module.exports.identifyFromStreamStop = () => {
  openalpr.StopQueue()
}

module.exports.identifyPlateFromImage = ({ pathToImage, region = 'eu', country = 'ua' }) => new Promise((resolve, reject) => {
  if (pathToImage && !fs.existsSync(pathToImage)) return reject(`File doesn't exist`);
  const cmd = `alpr -c ${region} -p ${country} ${pathToImage || path} -j`;
  exec(cmd, (err, result) => {
    if (err) return reject(err);
    resolve(JSON.parse(result));
  })
})
