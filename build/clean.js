"use strict";

var del = require("del");
var gutil = require("gulp-util");

function run() {
    return del(["./client/dist/**/*.*", "!./dist"], { force: true })
        .then(function (paths) {
            gutil.log("Deleted files/folders:\n", paths.join("\n"));
        })
        .catch(function (error) {
            gutil.log("Problem deleting:\n", error);
        });
}

module.exports = {
    run: function (done) { return run(done); }
};
