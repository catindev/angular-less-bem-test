var log = require("util").log;
var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var angularTemplates = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');
var inline_image_path = require('gulp-inline-image-path');
var uglify = require('gulp-uglify');

gulp.task('declaration_html', function () {
    return gulp.src([ 'declaration/**/*.html' ])
        .pipe(inline_image_path({ path: "assets/images" }))
        .pipe(angularTemplates({
            module: 'declaration',
            root: 'declaration/',
            filename: 'dtemplates.js'
        }))
        .pipe(gulp.dest('assets/'));
});

gulp.task('declaration', [ 'declaration_html' ], function() {
    return gulp.src([ 'assets/dtemplates.js', 'declaration/**/*.js' ])
        .pipe(concat('declaration.js'))
        //.pipe(uglify({mangle: false}))
        .pipe(gulp.dest('assets/'));
});

gulp.task('components_html', function () {
    return gulp.src([ 'components/**/*.html' ])
        .pipe(inline_image_path({ path: "assets/images" }))
        .pipe(angularTemplates({
            module: 'declaration',
            root: 'components/',
            filename: 'ctemplates.js'
        }))
        .pipe(gulp.dest('assets/'));
});

gulp.task('components', [ 'components_html' ], function() {
    return gulp.src([ 'assets/ctemplates.js', 'components/**/*.js' ])
        .pipe(concat('components.js'))
        //.pipe(uglify({mangle: false}))
        .pipe(gulp.dest('assets/'));
});

gulp.task('js', [ 'components', 'declaration' ], function() {
    return gulp.src([ 'declaration/app.js', 'assets/declaration.js', 'assets/components.js' ])
        .pipe(concat('build.js'))
        //.pipe(uglify({mangle: false}))
        .pipe(gulp.dest('assets/'));
});

gulp.task('less', function() {
    return  gulp.src([ 'components/**/*.less', 'declaration/**/*.less' ])
    .pipe(concat('build.less'))
    .pipe(less()) 
    .pipe(minifyCSS({keepBreaks: false}))
    .pipe(gulp.dest('assets/'));
});

gulp.task('build', [ 'js', 'less' ]);

gulp.task('watch', ['build'], function() {
    gulp.watch([ 'components/**/*.html', 'components/**/*.js' ], ['components']);
    gulp.watch([ 'declaration/**/*.html', 'declaration/**/*.js' ], ['declaration']);
    gulp.watch([ 'declaration/app.js', 'assets/components.js', 'assets/declaration.js' ], ['js']);
    gulp.watch([ 'components/**/*.less', 'declaration/**/*.less' ], ['less']);
});

gulp.task('default', ['watch']);