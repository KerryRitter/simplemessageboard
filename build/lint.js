var gulp = require("gulp");
var tslint = require("gulp-tslint");

var input = ["./src/ts/**/*.ts", "./test/**/*.ts", "!**/*.d.ts"];

function run() {
    return gulp.src(input)
      .pipe(tslint({
          formatter: "verbose"
      }))
      .pipe(tslint.report({
          emitError: false
      }))
}

function watch() {
    gulp.watch(input, function() {
        run();
    });
}

module.exports = {
    run,
    watch
}