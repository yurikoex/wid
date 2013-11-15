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

//Used for randomness later
var letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

//create list of words, add in the length
var allWordsWithLength = _.map(_.flatten([
        aWords,bWords,cWords,dWords,
        eWords,fWords,gWords,hWords,
        iWords,jWords,kWords,lWords,
        mWords,nWords,oWords,pWords,
        qWords,rWords,sWords,tWords,
        uWords,vWords,wWords,xWords,
        yWords,zWords
    ]),
    (word)=> {
        return {
            word: word,
            len: word.length
        };
    });

var longestWordWithLength = _.max(allWordsWithLength, (wordWithLength) => {
    return wordWithLength.len;
});

var shortestWordWithLength = _.min(allWordsWithLength, (wordWithLength) => {
    return wordWithLength.len;
});

var letterLengthList = _.map(_.range(shortestWordWithLength.len, longestWordWithLength.len + 1), (wordLength) => {
    var list = _.filter(allWordsWithLength, (wordWithLength) => {
        return wordWithLength.len === wordLength;
    });
    return {
        words: _.pluck(list, 'word'),
        numberOfLetters: wordLength
    };
});

export function NewWID(widLength:number):string {
    var widWords = [];
    if (widLength >= shortestWordWithLength.len) {
        var lengths = getRandomLengthRange(widLength);
        _.each(lengths, (length) => {
            var list = _.find(letterLengthList, (letterLength) => {
                return letterLength.numberOfLetters === length;
            });
            var index = Math.floor(Math.random() * (list.words.length - 1));
            widWords.push(list.words[index]);

            var randomIndex = Math.floor(Math.random() * (list.words[index].length - 1));
            var wordAsArray = list.words[index].split('');
            wordAsArray[randomIndex] = letters[Math.floor(Math.random() * (letters.length - 1))];
            var newWord = wordAsArray.join('');
            list.words[index] = newWord;
        });
    }
    var wid = "";
    _.each(widWords, (word) => {
        if (wid.length === 0) {
            wid += word;
        }
        else {
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

function getRandomLengthRange(length:number):number[] {
    var lengths = [];
    lengths.push(getRandomLength(length));
    var currentLength = sumLengths(lengths);
    while (currentLength < length) {
        var spacesShort = length - currentLength;
        if (spacesShort < shortestWordWithLength.len) {
            currentLength = length;
        }
        else {
            lengths.push(getRandomLength(spacesShort));
            currentLength = sumLengths(lengths);
        }
    }
    return lengths;
}

function getRandomLength(length:number):number {
    var rnd = shortestWordWithLength.len + Math.floor(
        Math.random() * (longestWordWithLength.len - shortestWordWithLength.len));
    if (rnd > length) {
        rnd = length;
    }
    return rnd;
}

function sumLengths(lengths:number[]):number {
    return _.reduce(lengths, function(memo, num){ return memo + num; }, 0);
}
