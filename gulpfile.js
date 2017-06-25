import coveralls from 'gulp-coveralls';

import gulp from 'gulp';


gulp.src('test/coverage/**/lcov.info')
  .pipe(coveralls());