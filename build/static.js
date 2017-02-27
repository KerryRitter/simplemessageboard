"use strict";

var gulp = require("gulp");
var cache = require("gulp-cached");

function copy(targets, options) {
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

module.exports = function(targets) {
  targets = targets || [];
  targets.push({ description: "images", src: "public/images/**/*.*", dest: "dist/public/images" })

  return {
    build: function() { return copy(targets, { shouldWatch: false }); },
    watch: function() { return copy(targets, { shouldWatch: true }); }
  };
}