const fs = require('fs');

const fsExtra = require('fs-extra');

const fuzzer = require('./fuzzer');

const child_process = require('child_process');

const USER = "";

const PASS = "";

const REPO = "github.ncsu.edu/akshetty/iTrust-v23.git";

const REMOTE = `https://${USER}:${PASS}@${REPO}`;

const BRANCH = "fuzzer";

const itrustPath = 'iTrust-v23/iTrust/src/main/edu/ncsu/csc/itrust';

function main() {

}

function clone(remote, local, branch) {
    fsExtra.ensureDirSync(local);

    if (fs.existsSync(local + "/iTrust-v23")) {
        fsExtra.removeSync(local + "/iTrust-v23");
    }
    var result = child_process.spawnSync('git', ['clone', remote, '--branch', branch], {
        cwd: local
    });

    if (result.error) {
        throw new Error("Error cloning repo: " + remote + "\n" + error);
    } else {
        var analysis = result.stdout.toString('utf-8') + result.stderr.toString('utf-8');
        if (analysis.match(/fatal|error/)) {
            throw new Error("Error cloning repo: " + remote + "\n" + analysis);
        }
    }
}

main();
