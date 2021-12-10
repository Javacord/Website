---
keywords:
- download and installation
- maven
- gradle
---

# Download / Installation

The recommended way to get Javacord is to use a build manager, like Gradle or Maven.  
If you are not familiar with build managers, you can follow one of the beginner ide setup guides (see navigation) or download Javacord directly from [GitHub](https://github.com/Javacord/Javacord/releases/latest).

## :package: Javacord Dependency

<LatestVersionInfo/>

### Gradle

```groovy
repositories { mavenCentral() }
dependencies { implementation 'org.javacord:javacord:$latest-version' }
```

### Maven

```xml
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

::: details Click to view snapshot repositories

Snapshots are automatically deployed from the [development](https://github.com/Javacord/Javacord/tree/development) branch.

### Gradle

```groovy
repositories { 
  maven {
    url "https://oss.sonatype.org/content/repositories/snapshots/"
  }
}
dependencies { 
  implementation 'org.javacord:javacord:$latest-snapshot-version' 
}
```

### Maven

```xml
<repository>
    <id>snapshots-repo</id>
    <url>https://oss.sonatype.org/content/repositories/snapshots/</url>
</repository>
```
```xml
<dependency>
    <groupId>org.javacord</groupId>
    <artifactId>javacord</artifactId>
    <version>$latest-snapshot-version</version>
    <type>pom</type>
</dependency>
```

### Sbt

```scala
resolvers += "snapshots-repo" at "https://oss.sonatype.org/content/repositories/snapshots/"
libraryDependencies ++= Seq("org.javacord" % "javacord" % "$latest-snapshot-version")
```
:::


## :memo: Optional Logger Dependency

In addition to Javacord, it is also recommended to install a Log4j-2-compatible logging framework.
A logging framework can be used to provide a more sophisticated logging experience with being able to configure log format, log targets (console, file, database, Discord direct message, ...), log levels per class, and much more.

For example, Log4j Core:

### Gradle

```groovy
dependencies { runtimeOnly 'org.apache.logging.log4j:log4j-core:2.15.0' }
```

### Maven

```xml
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-core</artifactId>
    <version>2.15.0</version>
</dependency>
```

### Sbt

```scala
libraryDependencies ++= Seq("org.apache.logging.log4j" % "log4j-core" % "2.15.0")
```

Take a look at the [logger configuration](/wiki/basic-tutorials/logger-config/) wiki article for further information.