var gulp = require('gulp');
var connect = require('gulp-connect');
var babel = require('gulp-babel');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');

gulp.task('html', function() {
  gulp.src('*.html')
  .pipe(connect.reload());
});

gulp.task('js', function() {
  browserify('./app/app.js', {debug: true})
  .transform(babelify)
  .bundle()
  .on('error', function(err) { console.error(err); this.emit('end'); })
  .pipe(source('app.js'))
  .pipe(gulp.dest('./dist/'))
  .pipe(connect.reload());
});

gulp.task('sass', function() {
  gulp.src('./app/assets/scss/app.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./dist'))
  .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(['*.html'], ['html']);
  gulp.watch(['./app/*.js'], ['js']);
  gulp.watch(['./app/**/*.scss'], ['sass']);
});

gulp.task('build', ['js', 'sass']);

gulp.task('connect', function() {
  connect.server({
    root: [__dirname],
    livereload: true
  });
});

gulp.task('default', ['build', 'connect', 'watch']);

