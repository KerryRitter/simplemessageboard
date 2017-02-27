var gulp = require("gulp");
var sass = require("gulp-sass");
var rename = require("gulp-rename");

var outputFolder = "./dist/public/styles";

module.exports = function(input) {
    return {
        build: function() {
            return gulp.src(input)
                .pipe(sass())
                .on("error", sass.logError)
                .pipe(gulp.dest(outputFolder));
        },
        watch: function() {
            gulp.watch(input, function() {
                build();
            });
        }
    }
}