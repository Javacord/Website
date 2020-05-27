# Bot Lifecycle

It's important to know the life-cycle of a discord bot to properly handle disconnects. 
The following state diagram shows the 4 states a bot can have:

![](https://javacord.org/img/tutorials/bot-life-cycle/state-diagram.svg)

## :bulb: The four states

### Connected

The bot is connected to the websocket and receives all events.

### Disconnected

The bot is not connected to the websocket and receives no events. It's not uncommon for a bot to occasionally lose connection.
This can have various reasons, for example:
* Your bot lost its internet connection
* Discord restarted the gateway server you are currently connected to
* A plane crashed into Discord's data center

The bot will periodically try ro resume/reconnect to the websocket. It will start with a small frequency and increase it
with every failed reconnect attempt. You can modify this reconnect delay with the `DiscordApi#setReconnectDelay(...)` method.
The following example code would increase the delay linearly.
The 1st attempt would be delayed for `2` seconds, the 2nd attempt for `4` seconds, the 3rd attempts for `6` seconds, ...
```java
api.setReconnectDelay(attempt -> attempt * 2);
```

> **Important:** Bots can only reconnect 1000 times in a 24-hour period (every ~90 seconds). This limit is global and across all shards.
 Upon hitting this limit, all active sessions for the bot will be terminated, the bot's token will be reset, and
 you will receive an email notification. This is the reason Javacord increases the reconnect delay with every attempt.

By default, the $default\_delay$ formula below is used to calculate the reconnect delay

$$
default\_delay(a) = \lfloor a^{1.5} - \frac{a^{1.5}}{\frac{1}{(0.1 \cdot a)} + 1} \rceil
$$

with $a$ being the attempt.

The formula will generate the following recollect delay:

| Attempt | Delay |
| ------- | ----- |
| 1       | 1     |
| 2       | 2     |
| 3       | 4     |
| 4       | 6     |
| 5       | 7     |
| ...     | ...   |
| 10      | 16    |
| 15      | 23    |
| 20      | 30    |
| ...     | ...   |
| 50      | 59    |
| 100     | 91    |
| 150     | 115   |
| ...     | ...   |

### Resuming

Resuming is only possible for a short time after being disconnected. If the bot can successfully resume the connection,
you will not miss any events. Your bot will receive all events you missed while being disconnected. The cache gets updated
accordingly.

### Reconnecting

If your bot reconnects (not resumes!), the whole cache gets wiped and you will not receive any missed events.  

**What does this mean?**  
* References to entities (e.g. a `Server`, `User`, `Channel`, ...) will be outdated. This is why you should never store
  entities, but the id instead. See [Entity Cache](http://localhost:4000/wiki/advanced-tutorials/entity-cache/#how-long-are-cached-entities-valid).
* You will miss events. There's no way to receive the missed events.
* Listeners attached to entities will **not** be affected, because they are bound to the entity's id, not the object itself.

## :pill: How to handle disconnects

For most bots, there's nothing you have to do. All registered listeners are reconnect-resistant, which means if your bot
is only reacting to events, it will work fine after a restart. For example, the following code will not be affected by a 
reconnect (besides maybe some missed `!ping` messages):
```java
api.addMessageCreateListener(event -> {
    if (event.getMessage().getContent().equalsIgnoreCase("!ping")) {
        event.getChannel().sendMessage("Pong!");
    }
});
```

In case you want to handle reconnects (e.g. fetch the message history to detect missed messages), there are
special connection-related listeners which can be used to track the state of the bot:
* `LostConnectionListener`
* `ReconnectListener`
* `ResumeListener`