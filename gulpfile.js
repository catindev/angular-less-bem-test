var log = require("util").log;
var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var angularTemplates = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');
var inline_image_path = require('gulp-inline-image-path');
var uglify = require('gulp-uglify');


gulp.task('html', function () {
    return gulp.src('components/**/*.html')
        .pipe(inline_image_path({path:"assets/images"}))
        .pipe(angularTemplates({
            module: 'sandbox',
            root: 'components/',
            filename: 'templates.js'
        }))
        .pipe(gulp.dest('./components/build'));
});

gulp.task('js', function() {
    return gulp.src([ 'components/build/templates.js', 'components/**/*.js' ])
        .pipe(concat('components.js'))
        //.pipe(uglify({mangle: false}))
        .pipe(gulp.dest('assets/'));
});

gulp.task('less', function() {
    return  gulp.src([ 'components/**/*.less' ])
    .pipe(concat('components.less'))
    .pipe(less()) 
    .pipe(minifyCSS({keepBreaks: false}))
    .pipe(gulp.dest('assets/'));
});

gulp.task('build', ['html', 'js', 'less']);

gulp.task('watch', ['build'], function() {
    gulp.watch([ 'components/**/*.html'], ['html']);
    gulp.watch([ 'components/build/templates.js', 'components/**/*.js' ], ['js']);
    gulp.watch([ 'components/**/*.less' ], ['less']);
});

gulp.task('default', ['watch']);