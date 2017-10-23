const fs = require('fs');

const fsExtra = require('fs-extra');

const fuzzer = require('./fuzzer');

const child_process = require('child_process');

const USER = "";

const PASS = "";

const REPO = "github.ncsu.edu/akshetty/iTrust-v23.git";

const REMOTE = `https://${USER}:${PASS}@${REPO}`;

const BRANCH = "fuzzer";

const LOCALPATH = "";

const ITRUST = "iTrust-v23";

const ITRUST_RELATIVE_PATH = 'iTrust-v23/iTrust/src/main/edu/ncsu/csc/itrust';

function main() {

    clone(REMOTE, LOCALPATH, BRANCH);


}

function clone(remote, local, branch) {
    fsExtra.ensureDirSync(local);

    if (fs.existsSync(local + "/" + ITRUST)) {
        fsExtra.removeSync(local + "/" + ITRUST);
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

function pull(local) {
    var result = child_process.spawnSync('git', ['pull'], {
        cwd: local
    });

    if (result.error) {
        throw new Error("Error pulling changes from remote:\n" + error);
    } else {
        var analysis = result.stdout.toString('utf-8') + result.stderr.toString('utf-8');
        if (analysis.match(/fatal|error/)) {
            throw new Error("Error pulling changes from remote:\n" + analysis);
        }
    }
}

function add(local) {
    var result = child_process.spawnSync('git', ['add', '*java'], {
        cwd: local
    });

    if (result.error) {
        throw new Error("Error adding changes:\n" + error);
    } else {
        var analysis = result.stdout.toString('utf-8') + result.stderr.toString('utf-8');
        if (analysis.match(/fatal|error/)) {
            throw new Error("Error adding changes:\n" + analysis);
        }
    }
}

function commit(local, message) {

    if (!message) {
        throw new Error("Message required for commit");
    }
    var result = child_process.spawnSync('git', ['commit', '-m', message], {
        cwd: local
    });

    if (result.error) {
        throw new Error("Error commiting changes:\n" + error);
    } else {
        var analysis = result.stdout.toString('utf-8') + result.stderr.toString('utf-8');
        if (analysis.match(/fatal|error/)) {
            throw new Error("Error commiting changes:\n" + analysis);
        }
    }
}

function push(local) {

    var result = child_process.spawnSync('git', ['push'], {
        cwd: local
    });

    if (result.error) {
        throw new Error("Error pushing changes to remote:\n" + error);
    } else {
        var analysis = result.stdout.toString('utf-8') + result.stderr.toString('utf-8');
        if (analysis.match(/fatal|error/)) {
            throw new Error("Error pushing changes to remote:\n" + analysis);
        }
    }
}

function reset(local, numberOfCommits) {

    if (typeof numberOfCommits != 'number') {
        throw new Error("numberOfCommits should be a whole number");
    }

    var result = child_process.spawnSync('git', ['reset', '--hard', 'HEAD~' + numberOfCommits], {
        cwd: local
    });

    if (result.error) {
        throw new Error("Error reverting changes:\n" + error);
    } else {
        var analysis = result.stdout.toString('utf-8') + result.stderr.toString('utf-8');
        if (analysis.match(/fatal|error/)) {
            throw new Error("Error reverting changes:\n" + analysis);
        }
    }
}

function resetRemote(local) {

    reset(local, 1);

    var result = child_process.spawnSync('git', ['push', '-f'], {
        cwd: local
    });

    if (result.error) {
        throw new Error("Error reverting changes to remote:\n" + error);
    } else {
        var analysis = result.stdout.toString('utf-8') + result.stderr.toString('utf-8');
        if (analysis.match(/fatal|error/)) {
            throw new Error("Error reverting changes to remote:\n" + analysis);
        }
    }
}

/*
args should be an Array
returns stdout*/
function maven(local, args) {
    if (!args || Array.isArray(args)) {
        throw new Error("args is not present or ars is not an array");
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



main();
