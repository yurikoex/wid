var _ = require('underscore');

var aWords = require("./Words/AWords.json");
var bWords = require("./Words/BWords.json");
var cWords = require("./Words/CWords.json");
var dWords = require("./Words/DWords.json");
var eWords = require("./Words/EWords.json");
var fWords = require("./Words/FWords.json");
var gWords = require("./Words/GWords.json");
var hWords = require("./Words/HWords.json");
var iWords = require("./Words/IWords.json");
var jWords = require("./Words/JWords.json");
var kWords = require("./Words/KWords.json");
var lWords = require("./Words/LWords.json");
var mWords = require("./Words/MWords.json");
var nWords = require("./Words/NWords.json");
var oWords = require("./Words/OWords.json");
var pWords = require("./Words/PWords.json");
var qWords = require("./Words/QWords.json");
var rWords = require("./Words/RWords.json");
var sWords = require("./Words/SWords.json");
var tWords = require("./Words/TWords.json");
var uWords = require("./Words/UWords.json");
var vWords = require("./Words/VWords.json");
var wWords = require("./Words/WWords.json");
var xWords = require("./Words/XWords.json");
var yWords = require("./Words/YWords.json");
var zWords = require("./Words/ZWords.json");

var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

var allWords = aWords.concat(bWords).concat(cWords).concat(dWords).concat(eWords).concat(fWords).concat(gWords).concat(hWords).concat(iWords).concat(jWords).concat(kWords).concat(lWords).concat(mWords).concat(nWords).concat(oWords).concat(pWords).concat(qWords).concat(rWords).concat(sWords).concat(tWords).concat(uWords).concat(vWords).concat(wWords).concat(xWords).concat(yWords).concat(zWords);
var allWordsWithLength = [];
_.each(allWords, function (word) {
    allWordsWithLength.push({
        word: word,
        len: word.length
    });
});
var longestWordWithLength = _.max(allWordsWithLength, function (wordWithLength) {
    return wordWithLength.len;
});
var shortestWordWithLength = _.min(allWordsWithLength, function (wordWithLength) {
    return wordWithLength.len;
});
var lengthRange = _.range(shortestWordWithLength.len, longestWordWithLength.len + 1);
var letterLengthList = [];
_.each(lengthRange, function (wordLength) {
    var list = _.filter(allWordsWithLength, function (wordWithLength) {
        return wordWithLength.len === wordLength;
    });
    letterLengthList.push({
        words: _.pluck(list, 'word'),
        numberOfLetters: wordLength
    });
});

function NewWID(widLength) {
    var widWords = [];
    if (widLength >= shortestWordWithLength.len) {
        var lengths = getRandomLengthRange(widLength);
        _.each(lengths, function (length) {
            var list = _.find(letterLengthList, function (letterLength) {
                return letterLength.numberOfLetters === length;
            });
            widWords.push(list.words[Math.floor(Math.random() * (list.words.length - 1))]);
        });
    }
    var wid = "";
    _.each(widWords, function (word) {
        if (wid.length === 0) {
            wid += word;
        } else {
            wid += word.substring(0, 1).toUpperCase() + word.substring(1);
        }
    });
    if (wid.length < widLength) {
        for (var i = 0; i < widLength - wid.length; i++) {
            wid += letters[Math.floor(Math.random() * (letters.length - 1))];
        }
    }
    return wid;
}
exports.NewWID = NewWID;

function getRandomLengthRange(length) {
    var lengths = [];
    lengths.push(getRandomLength(length));
    var currentLength = sumLengths(lengths);
    while (currentLength < length) {
        var spacesShort = length - currentLength;
        if (spacesShort < shortestWordWithLength.len) {
            currentLength = length;
        } else {
            lengths.push(getRandomLength(spacesShort));
            currentLength = sumLengths(lengths);
        }
    }
    return lengths;
}
function getRandomLength(length) {
    var rnd = shortestWordWithLength.len + Math.floor(Math.random() * (longestWordWithLength.len - shortestWordWithLength.len));
    if (rnd > length) {
        rnd = length;
    }
    return rnd;
}

function sumLengths(lengths) {
    var total = 0;
    _.each(lengths, function (len) {
        total += len;
    });
    return total;
}

//@ sourceMappingURL=wid.js.map
