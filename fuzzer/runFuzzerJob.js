const localPath = 'C:\\Users\\Atit\\git\\temp\\';

const git = require('simple-git');

const fs = require('fs');

const fsExtra = require('fs-extra');

const fuzzer = require('./fuzzer');

const Promise = require('bluebird');

const child_process = require('child_process');

const USER = "";

const PASS = "";

const REPO = "github.ncsu.edu/akshetty/iTrust-v23.git";

const remote = `https://${USER}:${PASS}@${REPO}`;

const itrustPath = 'iTrust-v23/iTrust/src/main/edu/ncsu/csc/itrust';



function main() {

    cloneRepo(remote, localPath, "fuzzer").then(function(result) {
        fuzzer.main(localPath + itrustPath);
    }).then(function(result) {
        mutate();
    });

}

function mutate() {
    pullChanges().then(function(result) {
        fuzzer.main(localPath + itrustPath);
    }).then(function(result) {
        pushChanges();
    });
}



function cloneRepo(remote, local, branch) {

    return new Promise(function(resolve, reject) {
        if (fs.existsSync(localPath + "iTrust-v23")) {
            fsExtra.removeSync(localPath + "iTrust-v23");
        }
        git(local).clone(remote, ['--branch', branch], function(err, data) {
            if (err) {
                reject(false);
            } else {
                resolve(true);
            }
        });
    });


}

function pullChanges() {
    return new Promise(function(resolve, reject) {
        git(localPath + 'iTrust-v23').pull(function(err, data) {
            if (err) {
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
}

function pushChanges() {

    return new Promise(function(resolve, reject) {
        git(localPath + 'iTrust-v23').add('./*.java').commit("Test").push('origin', 'fuzzer', function(err, data) {
            if (!err) {
                resolve(true);
            } else {
                reject(false);
            }
        });
    });
}

function runMaven(args, path) {
    if (!args)
        throw new Error("args should be a valid error like ['compile']");

    if (!path)
        throw new Error("path should a valid directory path");

    var compileResult = child_process.spawnSync("mvn", args, {
        cwd: path
    });


}



main();
