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
    CleanCSS = require('clean-css'),
    map = require('vinyl-map'),
    // cleanCSS    = require('gulp-clean-css'),
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
  var minify = map(function (buff, filename) {
    return new CleanCSS({
      // specify your clean-css options here
      keepBreaks: false
    }).minify(buff.toString()).styles;
  });

  return gulp.src('_scss/styles.scss')
    .pipe(sass({
        includePaths: ['css', 'node_modules'],
        outputStyle: 'expanded',
        onError: browserSync.notify('Error in sass'),
    }))
    .on('error', sass.logError)
    .pipe(prefix(['last 2 versions']))
    .pipe(minify)
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
  gulp.watch(['_js/*.js'], ['jsMain']);
  gulp.watch(['**/*.html', '_layouts/*.html', '_includes/*.html'], ['jekyll-rebuild']);
});

gulp.task('jsLib', function(cb) {
  pump([
    gulp.src(["node_modules/jquery/dist/jquery.js", "node_modules/imagesloaded.pkgd.js", "node_modules/masonry-layout/masonry.pkgd.js"])
      .pipe(concat("lib.min.js")),
    uglify(),
    gulp.dest("js")
  ], cb);
});

gulp.task('jsLibExtra', function(cb) {
  pump([
    gulp.src(["node_modules/slick-carousel/slick/slick.js"])
      .pipe(concat("lib-extra.min.js")),
    uglify(),
    gulp.dest("js")
  ], cb);
});

gulp.task('jsMain', function(cb) {
  pump([
    gulp.src(["_js/main.js", "_js/extra.js"]),
    uglify(),
    rename({suffix: ".min"}),
    gulp.dest("js")
  ], cb);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);

gulp.task('lib', ['jsLib', 'jsLibExtra']);
gulp.task('js', ['jsMain']);
