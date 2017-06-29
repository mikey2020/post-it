import coveralls from 'gulp-coveralls';
import istanbul from 'gulp-istanbul';
import gulp from 'gulp';
import mocha from 'gulp-mocha';
import babel from 'gulp-babel';
import path from 'path';

/* gulp.task('coveralls', ['test'], function() {
    // lcov.info is the file which has the coverage information we wan't to upload
    return gulp.src(__dirname + '/coverage/lcov.info')
      .pipe(coveralls());
});*/

gulp.task('transpile', () =>
  gulp.src(['server/test/**/*.js', '!server/dist/**'])
    .pipe(babel({
            presets: ['es2015']
        }))
    .pipe(gulp.dest('server/dist'))
);

gulp.task('pre-test', () => {
    // This tells gulp which files you want to pipe
    // In our case we want to pipe every `.js` file inside any folders inside `test`
     gulp.src('server/dist/**/*.js')
      .pipe(istanbul())
      // This overwrites `require` so it returns covered files
      .pipe(istanbul.hookRequire())

});

gulp.task('test', ['pre-test'], () => {
    // Here we're piping our `.js` files inside the `lib` folder
  gulp.src(path.join('server', 'test','routesTest.js'))
        // You can change the reporter if you want, try using `nyan`
        .pipe(mocha())
        // Here we will create report files using the test's results
        .pipe(istanbul.writeReports());
});

gulp.task('coveralls', ['test'], () => {
    // If not running on a CI environment it won't send lcov.info to coveralls
  if (!process.env.CI) {
    return;
  }

  return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
      .pipe(coveralls());
});
