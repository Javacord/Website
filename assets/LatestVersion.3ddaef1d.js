import{_ as r,R as c}from"./app.151ccb98.js";const d={__name:"LatestVersion",setup(l){const n="https://shields.io/github/release/Javacord/Javacord";let a=typeof window!="undefined"?window.latestVersion:null;c(async()=>{if(typeof window!="undefined"){if(window.latestVersion===void 0){const s=await(await fetch(n+".json")).json();window.latestVersion=s.value.substring(1),a=s.value.substring(1)}o(document.body,/\$latest-version/g,a),o(document.body,/{{latestVersion}}/g,a);const t=(await(await fetch("https://raw.githubusercontent.com/Javacord/Javacord/master/gradle.properties")).text()).match("=.*-SNAPSHOT")[0].replace("=","").trim();o(document.body,/\$latest-snapshot-version/g,t)}});function o(e,t,s){if(e.nodeType===3&&(e.data=e.data.replace(t,s)),e.nodeType===1&&e.nodeName!=="SCRIPT")for(const i of e.childNodes)o(i,t,s)}return(e,t)=>null}};var u=r(d,[["__file","LatestVersion.vue"]]);export{u as default};