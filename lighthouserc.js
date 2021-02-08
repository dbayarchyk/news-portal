const BASE_URL = process.env.BASE_URL || "http://itdog.de";

module.exports = {
  ci: {
    collect: {
      url: [
        "/",
        // "/salaries",
        // "/salaries/share",
        // "/about",
        // "/sign-in",
      ].map(url => `${BASE_URL}${url}`)
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
