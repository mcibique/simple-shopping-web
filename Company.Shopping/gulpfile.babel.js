'use strict';

import autoprefixer from 'gulp-autoprefixer';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import filesort from 'gulp-angular-filesort';
import gulp from 'gulp';
import minifyCSS from 'gulp-minify-css';
import ngAnnotate from 'gulp-ng-annotate';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import wrap from 'gulp-wrap-js';

/* paths */
const paths = {
  bower: {
    path: './bower_components',
    scripts: [
      'angular/angular.js',
      'angular/angular.min.js',
      'angular-i18n/angular-locale_en-gb.js',
      'angular-mocks/angular-mocks.js',
      'angular-ui-router/release/angular-ui-router.js',
      'angular-ui-router/release/angular-ui-router.min.js'
    ],
    content: [
      'normalize-scss/_normalize.scss'
    ]
  },
  vendor: {
    path: './scripts/vendor/',
    scripts: [
      'angular/angular.min.js',
      'angular-i18n/angular-locale_en-gb.js',
      'angular-ui-router/release/angular-ui-router.min.js'
    ]
  },
  content: {
    path: './content',
    styles: [
      '**/*.scss',
      '!vendor/*'
    ]
  },
  scripts: {
    path: './scripts',
    app: [
      '**/*.js',
      '!**/*-spec.js',
      '!vendor/**/*',
      '!**/*.dev.js',
      '!**/*.min.js'
    ]
  }
};

/* bower */
gulp.task('bower:styles', function () {
  return gulp.src(paths.bower.content, { base: paths.bower.path, cwd: paths.bower.path })
    .pipe(gulp.dest('./content/vendor/'));
});

gulp.task('bower:scripts', function () {
  return gulp.src(paths.bower.scripts, { base: paths.bower.path, cwd: paths.bower.path })
    .pipe(gulp.dest(paths.vendor.path));
});

gulp.task('bower', ['bower:scripts', 'bower:styles']);

/* build */
gulp.task('build:styles', function () {
  return gulp.src(paths.content.styles, { base: paths.content.path, cwd: paths.content.path })
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false,
      browsers: ['last 2 versions']
    }))
    .pipe(minifyCSS({
      keepSpecialComments: false
    }))
    .pipe(gulp.dest(paths.content.path));
});

gulp.task('build:vendor', function () {
  return gulp.src(paths.vendor.scripts, { base: paths.vendor.path, cwd: paths.vendor.path })
    .pipe(concat('vendor.min.js'))
    .pipe(uglify({
      output: {
        max_line_len: 1024
      },
      compress: {
        dead_code: true,
        drop_debugger: true,
        join_vars: true,
        drop_console: true
      }
    }))
    .pipe(gulp.dest(paths.scripts.path));
});

const wrapTemplate = '(function (window, document, angular) {%= body %})(window, document, window.angular);';

gulp.task('build:js', function () {
  return gulp.src(paths.scripts.app, { base: paths.scripts.path, cwd: paths.scripts.path })
    .pipe(babel())
    .pipe(filesort())
    .pipe(concat('app.min.js'))
    .pipe(wrap(wrapTemplate))
    .pipe(ngAnnotate())
    .pipe(uglify({
      output: {
        max_line_len: 1024
      },
      compress: {
        dead_code: true,
        drop_debugger: true,
        join_vars: true,
        drop_console: true
      }
    }))
    .pipe(gulp.dest(paths.scripts.path));
});

gulp.task('build', ['build:styles', 'build:vendor', 'build:js']);

/* watchers */
gulp.task('watch:js', function () {
  return gulp.src(paths.scripts.app, { base: paths.scripts.path, cwd: paths.scripts.path })
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(filesort())
    .pipe(concat('app.dev.js'))
    .pipe(wrap(wrapTemplate, {
      indent: {
        style: '  ',
        base: 2,
        adjustMultilineComment: false
      },
      newline: '\r\n',
      space: ' '
    }))
    .pipe(sourcemaps.write('.', {
      sourceRoot: paths.scripts.path
    }))
    .pipe(gulp.dest(paths.scripts.path));
});

gulp.task('watch:styles', function () {
  return gulp.src(paths.content.styles, { base: paths.content.path, cwd: paths.content.path })
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false,
      browsers: ['last 2 versions']
    }))
    .pipe(sourcemaps.write('.', {
      sourceRoot: paths.content.path
    }))
    .pipe(gulp.dest(paths.content.path));
});

gulp.task('watch', ['watch:js', 'watch:styles'], function () {
  gulp.watch(paths.scripts.app, { interval: 200, cwd: paths.scripts.path }, ['watch:js']);
  gulp.watch(paths.content.styles, { interval: 1000, cwd: paths.content.path }, ['watch:styles']);
});

/* tests */
var Server = require('karma').Server;
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});
