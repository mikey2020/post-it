import coveralls from 'gulp-coveralls';
import istanbul from 'gulp-istanbul';
import gulp from 'gulp';
import mocha from 'gulp-mocha';
import babel from 'gulp-babel';
import path from 'path';

/*gulp.task('coveralls', ['test'], function() {
    // lcov.info is the file which has the coverage information we wan't to upload
    return gulp.src(__dirname + '/coverage/lcov.info')
      .pipe(coveralls());
});*/

gulp.task('transpile', () =>
  gulp.src(['server/test/**/*.js', '!server/dist/**'])
    .pipe(babel())
    .pipe(gulp.dest('server/dist'))
);

gulp.task('pre-test', () =>
  gulp.src(['server/dist/**/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
);

gulp.task('test', ['pre-test'], () =>
  gulp.src([path.join('server', 'dist')])
    .pipe(mocha())
    .pipe(istanbul.writeReports())
);

gulp.task('coverage', ['test'], () => {
  gulp.src('coverage/**/lcov.info')
    .pipe(coveralls())
    .pipe(exit());
});


