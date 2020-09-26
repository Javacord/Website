---
keywords:
- entity
- cache
- caching
---

# Entity Cache

Javacord keeps an internal cache for entities (e.g. Servers, Channels, Users, ...). It is important to know how the cache behaves to properly use it.

## :crystal_ball: What is in the cache?

Nearly every entity known by the bot is guaranteed to be in the cache. There are a few exceptions though:

#### Users

Users are only cached when you have the `GUILD_MEMBERS` intent enabled.
See [Gateway Intents](/wiki/basic-tutorials/gateway-intents/) for more information.

#### Messages

Not every single message is in the cache, which means you can encounter messages which exist but are not in the cache. This can happen for most message events, e.g. the [`ReactionAddEvent`](https://ci.javacord.org/javadoc/org/javacord/api/event/message/reaction/ReactionAddEvent.html). You can, however, interact with these messages without having them in the cache. Every message event has methods like `event.deleteMessage()`, `event.editMessage("New Content")`. If you need the message (e.g. to get its content), you can request it using `event.requestMessage()`.

Additionally you can use the static methods in the [`Message`](https://ci.javacord.org/javadoc/org/javacord/api/entity/message/Message.html) class which only require the channel and message id, e.g. `Message.edit(api, channelId, messageId, "New content");`. This is very useful if you want to store them in a database.

#### Webhooks and Invites

Webhooks and Invites are not kept in the cache at all and won't receive any updates.

#### Embeds

Embeds from `message.getEmbed()` won't receive updates. If a message's embed gets edited, `getEmbed()` will return a completely new embed object.

## :question: When are cached entities updated?

Javacord's cache exclusively uses websocket events to keep the cache up to date. This means that the content of your objects might be outdated, even though you modified it yourself:

```java
Messages message = ...;
System.out.println(message.getContent()); // Prints the old content, e.g. "old content"
message.edit("new content").join(); // Edits the message and waits for success
System.out.println(message.getContent()); // Still prints "old content"
Thread.sleep(1000);
System.out.println(message.getContent()); // Most likely prints "new content" now
```

## :watch: How long are cached entities valid?

Even though entities are usually kept in the cache for a very long time, you should not keep references to theses objects for a longer period of time, but store the id / use event methods:

```java
// Bad
Message message = ...;
message.addReactionAddListener(event -> {
  if (event.getEmoji().equalsEmoji("👎")) {
    message.delete(); // Prevents "message" from being garbage collected
  }
});

// Good
Message message = ...;
message.addReactionAddListener(event -> {
  if (event.getEmoji().equalsEmoji("👎")) {
    event.deleteMessage(); // Does not use the message object
  }
});
```

```java
// Bad
Set<User> usersWithBadMood = new HashSet<>();
api.addReactionAddListener(event -> {
  if (event.getEmoji().equalsEmoji("😦")) {
    usersWithBadMood.add(event.getUser());
  }
});

// Good
Set<Long> usersWithBadMood = new HashSet<>();
api.addReactionAddListener(event -> {
  if (event.getEmoji().equalsEmoji("😦")) {
    usersWithBadMood.add(event.getUser().getId());
  }
});
```

Some examples of when cached entities are invalidated:
* The bot lost its connection to Discord and had to reconnect (not resume)
* You weren't able to receive updates for an entity, e.g. for `Channel`, because you left and rejoined a server