'use latest'
const request = require('request');
const util = require('util');

//Wait for a URL to respond a "positive" http code.
const waitForIt = (url, timeout) => {
    if (!url){
        throw new Error("The URL is invalid");
    }
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = "http://" + url;
    }    
    if (!timeout){
        //30 seconds
        timeout = 30;
    }
    console.info(util.format("Waiting up to %s seconds for the URL %s to respond", timeout, url))
    return new Promise((resolve, reject) => {
      var ellapsed = 0;
      var loop = setInterval(() => {
        request.get(url, {
          timeout: 500
        })
          .on('error', (err) => {
            //ignored
          })
          .on('response', (response) => {
            if (response.statusCode >= 200 && response.statusCode < 400) {
              clearInterval(loop);
              console.info(util.format("URL is up!! Took %s seconds to run.", ellapsed));
              return resolve(ellapsed);
            }
          });
  
        if (ellapsed >= timeout) {
          clearInterval(loop);
          return reject(new Error(util.format("Timeout reached. Waited %s for seconds before failing.", ellapsed)));
        }
        ellapsed += 1;
      }, 1000);
    });
}


const argv = process.argv.slice(2);
waitForIt(...argv)
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });