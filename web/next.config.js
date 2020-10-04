module.exports = {
  webpackDevMiddleware: (config) => {
    // Improve the file watching while running in a docker container.
    config.watchOptions.poll = 300;

    return config;
  },
};
