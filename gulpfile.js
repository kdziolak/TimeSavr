var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var htmlReplace = require('gulp-html-replace');
var htmlMin = require('gulp-htmlmin');
var del = require('del');
var sequence = require('run-sequence');
var babel = require('gulp-babel')
var core = require('babel-core')

gulp.task('reload', function () {
    browserSync.reload();
})

gulp.task('css', function () {
    return gulp.src('src/css/**/*.css')
        .pipe(concat('style.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'))
})

gulp.task('js', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./src/js'));
})

gulp.task('sass', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 version']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.stream());
})

gulp.task('img', function () {
    return gulp.src('./src/img/**/*.{jpg,jpeg,png,gif}')
        .pipe(changed('dist/img'))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
})

gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(htmlReplace({
            'css': 'css/style.css',
            'js': 'js/script.js'
        }))
        .pipe(htmlMin({
            sortAttributes: true,
            sortClassName: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist/'))
})

gulp.task('serve', ['sass'], function () {
    browserSync({
        server: 'src'
    })

    gulp.watch('./src/scss/**/**/*.scss', ['sass']);
    gulp.watch('src/*.html', ['reload']);

})

gulp.task('clean', function () {
    return del(['dist']);
})

gulp.task('build', function () {
    sequence('clean', ['html', 'js', 'css', 'img']);
})

gulp.task('default', ['serve']);
