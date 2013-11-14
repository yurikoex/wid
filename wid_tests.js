module.exports = {
    setUp: function (callback) {
        this.wid = require('./wid');
        callback();
    },
    tearDown: function (callback) {
        callback();
    },
    AskForEightCharacterLength: function (test) {
        test.ok(this.wid.NewWID(8).length == 8, "This should be 8");
        test.done();
    },
    TestDifferentLengths: function (test) {
        for (var i = 0; i < 50; i++) {
            var stamp = new Date().getTime();
            var w = this.wid.NewWID(i);
            if (w.length !== i) {
                throw {
                    wid: w,
                    requestedLength: i,
                    actualLength: w.length
                };
            }
            console.log("WID: " + w + " (" + (new Date().getTime() - stamp) + ")");
        }
        test.done();
    }
};

