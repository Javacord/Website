---
keywords:
- create emoji
- emoji creation
- unicode emoji
- custom emojis
- delete emojis
- emoji deletion
- send emoji
- use emoji
- KnownCustomEmoji
---
# Emojis and Reactions

There are two different kinds of emojis in Discord: Unicode emojis and custom emojis.

## :biking_man: Unicode Emojis

### What are Unicode emojis?

Unicode emojis are "normal" text emojis which are supported by (nearly) all chat clients, including Discord. You can find a list with all Unicode emojis here: [Full Emoji List](https://unicode.org/emoji/charts/full-emoji-list.html).

### How to use them in messages

You can either directly add them in your code, e.g.
```java
channel.sendMessage("Hi! 😃");
```
or use the normal "tag" like you would in the Client:
```java
channel.sendMessage("Hi! :smiley:");
```
![](https://i.imgur.com/VBiTPq5.png)

### How to use them for reactions

Adding unicode reactions is only possible by using the "real" reaction. It doesn't support tags like `:smiley:`
```java
message.addReaction("😃"); // works
message.addReaction(":smiley:"); // doesn't work
```
![](https://i.imgur.com/Wpp8PNz.png)

## :woman_cartwheeling: Custom Emojis

### What are custom emojis?

Custom emojis are emojis that are created in a server. You can get all custom emojis the bot knows by using `DiscordApi#getCustomEmojis()`.

![](https://i.imgur.com/5tb3Kxu.png)

### How to use them in messages

To use custom emojis, you have to know its "tag", which has the format `<:name:id>`. You can get it by calling `CustomEmoji#getMentionTag()`:
```java
channel.sendMessage("Hi! <:javacord:415465982715494402>");
```
```java
CustomEmoji emoji = ...;
channel.sendMessage("Hi! " + emoji.getMentionTag());
```

### How to use them for reactions

You can either directly use the custom emoji object or use the tag without the `<:` `>` if you don't have access a custom emoji object (e.g., because it's from a different shard):

```java
CustomEmoji emoji = ...;
message.addReaction(emoji);
```
```java
message.addReaction("javacord:415465982715494402");
```

### How to get the tag

Just add a `\` in front of the emoji and press `Enter`

![](https://i.imgur.com/9L1WyFm.gif)

![](https://i.imgur.com/4WTGo7F.png)

## :crown: Javacord Emoji "Hierarchy"

In Javacord, all Emojis are a child of the `Emoji` interface:

![](https://i.imgur.com/YtMKqXe.png)

### What is a KnownCustomEmoji?

Known custom emojis are emojis that the bot knows because it's a member of the server with this emoji. A custom emoji can be unknown if someone adds a reaction with an unknown emoji for example. A `KnownCustomEmoji` has additional methods like `getServer()` or `updateName(String)`.

## :ok_hand: Recommended libraries

If you are working a lot with Unicode emojis, it's recommended to use a library like [emoji-java](https://github.com/vdurmont/emoji-java). It enables you to do things like the following:
```java
message.addReaction(EmojiParser.parseToUnicode(":thumbsup:"));
```