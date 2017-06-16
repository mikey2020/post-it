
export default (env) => {
	return require(`./webpack.config.${env}.js`);
}
