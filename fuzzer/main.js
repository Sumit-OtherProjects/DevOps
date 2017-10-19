const fs = require('fs');
const Random = require('random-js');
const path = require('path');
const randomizer = new Random(Random.engines.mt19937().autoSeed());

var validFileExtensions = ["java"];

/*
This method will read all the files in a directory recursively
*/
const read = (dir) =>
    fs.readdirSync(dir)
    .reduce(function(files, file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            var readFilesList = read(path.join(dir, file));
            if (readFilesList != undefined) {
                return files.concat(readFilesList);
            } else {
                return files;
            }
        } else {
            if (validFileExtensions.indexOf(file.substring(file.lastIndexOf(".") + 1)) > -1) {
                return files.concat(path.join(dir, file));
            } else {
                return files;
            }
        }
    }, []);

function main(directoryPath) {

    var args = process.argv.slice(2);

    var dirPath = directoryPath || args[0];

    if (!dirPath)
        throw new Error("not valid directory");

    var listOfFiles = read(dirPath);

    var sampleList = randomizer.sample(listOfFiles, randomizer.integer(0, listOfFiles.length));

    sampleList.forEach(function(ele) {
        createRandomChangesInAFile(ele);
    });
}

function createRandomChangesInAFile(filePath) {
    var data = fs.readFileSync(filePath, 'utf-8').split(' ');

    data.forEach(function(ele, index) {
        var match = ele.match(/\".*\"/i);


        if (match != undefined) {

            var original = match[0].substring(1, match[0].length - 1);
            var replacement = original;

            if (randomizer.bool(0.40)) {
                replacement = replacement.split('').reverse().join('');
            }

            if (randomizer.bool(0.20)) {
                replacement = randomizer.string(randomizer.integer(0, 2 * replacement.length));
            }

            data[index] = data[index].replace(original, replacement);


            if (randomizer.bool(0.25)) {
                data[index] = data[index].replace(match, null);
            }
        }

        if (ele.includes(">")) {

            if (randomizer.bool(0.40)) {
                data[index] = ele.replace(/>/g, "<");
            }
        }

        if (ele.includes("<")) {

            if (randomizer.bool(0.30)) {
                data[index] = ele.replace(/</g, ">");
            }
        }

        if (ele.includes("!=")) {
            if (randomizer.bool()) {
                data[index] = ele.replace(/!=/g, "==");
            }
        }

        if (ele.includes("==")) {
            if (randomizer.bool()) {
                data[index] = ele.replace(/==/g, "!=");
            }
        }

        if (ele.includes("1")) {
            if (randomizer.bool(0.6)) {
                data[index] = ele.replace(/1/g, "0");
            }
        }

        if (ele.includes("0")) {
            if (randomizer.bool(0.25)) {
                data[index] = ele.replace(/1/g, "1");
            }
        }

    });

    data = data.join(" ");

    fs.writeFileSync(filePath, data);
}

main();

exports.main = main;
