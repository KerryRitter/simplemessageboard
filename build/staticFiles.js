"use strict";

var gulp = require("gulp");
var cache = require("gulp-cached");

var targets = [
  { description: "bootstrap-fonts", src: "./node_modules/bootstrap-sass/assets/fonts/**/*.*", dest: "./client/dist/fonts" },
  { description: "images", src: "./client/src/images/**/*.*", dest: "./client/dist/images" }
];

function copy(options) {
  function run(target) {
    gulp.src(target.src)
      .pipe(cache(target.description))
      .pipe(gulp.dest(target.dest));
  }

  function watch(target) {
    gulp.watch(target.src, function() { run(target); });
  }

  targets.forEach(run);

  if (options.shouldWatch) {
    targets.forEach(watch);
  }
}

module.exports = {
  build: function() { return copy({ shouldWatch: false }); },
  watch: function() { return copy({ shouldWatch: true }); }
};
