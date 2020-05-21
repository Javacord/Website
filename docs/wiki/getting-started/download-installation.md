# Download / Installation

The recommended way to get Javacord is to use a build manager, like Gradle or Maven.  
If you are not familiar with build managers, you can follow one of the beginner ide setup guides (see navigation) or download Javacord directly from [GitHub](https://github.com/Javacord/Javacord/releases/latest).

## :package: Javacord Dependency

### Gradle

```groovy
repositories { mavenCentral() }
dependencies { implementation 'org.javacord:javacord:3.0.6' }
```

### Maven

```xml
<dependency>
    <groupId>org.javacord</groupId>
    <artifactId>javacord</artifactId>
    <version>3.0.6</version>
    <type>pom</type>
</dependency>
```

### Sbt

```scala
libraryDependencies ++= Seq("org.javacord" % "javacord" % "3.0.6")
```

## :memo: Optional Logger Dependency

In addition to Javacord, it is also recommended to install a Log4j-2-compatible logging framework.
A logging framework can be used to provide a more sophisticated logging experience with being able to configure log format, log targets (console, file, database, Discord direct message, ...), log levels per class, and much more.

For example, Log4j Core in Gradle
```groovy
dependencies { runtimeOnly 'org.apache.logging.log4j:log4j-core:2.11.0' }
```
Take a look at the [logger configuration](https://javacord.org/wiki/basic-tutorials/logger-configuration/) wiki article for further information.