const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');

// Concat and minify CSS files
gulp.task('build-css', () => {
    return gulp.src('css/*.css').pipe(concat('styles.css')).pipe(cleanCss()).pipe(gulp.dest('dist'));
});

gulp.task('generate-service-worker', function (callback) {
    var swPrecache = require('sw-precache');
    var rootDir = './';

    swPrecache.write(
        `${rootDir}/service-worker.js`,
        {
            staticFileGlobs: [
                rootDir + '/images/**/*.{png,jpg,gif,svg,webp}',
                rootDir + '/webfonts/**/*.{svg,eot,ttf,woff,woff2}',
            ],
            stripPrefix: rootDir,
        },
        callback
    );
});

gulp.task('session-start', (cb) => {
    return gulp.series('build-css', 'generate-service-worker')(cb);
});

gulp.task('default', gulp.series('session-start'));
