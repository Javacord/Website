require("katex/dist/katex.min.css");
require("katex/dist/katex.min.js");

export const LATEST_VERSION_API_URL = "https://docs.javacord.org/rest/latest-version/release";

// Used by the LatestVersionInfoVue component
fetch(LATEST_VERSION_API_URL)
    .then(response => response.json())
    .then(response => window.latestVersion = response.version);
