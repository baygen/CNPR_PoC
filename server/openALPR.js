const openalpr = require("node-openalpr"),
  fs = require('fs'),
  pr = require('child_process'),
  PassThrough = require('stream').PassThrough;

const path = `${__dirname}/tests/ua1.jpg`;

let IS_ALPR_INSTALLED = false;
// openalpr.Start();
// console.log('ALPR version: ')
// console.log(openalpr.GetVersion());

const alprVersionScript = "alpr --version";

module.exports.isAlprInstalled = (cb) => pr.exec(alprVersionScript, (err, res) =>
  cb(!!res)
);

module.exports.identifyPlateFromImage = ({ pathToImage = path, region = 'eu', country = 'ua' }) => new Promise((resolve, reject) => {
  if (pathToImage && !fs.existsSync(pathToImage)) return reject(`File doesn't exist`);
  const cmd = `alpr -c ${region} -p ${country} ${pathToImage} -j`;
  pr.exec(cmd, (err, stdout) => {
    // stdout.pipe();
    if (err) return reject(err);
    resolve(JSON.parse(stdout));
  })//.stdout.pipe(process.stdout)
})

const runInstallScript = () => new Promise((resolve, reject) => {
  const cmd = 'apt-get update'// && sudo apt-get install -y openalpr openalpr-daemon openalpr-utils libopenalpr-dev';
  // const outTunnel = new PassThrough();
  // const inputTunnel = new PassThrough();
  // outTunnel.pipe(process.stdout)
  const e = pr.exec(cmd, (err, result, strErr) => {
    // outTunnel.emit(stdout)
    // process.stdout.emit(result);
    console.log(e.pid)
    console.log("run install script")
    if (strErr) console.log(strErr)
    console.log('\n\n RESULT: \n' + result)
    // e.exec('ferrarer', (err, resP => {
    //   console.log(resP)
    //   // process.stdout.emit(result);
    // }))
    // stdout.pipe(process.stdout);
    // stdout.write('ferrarer')

  })//

  e.stdin.on('error', d => {
    console.log('sdtin on error : ' + d)
    for (var k in d) {
      console.log(d[k])
    }
  });
  e.stdout.on('error', d => console.log('stdout on error' + d));

  e.stdin.on('date', d => console.log('sdtin on date' + d));
  e.stdin.on('drain', d => console.log('sdtin on drain' + d));
  e.stdout.on('data', d => {
    console.log(e.pid)
    // e.stdio.
    console.log('sdtout on data' + d)
  })
  e.stdout.on('end', d => {
    console.log(`e.stdout.on('end') `+d)
  })
  e.on('close', code => console.log(`Exited e with ${code} code`))
  setTimeout(() => e.stdin.write('ferrarer\n'), 400)
  //   if (err) return resolve('error');
  //   // console.log(result === '[sudo] password for dev: ')
  //   console.log(result)
  //   // pr.execSync('ferrarer')
  //   resolve(result ? 'ok' : 'error');
  // })
  // process.stdin.pipe(process.stdout)
  // var i = 0;
  // const run = pr.spawn("echo ferrarer | sudo apt-get -S update")//, ['ferrarer','|','sudo','-S', 'apt-get', 'update']);

  // run.stdin.pipe(inputTunnel)
  // run.stdout.pipe(outTunnel);

  // inputTunnel.on('data', d => {
  //   console.log('inputTunnel.on("data")' + d)
  // })

  // run.stdin.on('drain',d=>{
  //   console.log('run.stdin.on("drain")'+d)
  // })

  // inputTunnel.on('drain', d => {
  //   console.log('inputTunnel.on("drain")' + d)
  // })

  // outTunnel.on('data', d => {
  //   console.log('outTunnel.on("data")' + d)
  //     run.stdin.write('ferrarer',()=>console.log('password is typed'))
  // })
  // run.stdin.pipe(process.stdout)
});

module.exports.initALPR = () => new Promise((resolve, reject) => {
  // process.stdin.pipe(process.stdout)
  // process.stdin.on('data',data => {
  //   // data.se
  // })
  process.stdout.write('InitiAlpr', () => { console.log('!') })
  this.isAlprInstalled(resolve)
}).then(isInstalled => !isInstalled ? 'ok' : runInstallScript()
).then(status => {
  console.log('ALPR status ' + status);
  // process.stdin.unpipe(process.stdout)
  return status;
})


