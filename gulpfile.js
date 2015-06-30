var gulp = require('gulp'),
    tasks = { },
    modules = [ 'graph', 'i18n', 'components', 'declaration', 'styles', 'vendors', 'index' ];

modules.forEach(function (task) {
    tasks[task] = require('./gulp_tasks/' + task + '.js')(gulp);
});

gulp.task('watch', [ 'index' ], function () {
    gulp.watch([ 
        'components/**/*.html', 
        'components/**/*.js', 
        'declaration/**/*.html', 
        'declaration/**/*.js', 
        'declaration/app.js',
        'declaration/**/en.json', 
        'components/**/en.json',
        'declaration/**/ru.json', 
        'components/**/ru.json',
        'declaration/**/kk.json', 
        'components/**/kk.json' 
        ], ['js']);
    gulp.watch([ 'components/**/*.less', 'declaration/**/*.less' ], ['styles']);
    gulp.watch([ 'components/index-template/template.html' ], ['index']);
});

gulp.task('default', ['watch']);