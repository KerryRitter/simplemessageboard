var gulp = require("gulp");
var gutil = require("gulp-util");
var connect = require("gulp-connect");
var runSequence = require("run-sequence");

var sass = require("./build/sass");
var lint = require("./build/lint");
var webpack = require("./build/webpack");
var staticFiles = require("./build/staticFiles");
var tests = require("./build/tests");
var clean = require("./build/clean");
var inject = require("./build/inject");

gulp.task("sass:compile", function() {
    sass.build();
});

gulp.task("ts:compile", function (done) {
    webpack.build().then(function () { done(); });
});

gulp.task("ts:lint", function () {
    lint.run();
});

gulp.task("static:compile", function () {
    staticFiles.build();
    inject.build();
});

gulp.task("compile", [ "sass:compile", "ts:compile", "static:compile"]);

gulp.task("clean", function() {
    clean.run();
});

gulp.task("watch", function (done) {
    webpack.watch().then(function () {
        gutil.log("Now that initial assets (js and css) are generated injection starts...");
        inject.watch();
        lint.watch();
        sass.watch();
        staticFiles.watch();
        tests.watch();
        done();
    }).catch(function (error) {
        gutil.log("Problem generating initial assets (js and css)", error);
    });
});

gulp.task("server:start", function() {
    connect.server({
        root: "dist",
        livereload: true
    });

    gulp.watch("dist/**/*.*", ["server:reload"]);
});

gulp.task("server:reload", function () {
    gulp.src("dist/**/*.*").pipe(connect.reload());
});

gulp.task("serve", function() {
    runSequence("clean", ["sass:compile", "static:compile"], ["watch", "server:start"]);
});
