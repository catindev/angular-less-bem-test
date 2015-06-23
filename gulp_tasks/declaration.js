var angularTemplates = require('gulp-angular-templatecache');
var inline_image_path = require('gulp-inline-image-path');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

module.exports = function (gulp) {

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

    gulp.task('declaration', [ 'components', 'declaration_html' ], function () {
        return gulp.src([ 'assets/dtemplates.js', 'declaration/**/*.js' ])
            .pipe(concat('declaration.js'))
            //.pipe(uglify({mangle: false}))
            .pipe(gulp.dest('assets/'));
    });

    gulp.task('js', [ 'declaration' ], function () {
        return gulp.src([ 'declaration/app.js', 'assets/declaration.js', 'assets/components.js' ])
            .pipe(concat('build.js'))
            //.pipe(uglify({mangle: false}))
            .pipe(gulp.dest('assets/'));
    });    

};