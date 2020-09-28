---
keywords:
- sharding
- large
---

# Sharding

Discord allows (and forces) you to "split" larger bots into several independent parts. This behavior is called "sharding", and the independent parts are called "shards". You can think of shards as completely independent bots. Every shard is responsible for a disjoint set of servers.

## :woman_factory_worker: Sharding in Javacord

### Logging in with a single shard

Logging in with a single shard is pretty much the same as logging in without sharding:
```java
DiscordApi api = new DiscordApiBuilder()
    .setToken("top secret")
    .setCurrentShard(0)
    .setTotalShards(2)
    .login().join();
System.out.println("Shard " + api.getCurrentShard() + " logged in!");
```
> **Note**: `current shard` starts counting at `0`! This means in the example above you would have current shard `0` and shard `1` with a `total amount` of `2` shards.

> **Important**: There must be a > 5-second delay between each shard-login

### Logging in with a fixed amount of shards

You can manually set a fixed amount of total shards and log in all of them:
```java
public class Main {

    public static void main(String[] args) {
        new DiscordApiBuilder()
            .setToken("top secret")
            .setTotalShards(10)
            .loginAllShards()
            .forEach(shardFuture -> shardFuture
                .thenAcceptAsync(Main::onShardLogin)
                .exceptionally(ExceptionLogger.get())
            );
    }

    private static void onShardLogin(DiscordApi api) {
        System.out.println("Shard " + api.getCurrentShard() + " logged in!");
        // You can treat the shard like a normal bot account, e.g. registering listeners
        api.addMessageCreateListener(event -> {
            // ...
        });
    }

}
```
`loginAllShards()` returns a collection with completable futures (`Collection<CompletableFuture<DiscordApi>>`). This method automatically obeys the > 5-second delay rule.

### Using the recommended shard amount

You can "ask" Discord to recommend you a total amount of shards. This is done by using the `DiscordApiBuilder#setRecommendedTotalShards()` method, which returns a `CompletableFuture<DiscordApiBuilder>` after getting the required information.

```java
public class Main {

    public static void main(String[] args) {
        new DiscordApiBuilder()
            .setToken("top secret")
            .setRecommendedTotalShards().join()
            .loginAllShards()
            .forEach(shardFuture -> shardFuture
                .thenAccept(Main::onShardLogin)
                .exceptionally(ExceptionLogger.get())
            );
    }

    private static void onShardLogin(DiscordApi api) {
        // ...
    }

}
```

## :bulb: Behavior of Shards

### Managed servers

You can calculate for which servers a shard is responsible using the server id:
```java
boolean isResponsible = (serverId >> 22) % totalShards == currentShard;
```

### Private messages

Private messages are always sent to the first shard (`currentShard == 0`).

### When do I need sharding?

Sharding is forced for bots which are in more than 2500 servers.

## :sunrise_over_mountains: Sharding for Very Large Bots

Sharding for very large bots (> 100,000 servers) is a bit different from "normal" sharding. Discord will contact you once your bot reaches this state. Additional information can be found in the [official Discord api documentation](https://discordapp.com/developers/docs/topics/gateway#sharding-for-very-large-bots).