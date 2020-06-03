<template>
    <div v-if="latestVersion == null" class="custom-block warning">
        <p class="custom-block-title">IMPORTANT</p>
        <div>
            <p>
                Replace <code>$latest-version</code> with the latest version.<br/>
                You can see the latest version in the image below (but remove the <code>v</code> prefix!).
            </p>
            <img alt="Latest version" :src="latestVersionBadge"/>
            <br/>
            <br/>
        </div>
    </div>
</template>

<script>
    const LATEST_VERSION_API_URL = "https://docs.javacord.org/rest/latest-version/release";
    const LATEST_VERSION_BADGE = "https://shields.javacord.org/github/release/Javacord/Javacord.svg?label=Latest%20Version&colorB=brightgreen&style=flat-square";

    module.exports = {
        data: function() {
            return {
                latestVersion: window.latestVersion,
                latestVersionBadge: LATEST_VERSION_BADGE
            }
        },

        mounted: async function() {
            // We also fetch the latest version in the enhanceApp.js file
            if (window.latestVersion === undefined) {
                const response = await (await fetch(LATEST_VERSION_API_URL)).json();
                window.latestVersion = response.version;
            }
            this.latestVersion = window.latestVersion;
            replaceInDOM(document.body, /\$latest-version/g, this.latestVersion);
        }
    }

    function replaceInDOM(node, pattern, replacement) {
        if (node.nodeType === 3) {
            node.data = node.data.replace(pattern, replacement);
        }
        if (node.nodeType === 1 && node.nodeName !== "SCRIPT") {
            for (let i = 0; i < node.childNodes.length; i++) {
                replaceInDOM(node.childNodes[i], pattern, replacement);
            }
        }
    }
</script>