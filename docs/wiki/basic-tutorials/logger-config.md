---
keywords:
- log4j
- log4j2
- slf4j
- logback
- logging
- logger
---

# Logger Configuration

Logging is an important tool to keep track of what is going on in your application. Javacord uses the [Log4j 2 API](https://logging.apache.org/log4j/2.x/manual/api.html), which allows you to use your favorite logging framework to log messages in your own code and have all logging messages end up in the same destination. In case you do not add your own logging framework, a fallback logger is used that logs to the console.  
If you want more control, add a proper logging framework that supports your needs and configure it accordingly. You can for example configure log messages on a per-class level, change log levels during runtime, or log to a file or database.

## :2nd_place_medal: Fallback Logger

Javacord's fallback logger is a simple Log4j logger which always logs `INFO` level and higher. It allows you to enable `DEBUG` and `TRACE` logging manually. As log levels are hierarchical, enabling `TRACE` will also implicitly enable `DEBUG`, and disabling `DEBUG` will also implicitly disable `TRACE`.

```java
// Enable debug logging
FallbackLoggerConfiguration.setDebug(true);

// Enable trace logging
FallbackLoggerConfiguration.setTrace(true);
```

Changing the log level of the fallback logger only affects newly created loggers. Pre-existing loggers will not have their log level changed. So if you want to configure the fallback logger, you should do this as one of the first actions in your bot code. If you want to change log levels during runtime, you should use a proper logging framework like Log4j 2 Core or another library that supports this.

All fallback logger messages are printed to the standard output stream (`System.out`) and thus usually to your console. If you want to log to a file, database, or anything else, you should consider using a proper logging framework which allows you to configure this behavior.

This is how a log line from the fallback logger will look like:

```log
<time with date            ><level><logger name, usually the logging class              > <message            > <the thread context, here the shard number>
2018-08-03 20:00:06.080+0200 DEBUG org.javacord.core.util.gateway.DiscordWebSocketAdapter Received HELLO packet {shard=0}
```

## :1st_place_medal: Using a Proper Logging Framework

### Adding a Logging Framework

Adding a logging framework of your choice is very straightforward. You can just add it as a dependency, and it will be detected by Log4j automatically. The following example adds Log4j 2 using Gradle:

```groovy
dependencies { runtimeOnly 'org.apache.logging.log4j:log4j-core:2.15.0' }
```

You can also use an SLF4J compatible logging framework using `log4j-to-slf4j`. The following example adds Logback Classic using Gradle:

```groovy
dependencies {
    runtimeOnly 'org.apache.logging.log4j:log4j-to-slf4j:2.15.0'
    runtimeOnly 'ch.qos.logback:logback-classic:1.2.3'
}
```

### Configure Your Logging Framework

* **Log4j 2**: [Log4j configuration](https://logging.apache.org/log4j/2.x/manual/configuration.html)
* **Logback Classic**: [Logback configuration](https://logback.qos.ch/manual/configuration.html)

### Logging the Relevant Shard

Javacord adds the relevant shard to each log message. The facility that stores this information has a different name depending on which logging framework you use. For Log4j 2, this is called Thread Context Map and can be added in a pattern layout with `%X{shard}`, or you can add the whole thread context map by using `%X`. For Logback Classic, it is called MDC and can be added with the same pattern expressions as for Log4j.