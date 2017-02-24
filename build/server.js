var gulp = require("gulp");
var ts = require("gulp-typescript");
var tslint = require("gulp-tslint");
var nodemon = require("gulp-nodemon");

gulp.task("copy:ejs", function() {
    gulp.src(["./src/views/**/*"]).pipe(gulp.dest("./dist/views/"));
});

const tsProject = ts.createProject("tsconfig.json");

function build() {
    return gulp.src(["server/src/**/*.ts"])
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report())
        .pipe(tsProject())
        .js
        .pipe(gulp.dest("./server/dist"));
}

function watch() {
    gulp.watch(["server/src/**/*.ts"], function() {
        build();
    });
    gulp.watch(["server/dist/**/*.*"], function() {
        livereload.changed();
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