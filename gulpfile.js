// https://github.com/Joel-Mercier/portfolio/blob/master/gulpfile.js
"use strict";

var gulp        = require("gulp"),
    browserSync = require("browser-sync").create(),
    sass        = require("gulp-sass"),
    cp          = require("child_process"),
    prefix      = require("gulp-autoprefixer"),
    concat      = require("gulp-concat"),
    uglify      = require("gulp-uglify"),
    rename      = require("gulp-rename"),
    cleanCSS    = require('gulp-clean-css'),
    pump        = require("pump");

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
  // browserSync.notify(messages.jekyllBuild);
  return cp.spawn('jekyll', ['build', '--incremental'], {stdio: 'inherit'})
    .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'js', 'jekyll-build'], function() {
  browserSync.init({
    server: {
      baseDir: '_site'
    },
    browser: 'Google Chrome'
  });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
  return gulp.src('_scss/styles.scss')
    .pipe(sass({
        includePaths: ['css', 'node_modules'],
        outputStyle: 'expanded',
        onError: browserSync.notify('Error in sass'),
    }))
    .on('error', sass.logError)
    .pipe(prefix(['last 2 versions']))
    // .pipe(cleanCSS())
    .pipe(cleanCSS({debug: true}, function(details) {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
      console.log(details.name + ': ' + Math.ceil(details.stats.efficiency * 100) + '%');
    }))
    .pipe(gulp.dest('_site/css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('css'));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch(['_scss/*.scss', 'css/*.scss'], ['sass']);
  gulp.watch(['_js/*.js'], ['js']);
  gulp.watch(['**/*.html', '_layouts/*.html', '_includes/*.html'], ['jekyll-rebuild']);
});

gulp.task('js', function (cb) {
  pump([
    gulp.src(["_js/modernizr.js", "_js/main.js"])
      .pipe(concat("lahumiere.js")),
    uglify(),
    gulp.dest("js")
  ], cb);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
