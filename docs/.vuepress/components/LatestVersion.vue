<template>
</template>

<script setup>
import {onMounted} from 'vue'

const LATEST_VERSION_API_URL = "https://docs.javacord.org/rest/latest-version/release";
const SHIELDS_JAVACORD_URL = "https://shields.io/github/release/Javacord/Javacord"
const LATEST_VERSION_BADGE = `${SHIELDS_JAVACORD_URL}.svg?label=Latest%20Version&colorB=brightgreen&style=flat-square`;
let latestVersion = typeof window !== 'undefined' ? window.latestVersion : null
const latestVersionBadge = LATEST_VERSION_BADGE

onMounted(async () => {
  if (typeof window !== 'undefined') {
    if (window.latestVersion === undefined) {
      const shieldsResponse = await (await fetch(SHIELDS_JAVACORD_URL + ".json")).json();
      window.latestVersion = shieldsResponse.value.substring(1);
      latestVersion = shieldsResponse.value.substring(1);
    }
    replaceInDOM(document.body, /\$latest-version/g, latestVersion);
    replaceInDOM(document.body, /{{latestVersion}}/g, latestVersion);

    const latestSnapshotVersionResponse = await (await fetch("https://raw.githubusercontent.com/Javacord/Javacord/master/gradle.properties")).text();
    const latestSnapshotVersion = latestSnapshotVersionResponse.match("=.*-SNAPSHOT")[0].replace("=", "").trim();

    replaceInDOM(document.body, /\$latest-snapshot-version/g, latestSnapshotVersion);
  }
})

function replaceInDOM(node, pattern, replacement) {
  if (node.nodeType === 3) {
    node.data = node.data.replace(pattern, replacement);
  }
  if (node.nodeType === 1 && node.nodeName !== "SCRIPT") {
    for (const element of node.childNodes) {
      replaceInDOM(element, pattern, replacement);
    }
  }
}
</script>
