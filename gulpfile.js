// *************************************
//
// Gulpfile
// (cf. https://github.com/drewbarontini/noise/blob/master/gulpfile.js)
//
// *************************************
//
// Available tasks:
//  'gulp'
//  'gulp watch'
//  'gulp compile:scss'
//  'gulp minify:css'
//
// *************************************


"use strict";


// -------------------------------------
// Plugins
// -------------------------------------

const gulp            = require("gulp");
const autoprefixer    = require("gulp-autoprefixer");
const sass            = require("gulp-sass");
const cleanCSS        = require("clean-css");
const map             = require("vinyl-map");
const rename          = require("gulp-rename");
const plumberNotifier = require("gulp-plumber-notifier");
const concat          = require("gulp-concat");


// -------------------------------------
// Options
// -------------------------------------

var options = {

  // ----- Default ----- //
  default: {
    tasks: ['compile:scss']
  },

  // ----- SCSS ----- //
  scss: {
    paths       : ['./node_modules/', '.scss/'],
    file        : '_src/scss/app.scss',
    files       : '_src/scss/**/*.scss',
    destination : 'css'
  },

  // ----- CSS ----- //
  css: {
    file        : 'css/app.css',
    destination : 'css'
  },

  // ----- JS ----- //
  js: {
    lib: {
      files: [
        'node_modules/imagesloaded/imagesloaded.pkgd.min.js',
        'node_modules/masonry-layout/dist/masonry.pkgd.min.js'
      ]
    },
    files: '_src/js/**/*.js',
    destination: 'js'
  },

  // ----- Watch ----- //
  watch: {
    files: function () {
      return [
        options.scss.files
      ]
    },
    run: function () {
      return [
        ['compile:scss']
      ]
    }
  }
};


// -------------------------------------
// Task : default
// -------------------------------------

gulp.task( 'default', options.default.tasks );


// -------------------------------------
// Task: compile:scss
// -------------------------------------

gulp.task( 'compile:scss', function () {
  gulp.src( options.scss.files )
    .pipe( plumberNotifier() )
    .pipe( sass({
      includePaths: options.scss.paths,
      outputStyle: 'compact'
    }) )
    .pipe( autoprefixer({
      browsers: [ 'last 2 versions' ],
      cascade: true
    }) )
    .pipe( gulp.dest(options.scss.destination) )
});


// -------------------------------------
// Task : minify:css
// -------------------------------------

gulp.task( 'minify:css', function () {
  var minify = map( function (buff, filename) {
    return new cleanCSS({
      keepBreaks: false
    }).minify( buff.toString() ).styles
  });

  return gulp.src( options.css.file )
    .pipe( minify )
    .pipe( rename({ suffix: '.min' }) )
    .pipe( gulp.dest(options.css.destination) )
});


// -------------------------------------
// Task : compile:jsLib
// -------------------------------------

gulp.task( 'compile:jsLib', function () {
  gulp.src( options.js.lib.files )
    .pipe(concat("lib.min.js"))
    .pipe( gulp.dest( options.js.destination ))
});


// -------------------------------------
// Task : compile:js
// -------------------------------------

gulp.task( 'compile:js', function () {
  gulp.src( options.js.files )
    .pipe(concat("app.js"))
    .pipe( gulp.dest( options.js.destination ))
});


// -------------------------------------
// Task : watch
// -------------------------------------

gulp.task('watch', function() {
  var watchFiles = options.watch.files();
  watchFiles.forEach( function( files, index ) {
    gulp.watch( files, options.watch.run()[ index ]  );
  });
});
