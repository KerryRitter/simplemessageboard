var gulp = require("gulp");
var gutil = require("gulp-util");
var connect = require("gulp-connect");
var runSequence = require("run-sequence");

var sass = require("./build/sass");
var lint = require("./build/lint");
var webpack = require("./build/webpack");
var staticFiles = require("./build/staticFiles");
var clean = require("./build/clean");
var server = require("./build/server");
var ejs = require("./build/ejs");

gulp.task("client:sass:compile", function() {
    sass.build();
});

gulp.task("client:ts:compile", function (done) {
    webpack.build().then(function () { done(); });
});

gulp.task("client:ts:lint", function () {
    lint.run();
});

gulp.task("server:ts:compile", function() {
    server.build();
});

gulp.task("static:compile", function () {
    staticFiles.build();
});

gulp.task("compile", function() { 
    runSequence("clean", ["client:sass:compile", "client:ts:compile", "server:ts:compile", "static:compile"]);
});

gulp.task("clean", function() {
    clean.run();
});

gulp.task("serve", function() {
    webpack.watch().then(function () {
        gutil.log("Now that initial assets (js and css) are generated injection starts...");
        lint.watch();
        sass.watch();
        staticFiles.watch();
        server.watch();
        server.serve();
    }).catch(function (error) {
        gutil.log("Problem generating initial assets (js and css)", error);
    });
});

gulp.task("default", function() {
    runSequence("compile", "watch", "serve");
});