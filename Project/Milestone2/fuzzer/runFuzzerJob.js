const fs = require('fs');

const fsExtra = require('fs-extra');

const fuzzer = require('./fuzzer');

var sleep = require('system-sleep');

const child_process = require('child_process');

var USER = "{{github_username}}";

var KEY = "{{github_password}}";

const REPO = "github.ncsu.edu/agarg12/iTrust-v23.git";

var REMOTE = ``;

const BRANCH = "fuzzer";

var LOCALPATH = "/var/lib/jenkins/fuzzer";

const ITRUST_V23 = "iTrust-v23";

const ITRUST = "iTrust";

var GITPATH = ``;

const ITRUST_RELATIVE_PATH = '/iTrust-v23/iTrust/src/main/edu/ncsu/csc/itrust';

var numberOfIterations = 100;


function main() {

    //USER = process.env.USER;

    //KEY = process.env.KEY;

    //LOCALPATH = process.env.LOCALPATH;

    numberOfIterations = process.env.ITERATIONS || 100;

    REMOTE = `https://${USER}:${KEY}@${REPO}`;

    GITPATH = `${LOCALPATH}/${ITRUST_V23}`;

    console.log("from env");
    console.log(USER);
    console.log(KEY);
    console.log(LOCALPATH);
    console.log(numberOfIterations);

    clone(REMOTE, LOCALPATH, BRANCH);

    for (var i = 1; i <= 1; i++) {

        var maxRetries = 50;

        var runJenkinsJob = false;

        var commitID = '';

        pull(GITPATH);

        while (maxRetries > 0) {
            fuzzer.main(LOCALPATH + ITRUST_RELATIVE_PATH);
            var result = maven(GITPATH + "/" + ITRUST, ['compile']);
            console.log("maven build------------------");
            //console.log(result);

            if (!result.match(/BUILD FAILURE/)) {
                console.log('build success')
                commit(GITPATH, "Test" + i);

                commitID = getCommitID(GITPATH, BRANCH);

                console.log(commitID);

                revertChanges(GITPATH);

                runJenkinsJob = true;
                break;
            } else {
                console.log('build failure');
                reset(GITPATH, 'HEAD');
            }

        }

        if (runJenkinsJob) {
            console.log("runnning jenkins job");
            //Run jenkins job and check the status
            triggerJenkinsJob(commitID);

        }
        sleep(80000);

    }

}

function clone(remote, local, branch) {
    fsExtra.ensureDirSync(local);

    if (fs.existsSync(local + "/" + ITRUST_V23)) {
        fsExtra.removeSync(local + "/" + ITRUST_V23);
    }

    console.log("inside clone");
    console.log(local + "/" + ITRUST_V23);

    var result = child_process.execSync(`git clone ${remote}`, {
        cwd: local
    }).toString('utf8');

    if (result.match(/fatal|error/)) {
        throw new Error("Error pulling changes from remote:\n" + result);
    }

    child_process.execSync(`git push origin --delete fuzzer`, {
        cwd: local + "/" + ITRUST_V23
    });

    child_process.execSync(`git checkout -b fuzzer && git push -u origin fuzzer`, {
        cwd: local + "/" + ITRUST_V23
    });

}

function pull(local) {
    var result = child_process.execSync('git pull', {
        cwd: local
    }).toString('utf8');


    if (result.match(/fatal|error/)) {
        throw new Error("Error pulling changes from remote:\n" + result);
    }

}



function commit(local, message) {

    var result = child_process.execSync(`git pull && git add *java && git commit -m "${message}" && git push`, {
        cwd: local
    }).toString('utf8');



    if (result.match(/fatal|error/)) {
        throw new Error("Error commiting changes:\n" + result);
    }

}



function reset(local, commit) {

    var result = child_process.execSync(`git reset --hard ${commit}`, {
        cwd: local
    }).toString('utf-8');


    if (result.match(/fatal|error/)) {
        throw new Error("Error reverting changes:\n" + result);
    }

}

function revertChanges(local) {

    var result = child_process.execSync('git revert --no-edit HEAD && git push', {
        cwd: local
    }).toString('utf8');

    if (result.match(/fatal|error/)) {
        throw new Error("Error reverting changes to remote:\n" + result);
    }

}

function getCommitID(local, branch) {
    var result = child_process.execSync(`git rev-parse ${branch}`, {
        cwd: local
    }).toString('utf8').trim();

    console.log("getcommit:" + result);
    if (result.match(/fatal|error/)) {
        throw new Error("Error reverting changes to remote:\n" + result);
    }

    return result;
}

/*
args should be an Array
returns stdout*/
function maven(local, args) {
    if (!Array.isArray(args)) {
        throw new Error("args is not present or args is not an array");
    }

    var result = child_process.spawnSync('mvn', args, {
        cwd: local
    });

    if (result.error) {
        throw new Error("Cannot execute maven command:\n" + error);
    } else {
        return analysis = result.stdout.toString('utf-8') + result.stderr.toString('utf-8');
    }
}

function triggerJenkinsJob(commitID) {
    var result = child_process.execSync('curl http://{{username}}:{{jenkinspassword}}@localhost:8080/job/itrust-main/build?token=itrust-trigger', {
        cwd: '.'
    }).toString('utf8');

    if (result.match(/error|fatal/i)) {
        console.error(result);
    }
}

main();
