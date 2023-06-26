// -------------------------------------
// Plugins
// -------------------------------------

// const gulp = require("gulp");
const { gulp, src, dest, parallel, series } = require("gulp");
const concat = require("gulp-concat");

// -------------------------------------
// Options
// -------------------------------------

var options = {
  // ----- SCSS ----- //
  scss: {
    paths: ["./node_modules/", ".scss/"],
    file: "_src/scss/app.scss",
    files: "_src/scss/**/*.scss",
    destination: "css",
  },

  // ----- CSS ----- //
  css: {
    file: "css/app.css",
    destination: "css",
  },

  // ----- JS ----- //
  js: {
    lib: {
      files: [
        "node_modules/imagesloaded/imagesloaded.pkgd.min.js",
        "node_modules/masonry-layout/dist/masonry.pkgd.min.js",
      ],
    },
    files: "_src/js/*.js",
    file: "js/app.js",
    destination: "js",
  },
};

function jsLib() {
  return src(options.js.lib.files)
    .pipe(concat("lib.min.js"))
    .pipe(dest(options.js.destination));
}

exports.default = parallel(jsLib);
