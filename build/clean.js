var del = require("del");
var gutil = require("gulp-util");

module.exports = {
    run: function(done) {
        return del(["dist/**/*.*", "!./dist"], { force: true })
            .then(function (paths) {
                gutil.log("Deleted files/folders:\n", paths.join("\n"));
                done();
            })
            .catch(function (error) {
                gutil.log("Problem deleting:\n", error);
                done();
            });
    }
};
