var gulp = require("gulp");
var ts = require("gulp-typescript");
var tslint = require("gulp-tslint");
var nodemon = require("gulp-nodemon");

function swallowError(error) {
    console.log(error.toString());
    this.emit("end");
}

function build() {
    const tsProject = ts.createProject("tsconfig.server.json");
    
    gulp.src(["server/src/**/*.ts"])
        .pipe(tslint({
            formatter: "verbose"
        }))
        .on("error", swallowError)
        .pipe(tslint.report())
        .on("error", swallowError)
        .pipe(tsProject())
        .js
        .pipe(gulp.dest("./server/dist"));

    gulp.src(["server/src/views/**/*"]).pipe(gulp.dest("server/dist/views/"));
}

function watch() {
    gulp.watch(["server/src/**/*.*"], function() {
        build();
    });
}

function serve() {
    nodemon({
        script: "server/dist/app.js",
        ext: "js",
        watch: "server/dist"
    }).on("restart", function () {
        console.log("Reloading server");
    });
}

module.exports = {
    build,
    watch,
    serve
}