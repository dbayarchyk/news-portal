module.exports = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss")("./tailwind/tailwind.config.js"),
  ],
};
