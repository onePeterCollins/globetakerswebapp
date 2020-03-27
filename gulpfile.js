// imports
let gulp = require('gulp');
let glog = require('gulp-logger')
let grun = require('gulp-run')

// sources and paths
let manifestSrc = ['.src/manifest.json'];
let dist = ['./dist'];

// tasks
gulp.task('npm run build', function() {
    console.log('> vue-cli-service build')

    return gulp.src('./')
    .pipe(grun('npm run build'))
});

gulp.task('replace', function() {
    return gulp.src('./src/manifest.json')
    .pipe(glog({
        before: '* copying ' + `${manifestSrc}` + ' to ' + `${dist}`,
        after: '* copied ' + `${manifestSrc}` + ' to ' + `${dist}` + ' successfully.',
        showChange: true
    }))
    .pipe(gulp.dest('./dist'))
});

gulp.task('build', gulp.series('npm run build','replace'));

gulp.task('default', gulp.parallel('build'));
