var angularTemplates = require('gulp-angular-templatecache');
var inline_image_path = require('gulp-inline-image-path');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

module.exports = function (gulp) {

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

    gulp.task('components', [ 'components_html', 'i18n' ], function() {
        return gulp.src([ 'assets/ctemplates.js', 'components/**/*.js' ])
            .pipe(concat('components.js'))
            //.pipe(uglify({mangle: false}))
            .pipe(gulp.dest('assets/'));
    });

};