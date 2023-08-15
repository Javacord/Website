import{_ as r,r as o,o as d,c as g,b as a,w as t,a as n,d as s}from"./app.151ccb98.js";const k={},m=n("h1",{id:"download-installation",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#download-installation","aria-hidden":"true"},"#"),s(" Download / Installation")],-1),v=s("The recommended way to get Javacord is to use a build manager, like Gradle or Maven."),_=n("br",null,null,-1),h=s(" If you are not familiar with build managers, you can follow one of the beginner ide setup guides (see navigation) or download Javacord directly from "),b={href:"https://github.com/Javacord/Javacord/releases/latest",target:"_blank",rel:"noopener noreferrer"},f=s("GitHub"),y=s("."),x=n("h2",{id:"javacord-dependency",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#javacord-dependency","aria-hidden":"true"},"#"),s(" \u{1F4E6} Javacord Dependency")],-1),j=n("div",{class:"language-groovy ext-groovy line-numbers-mode"},[n("pre",{class:"language-groovy"},[n("code",null,[s("repositories "),n("span",{class:"token punctuation"},"{"),s(),n("span",{class:"token function"},"mavenCentral"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"}"),s(`
dependencies `),n("span",{class:"token punctuation"},"{"),s(" implementation "),n("span",{class:"token string"},"'org.javacord:javacord:$latest-version'"),s(),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),I=n("div",{class:"language-xml ext-xml line-numbers-mode"},[n("pre",{class:"language-xml"},[n("code",null,[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("dependency")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("groupId")]),n("span",{class:"token punctuation"},">")]),s("org.javacord"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("groupId")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("artifactId")]),n("span",{class:"token punctuation"},">")]),s("javacord"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("artifactId")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("version")]),n("span",{class:"token punctuation"},">")]),s("$latest-version"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("version")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("type")]),n("span",{class:"token punctuation"},">")]),s("pom"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("type")]),n("span",{class:"token punctuation"},">")]),s(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("dependency")]),n("span",{class:"token punctuation"},">")]),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),w=n("div",{class:"language-scala ext-scala line-numbers-mode"},[n("pre",{class:"language-scala"},[n("code",null,[s("libraryDependencies "),n("span",{class:"token operator"},"++"),n("span",{class:"token operator"},"="),s(" Seq"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"org.javacord"'),s(),n("span",{class:"token operator"},"%"),s(),n("span",{class:"token string"},'"javacord"'),s(),n("span",{class:"token operator"},"%"),s(),n("span",{class:"token string"},'"$latest-version"'),n("span",{class:"token punctuation"},")"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"})])],-1),C={class:"custom-container details"},G=n("summary",null,"Click to view snapshot repositories",-1),L=s("Snapshots are automatically deployed from the "),J={href:"https://github.com/Javacord/Javacord/tree/development",target:"_blank",rel:"noopener noreferrer"},D=s("development"),S=s(" branch."),$=n("div",{class:"language-groovy ext-groovy line-numbers-mode"},[n("pre",{class:"language-groovy"},[n("code",null,[s("repositories "),n("span",{class:"token punctuation"},"{"),s(`
    maven `),n("span",{class:"token punctuation"},"{"),s(`
        url `),n("span",{class:"token interpolation-string"},[n("span",{class:"token string"},'"https://oss.sonatype.org/content/repositories/snapshots/"')]),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
dependencies `),n("span",{class:"token punctuation"},"{"),s(`
    implementation `),n("span",{class:"token string"},"'org.javacord:javacord:$latest-snapshot-version'"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),V=n("div",{class:"language-xml ext-xml line-numbers-mode"},[n("pre",{class:"language-xml"},[n("code",null,[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("repository")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("id")]),n("span",{class:"token punctuation"},">")]),s("snapshots-repo"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("id")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("url")]),n("span",{class:"token punctuation"},">")]),s("https://oss.sonatype.org/content/repositories/snapshots/"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("url")]),n("span",{class:"token punctuation"},">")]),s(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("repository")]),n("span",{class:"token punctuation"},">")]),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),M=n("div",{class:"language-xml ext-xml line-numbers-mode"},[n("pre",{class:"language-xml"},[n("code",null,[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("dependency")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("groupId")]),n("span",{class:"token punctuation"},">")]),s("org.javacord"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("groupId")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("artifactId")]),n("span",{class:"token punctuation"},">")]),s("javacord"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("artifactId")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("version")]),n("span",{class:"token punctuation"},">")]),s("$latest-snapshot-version"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("version")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("type")]),n("span",{class:"token punctuation"},">")]),s("pom"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("type")]),n("span",{class:"token punctuation"},">")]),s(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("dependency")]),n("span",{class:"token punctuation"},">")]),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),O=n("div",{class:"language-scala ext-scala line-numbers-mode"},[n("pre",{class:"language-scala"},[n("code",null,[s("resolvers "),n("span",{class:"token operator"},"+="),s(),n("span",{class:"token string"},'"snapshots-repo"'),s(" at "),n("span",{class:"token string"},'"https://oss.sonatype.org/content/repositories/snapshots/"'),s(`
libraryDependencies `),n("span",{class:"token operator"},"++"),n("span",{class:"token operator"},"="),s(" Seq"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"org.javacord"'),s(),n("span",{class:"token operator"},"%"),s(),n("span",{class:"token string"},'"javacord"'),s(),n("span",{class:"token operator"},"%"),s(),n("span",{class:"token string"},'"$latest-snapshot-version"'),n("span",{class:"token punctuation"},")"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),q=n("h2",{id:"optional-logger-dependency",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#optional-logger-dependency","aria-hidden":"true"},"#"),s(" \u{1F4DD} Optional Logger Dependency")],-1),B=n("p",null,"In addition to Javacord, it is also recommended to install a Log4j-2-compatible logging framework. A logging framework can be used to provide a more sophisticated logging experience with being able to configure log format, log targets (console, file, database, Discord direct message, ...), log levels per class, and much more.",-1),E=n("p",null,"For example, Log4j Core:",-1),N=n("div",{class:"language-groovy ext-groovy line-numbers-mode"},[n("pre",{class:"language-groovy"},[n("code",null,[s("dependencies "),n("span",{class:"token punctuation"},"{"),s(" runtimeOnly "),n("span",{class:"token string"},"'org.apache.logging.log4j:log4j-core:2.17.0'"),s(),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"})])],-1),T=n("div",{class:"language-xml ext-xml line-numbers-mode"},[n("pre",{class:"language-xml"},[n("code",null,[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("dependency")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("groupId")]),n("span",{class:"token punctuation"},">")]),s("org.apache.logging.log4j"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("groupId")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("artifactId")]),n("span",{class:"token punctuation"},">")]),s("log4j-core"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("artifactId")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("version")]),n("span",{class:"token punctuation"},">")]),s("2.17.0"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("version")]),n("span",{class:"token punctuation"},">")]),s(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("dependency")]),n("span",{class:"token punctuation"},">")]),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),R=n("div",{class:"language-scala ext-scala line-numbers-mode"},[n("pre",{class:"language-scala"},[n("code",null,[s("libraryDependencies "),n("span",{class:"token operator"},"++"),n("span",{class:"token operator"},"="),s(" Seq"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"org.apache.logging.log4j"'),s(),n("span",{class:"token operator"},"%"),s(),n("span",{class:"token string"},'"log4j-core"'),s(),n("span",{class:"token operator"},"%"),s(),n("span",{class:"token string"},'"2.17.0"'),n("span",{class:"token punctuation"},")"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"})])],-1),A=s("Take a look at the "),F=s("logger configuration"),H=s(" wiki article for further information.");function z(K,P){const i=o("LatestVersion"),p=o("ClientOnly"),c=o("ExternalLinkIcon"),e=o("CodeGroupItem"),l=o("CodeGroup"),u=o("RouterLink");return d(),g("div",null,[m,a(p,null,{default:t(()=>[a(i)]),_:1}),n("p",null,[v,_,h,n("a",b,[f,a(c)]),y]),x,a(l,null,{default:t(()=>[a(e,{title:"Gradle",active:""},{default:t(()=>[j]),_:1}),a(e,{title:"Maven"},{default:t(()=>[I]),_:1}),a(e,{title:"Sbt"},{default:t(()=>[w]),_:1})]),_:1}),n("details",C,[G,n("p",null,[L,n("a",J,[D,a(c)]),S]),a(l,null,{default:t(()=>[a(e,{title:"Gradle",active:""},{default:t(()=>[$]),_:1}),a(e,{title:"Maven"},{default:t(()=>[V,M]),_:1}),a(e,{title:"Sbt"},{default:t(()=>[O]),_:1})]),_:1})]),q,B,E,a(l,null,{default:t(()=>[a(e,{title:"Gradle",active:""},{default:t(()=>[N]),_:1}),a(e,{title:"Maven"},{default:t(()=>[T]),_:1}),a(e,{title:"Sbt"},{default:t(()=>[R]),_:1})]),_:1}),n("p",null,[A,a(u,{to:"/wiki/basic-tutorials/logger-config/"},{default:t(()=>[F]),_:1}),H])])}var U=r(k,[["render",z],["__file","download-installation.html.vue"]]);export{U as default};
