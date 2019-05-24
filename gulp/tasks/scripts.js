const plumber = require("gulp-plumber");
const concat = require("gulp-concat");
const jsmin = require("gulp-jsmin");
const gulpif = require("gulp-if");
const webpack = require("webpack-stream");

scriptsPath = {
  input: "./assets/static/js/index.js",
  ouput: "./build/js/"
};

const webpackConf = {
  mode: $.production ? "production" : "development",
  devtool: $.production ? "none" : "source-map",
  output: {
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/"
      }
    ]
  }
};

module.exports = function() {
  $.gulp.task("js", function() {
    return $.gulp
      .src(scriptsPath.input)
      .pipe(webpack(webpackConf))
      .pipe($.gulp.dest(scriptsPath.ouput))
      .on("end", $.browserSync.reload);
  });
};
