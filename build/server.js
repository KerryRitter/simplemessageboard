var gulp = require("gulp");
var ts = require("gulp-typescript");
var tslint = require("gulp-tslint");
var nodemon = require("gulp-nodemon");

function swallowError(error) {
    console.log(error.toString());
    this.emit("end");
}

function build() {
    const appProject = ts.createProject("app/tsconfig.json");
    const libProject = ts.createProject("app/tsconfig.json");
    const coreProject = ts.createProject("app/tsconfig.json");
    
    gulp.src(["app/**/*.ts"])
        .pipe(tslint({
            formatter: "verbose"
        }))
        .on("error", swallowError)
        .pipe(tslint.report())
        .on("error", swallowError)
        .pipe(appProject())
        .js
        .pipe(gulp.dest("dist/app"));
    
    gulp.src(["lib/**/*.ts"])
        .pipe(libProject())
        .js
        .pipe(gulp.dest("dist/lib"));
    
    gulp.src(["core/**/*.ts"])
        .pipe(coreProject())
        .js
        .pipe(gulp.dest("dist/core"));

    gulp.src(["app/views/**/*"]).pipe(gulp.dest("dist/app/views/"));
}

function watch() {
    gulp.watch(["app/**/*.*"], function() {
        build();
    });
}

function serve() {
    nodemon({
        script: "dist/app/app.js",
        ext: "js",
        watch: "dist"
    }).on("restart", function () {
        console.log("Reloading server");
    });
}

module.exports = {
    build,
    watch,
    serve
}