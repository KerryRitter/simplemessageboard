var gulp = require("gulp");
var ejs = require("gulp-ejs");
var rename = require("gulp-rename");
var htmlmin = require("gulp-htmlmin");

function swallowError(error) {
    console.log(error.toString());
    this.emit("end");
}

function build() {
    return gulp.src(["src/ejs/**/*.ejs", "!src/ejs/components/**/*.ejs"])
        .pipe(ejs({
        }))
        .on("error", swallowError)
        .pipe(rename(function (path) {
            path.extname = ".html"
        }))
        .on("error", swallowError)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest("./dist"))
}

function watch() {
    gulp.watch(["src/ejs/**/*.ejs"], function() {
        build();
    });
}

module.exports = {
    build,
    watch
}