// https://github.com/Joel-Mercier/portfolio/blob/master/gulpfile.js
"use strict";

var gulp        = require("gulp"),
    browserSync = require("browser-sync").create(),
    sass        = require("gulp-sass"),
    cp          = require("child_process"),
    prefix      = require("gulp-autoprefixer");

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
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
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
  // gulp.watch(['_js/*.js'], ['js']);
  gulp.watch(['**/*.html', '_layouts/*.html', '_includes/*.html'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
