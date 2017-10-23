  const child_process = require('child_process');


  const Promise = require('bluebird');

  function main() {

      console.log("run exec sync");

      syncreport = child_process.execSync('mvn compile', {
          cwd: "C:/Users/Atit/git/temp/iTrust-v23/iTrust"
      });

      console.log("sy1" + syncreport);

      console.log("done1");

      console.log("done2")

      console.log("done3")

      console.log("sy2" + syncreport);
  }



  function runCompile() {

      return new Promise(function(resolve, reject) {
          exec('mvn compile', {
              cwd: "C:/Users/Atit/git/temp/iTrust-v23/iTrust"
          }, function(err, stdout, stderr) {
              if (err) {
                  reject(err);
              } else {
                  console.log("stdout:" + stdout);
                  console.log("stderr:" + stderr);
                  resolve('success');
              }
          });
      });

  }


  main();
