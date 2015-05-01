var paths = {
  scripts: ['src/javascripts/main.js'],
  styles:  ['src/sass/*.scss']
};

var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('build', function () {
  gulp.src(paths.scripts)
    .pipe(concat('flex.dropdown.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('compress', function() {
  gulp.src('dist/flex.dropdown.js')
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(concat('flex.dropdown.css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default',['build', 'compress', 'styles']);

gulp.task('watch', function() {
  gulp.watch(paths.scripts.concat(paths.styles), ['default']);
});
