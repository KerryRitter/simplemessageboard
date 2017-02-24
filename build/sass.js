var gulp = require("gulp");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
// var minifyCss = require("gulp-minify-css");

var input = ["client/src/sass/main.scss"];
var outputFolder = "client/dist/styles";

function build() {
    return gulp.src(input)
        .pipe(sass())
        .on("error", sass.logError)
        // .pipe(rename(outputFile))
        // .pipe(minifyCss({
        //     keepSpecialComments: 0
        // }))
        // .pipe(rename({ extname: ".min.css" }))
        .pipe(gulp.dest(outputFolder));
}

function watch() {
    gulp.watch(input, function() {
        build();
    });
}

module.exports = {
    build,
    watch
}