---
keywords:
- performance
- tweaks
- startup wait
- message cache
- tuning
---

# Performance Tweaks

## :scissors: Disabling Startup Wait

By default, Javacord waits for all servers and members to be loaded on startup. You can disable this behavior in the `DiscordApiBuilder` before logging in:
```java
new DiscordApiBuilder()
    .setToken("abc")
    .setWaitForServersOnStartup(false)
    .login()
    .thenAccept(api -> {
        // Do something
    }).exceptionally(ExceptionLogger.get());
```
Depending on the size of your bot, this can significantly speed up the login process. This comes with one downside however: The `api.getServers()` collection is empty directly after logging in. You will receive `ServerBecomesAvailableEvent`s for every server which finished loading.

## :gear: Fine Tuning the Message Cache

In order to reduce memory usage, you can completely disable the message cache or reduce the number of cached messages. By default, Javacord caches up to 50 messages per channel and removes messages from the cache which are older than 12 hours. You can lower this limit by using `DiscordApi#setMessageCacheSize(Capacity, StorageTimeInSeconds)`.
```java
// Cache a maximum of 10 messages per channel for and remove messages older than 1 hour
api.setMessageCacheSize(10, 60*60);
```
You can even set this limit on a per-channel basis:
```java
TextChannel channel = ...;
channel.getMessageCache().setCapacity(10);
channel.getMessageCache().setStorageTimeInSeconds(60*60);
```

## :gem: Using the Updater classes

If you update several settings of an entity (server, channel, ...) at once, you should use the updater for this entity instead of the `updateXyz(...)` methods.

### Example

```java
// Sends 1 request to Discord
ServerTextChannel channel = ...;
new ServerTextChannelUpdater(channel)
    .setName("example-channel")
    .setTopic("This is an example channel")
    .setNsfwFlag(true)
    .update();
```
instead of
```java
// Sends 3 requests to Discord
ServerTextChannel channel = ...;
channel.updateName("example-channel");
channel.updateTopic("This is an example channel");
channel.updateNsfwFlag(true);
```