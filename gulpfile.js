let gulp        = require('gulp');
let browserSync = require('browser-sync').create();
let sass        = require('gulp-sass');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'nuXpert/frontend/style/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("nuXpert/frontend/style"))
        .pipe(browserSync.stream());
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("nuXpert/frontend/js"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {
  browserSync.init({
    server: "./nuXpert/frontend/"
  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'nuXpert/frontend/style/*.scss'], gulp.series('sass'));
  gulp.watch("nuXpert/frontend/*.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.parallel('js', 'serve'));
