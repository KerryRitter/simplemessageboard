var gulp = require("gulp");
var tslint = require("gulp-tslint");

module.exports = function(input) {
    return {
        run: function() {
            return gulp.src(input)
                .pipe(tslint({
                    formatter: "verbose"
                }))
                .pipe(tslint.report({
                    emitError: false
                }))
        },
        watch: function() {
            gulp.watch(input, function() {
                run();
            });
        }
    }
}