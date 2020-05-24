# Download / Installation

The recommended way to get Javacord is to use a build manager, like Gradle or Maven.  
If you are not familiar with build managers, you can follow one of the beginner ide setup guides (see navigation) or download Javacord directly from [GitHub](https://github.com/Javacord/Javacord/releases/latest).

## :package: Javacord Dependency

<script>
function replaceInDOM(node, pattern, replacement) {
  if (node.nodeType === 3) {
    node.data = node.data.replace(pattern, replacement);
  }
  if (node.nodeType === 1 && node.nodeName !== "SCRIPT") {
    for (var i = 0; i < node.childNodes.length; i++) {
      replaceInDOM(node.childNodes[i], pattern, replacement);
    }
  }
}
  
export default {
  data() {
    return {
      latestVersion: null
    }
  },

  async mounted () {
    const response = await (await fetch("https://docs.javacord.org/rest/latest-version/release")).json();
    this.latestVersion = response.version;
    replaceInDOM(document.body, /\$latest-version/g, this.latestVersion);
  }
}
</script>

<template>
  <div v-if="latestVersion == null">
    <span>
      Replace <code>$latest-version</code> with the latest version.<br/>
      You can see the latest version in the image below (without the <code>v</code>!)<br/><br/>
    </span>
    <img alt="Latest version" src="https://shields.javacord.org/github/release/Javacord/Javacord.svg?label=Latest%20Version&colorB=brightgreen&style=flat-square"/>
  </div>
</template>

### Gradle

```groovy
repositories { mavenCentral() }
dependencies { implementation 'org.javacord:javacord:$latest-version' }
```

### Maven

```
<dependency>
    <groupId>org.javacord</groupId>
    <artifactId>javacord</artifactId>
    <version>$latest-version</version>
    <type>pom</type>
</dependency>
```

### Sbt

```scala
libraryDependencies ++= Seq("org.javacord" % "javacord" % "$latest-version")
```

## :memo: Optional Logger Dependency

In addition to Javacord, it is also recommended to install a Log4j-2-compatible logging framework.
A logging framework can be used to provide a more sophisticated logging experience with being able to configure log format, log targets (console, file, database, Discord direct message, ...), log levels per class, and much more.

For example, Log4j Core:

### Gradle

```groovy
dependencies { runtimeOnly 'org.apache.logging.log4j:log4j-core:2.11.0' }
```

### Maven

```xml
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-core</artifactId>
    <version>2.11.0</version>
</dependency>
```

### Sbt

```scala
libraryDependencies ++= Seq("org.apache.logging.log4j" % "log4j-core" % "2.11.0")
```

Take a look at the [logger configuration](/wiki/basic-tutorials/logger-config/) wiki article for further information.