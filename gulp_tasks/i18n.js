var wrap = require('gulp-wrap');
var extend = require('gulp-extend');

module.exports = function (gulp) {

    /* i18n constants */
    gulp.task('locale-en', function() {
        return gulp.src([ 'declaration/**/en.json', 'components/**/en.json' ])
            .pipe(extend('i18n.en.js'))
            .pipe(wrap('angular.module(\'egov.ui.i18n\').constant(\'i18n_en\',<%= contents %>);'))
            .pipe(gulp.dest('components/locale/'));
    });

    gulp.task('locale-ru', function() {
        return  gulp.src([ 'declaration/**/ru.json', 'components/**/ru.json' ])
            .pipe(extend('i18n.ru.js'))
            .pipe(wrap('angular.module(\'egov.ui.i18n\').constant(\'i18n_ru\',<%= contents %>);'))
            .pipe(gulp.dest('components/locale/'));
    });

    gulp.task('locale-kk', function() {
        return gulp.src([ 'declaration/**/kk.json', 'components/**/kk.json' ])
            .pipe(extend('i18n.kk.js'))
            .pipe(wrap('angular.module(\'egov.ui.i18n\').constant(\'i18n_kk\',<%= contents %>);'))
            .pipe(gulp.dest('components/locale/'));
    });

    gulp.task('i18n', [ 'locale-en', 'locale-ru', 'locale-kk' ]);

};