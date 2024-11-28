const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');

// Concat and minify CSS files
gulp.task('build-css', () => {
    return gulp.src('css/*.css').pipe(concat('styles.css')).pipe(cleanCss()).pipe(gulp.dest('dist'));
});

gulp.task('session-start', (cb) => {
    return gulp.series('build-css')(cb);
});

gulp.task('default', gulp.series('session-start'));
