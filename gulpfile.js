var log = require("util").log;
var fs = require('fs');
var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var angularTemplates = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');
var inline_image_path = require('gulp-inline-image-path');
var uglify = require('gulp-uglify');
var lib = require('bower-files')();
var dformat = require('dateformat');
var pinfo = require('./package.json');


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

gulp.task('vendors-js', function(){
    return gulp.src(lib.ext('js').files)
        .pipe(concat('vendors.js'))
        //.pipe(uglify({mangle: false}))
        .pipe(gulp.dest('assets/'));
});

gulp.task('vendors-css', function(){
    var v = lib.ext('css').files
    v.push( __dirname + '/declaration/style.css');
    v.push( __dirname + '/assets/fonts/fonts.css');
    return gulp.src(v)
        .pipe(concat('vendors.css'))
        .pipe(minifyCSS({keepBreaks: false}))        
        .pipe(gulp.dest('assets/'));
});

gulp.task('less', function() {
    return  gulp.src([ 'components/**/*.less', 'declaration/**/*.less' ])
    .pipe(concat('build.less'))
    .pipe(less()) 
    .pipe(autoprefixer('last 10 versions', 'ie 9'))  
    .pipe(minifyCSS({keepBreaks: false}))
    .pipe(gulp.dest('assets/'));
});

gulp.task('build', [ 'vendors-js', 'vendors-css', 'js', 'less' ], function(){
    var d = new Date();
    var prefix = "?v=" + d.getTime();
    var css = [ 'vendors', 'build' ];
    var js  = [ 'vendors', 'build' ];

    return fs.readFile('./components/index.tpl', 'utf8', function (err,data) {
        if (err) return console.log(err); var cssTpl = '\n', jsTpl = '\n';
        for(var file in css) cssTpl+= '<link rel="stylesheet" type="text/css" href="assets/'+ css[file] +'.css' + prefix + '">' + '\n';
        for(var file in js) jsTpl+= '<script src="assets/'+ js[file] +'.js' + prefix + '"></script>' + '\n';

        var result = data.replace("<build/>",  dformat(d, "dd.mm HH:MM"))
            .replace("<app/>", pinfo.name)
            .replace("<version/>", pinfo.version)
            .replace("<css/>", cssTpl)
            .replace("<javascript/>", jsTpl);

        fs.writeFile('./index.html', result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
});

gulp.task('watch', ['build'], function() {
    gulp.watch([ 'components/**/*.html', 'components/**/*.js' ], ['components']);
    gulp.watch([ 'declaration/**/*.html', 'declaration/**/*.js' ], ['declaration']);
    gulp.watch([ 'declaration/app.js', 'assets/components.js', 'assets/declaration.js' ], ['js']);
    gulp.watch([ 'components/**/*.less', 'declaration/**/*.less' ], ['less']);
});

gulp.task('default', ['watch']);