"use strict";

var gulp = require("gulp");
var inject = require("gulp-inject");
var glob = require("glob");

function injectIndex(options) {
  function run() {
    var target = gulp.src("client/src/html/index.html");
    var sources = gulp.src([
      "client/dist/styles/main*.css",
      "client/dist/scripts/vendor*.js",
      "client/dist/scripts/main*.js"
    ], { read: false });

    return target
      .pipe(inject(sources, { ignorePath: "/client/dist/", addRootSlash: false, removeTags: true }))
      .pipe(gulp.dest("dist"));
  }

  var jsCssGlob = "client/dist/**/*.{js,css}";

  function checkForInitialFilesThenRun() {
    glob(jsCssGlob, function (er, files) {
      var filesWeNeed = ["client/dist/scripts/main", "client/dist/scripts/vendor", "client/dist/styles/main"];

      function fileIsPresent(fileWeNeed) {
        return files.some(function(file) {
          return file.indexOf(fileWeNeed) !== -1;
        });
      }

      if (filesWeNeed.every(fileIsPresent)) {
        run("initial build");
      } else {
        checkForInitialFilesThenRun();
      }
    });
  }

  checkForInitialFilesThenRun();

  if (options.shouldWatch) {
    gulp.watch([jsCssGlob, "client/src/html/index.html"], function(evt) {
      if (evt.path && evt.type === "changed") {
        run(evt.path);
      }
    });
  }
}

module.exports = {
  build: function() { return injectIndex({ shouldWatch: false }); },
  watch: function() { return injectIndex({ shouldWatch: true  }); }
};
