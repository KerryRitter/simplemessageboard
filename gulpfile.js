var gulp = require("gulp");
var gutil = require("gulp-util");
var connect = require("gulp-connect");
var runSequence = require("run-sequence");

var webpack = require("./build/webpack");
var server = require("./build/server");
var clean = require("./build/clean");

var publicTsLint = require("./build/lint")([
    "./public/ts/**/*.ts"
]);
var sass = require("./build/sass")([
    "./public/sass/main.scss"
]);
var static = require("./build/static")([
    { description: "bootstrap-fonts", src: "./node_modules/bootstrap-sass/assets/fonts/**/*.*", dest: "./dist/public/fonts" }
]);

gulp.task("public:sass:compile", function() {
    sass.build();
});

gulp.task("public:ts:compile", function (done) {
    webpack.build().then(function () { done(); });
});

gulp.task("public:ts:lint", function () {
    publicTsLint.run();
});

gulp.task("app:ts:compile", function() {
    server.build();
});

gulp.task("static:copy", function () {
    static.build();
});

gulp.task("compile", ["public:sass:compile", "public:ts:compile", "app:ts:compile", "static:copy"]);

gulp.task("clean", function(done) {
    clean.run(done);
});

gulp.task("serve", function() {
    webpack.watch().then(function () {
        gutil.log("Now that initial assets (js and css) are generated injection starts...");
        publicTsLint.watch();
        sass.watch();
        static.watch();
        server.watch();
        server.serve();
    }).catch(function (error) {
        gutil.log("Problem generating initial assets (js and css)", error);
    });
});

gulp.task("default", function() {
    runSequence("clean", "compile", "serve");
});