module.exports = {
  client: {
    service: {
      name: "my-app",
      url: process.env.VUE_APP_API_PATH
    },
    includes: [
      "src/**/*.vue",
      "src/**/*.ts",
      "src/**/*.js",
    ]
  }
};
