import coveralls from 'gulp-coveralls';

import gulp from 'gulp';

gulp.task('coverage', ['test'], () => {
  gulp.src('coverage/**/lcov.info')
    .pipe(coveralls())
    .pipe(exit());
});