import webpack from 'webpack';
import colors from 'colors';
import webpackConfig from '../../webpack.config.prod';


process.env.NODE_ENV = 'production';

console.log('Generating minified prod version...'.blue);

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    console.log(err.bold.red);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(error.red));
  }

  if (jsonStats.hasWarnings) {
    jsonStats.warnings.map(warning => console.log(warning.yellow));
  }

  console.log('Webpack stats: ' + stats);

  console.log('Compiled!'.green);

  return 0;
});
