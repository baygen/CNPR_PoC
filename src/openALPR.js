const openalpr = require("node-openalpr");

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
      // console.log("output", output);
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
