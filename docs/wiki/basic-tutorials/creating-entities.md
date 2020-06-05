---
keywords:
- creating entities
- create entities
- entity creation
- create channels
- channel creation
- create webhooks
- webhook creation
- create invites
- invite creation
- create server
- server creation
---
# Creating Channels, Invites, etc.

Javacord provides `XyzBuilder` classes to create new Discord entities like channels, webhooks, servers, and many more.

## :closed_book: Create Channels

You can get the channel builders for a specific server using the `Server#createXyzChannelBuilder` or by directly calling the constructor.
Creating a `ServerVoiceChannel` would look like this:
```java
Server server = ...;
ServerVoiceChannel channel = new ServerVoiceChannelBuilder(server)
    .setName("example-channel")
    .setUserlimit(10)
    .create().join();
```

## :green_book: Create Webhooks

You can get the `WebhookBuilder` for a specific text channel:

```java
ServerTextChannel channel = ...;
Webhook webhook = new WebhookBuilder(channel)
    .setName("Captain Hook")
    .setAvatar(new File("C:/Users/Bastian/Pictures/puppy.jpg"))
    .create().join();
```

## :blue_book: Create Invites

You can get the `InviteBuilder` for a specific server channel:
```java
ServerTextChannel channel = ...;
Invite invite = new InviteBuilder(channel)
    .setMaxAgeInSeconds(60*60*24)
    .setMaxUses(42)
    .create().join();
```

## :orange_book: Create Servers

You can get the `ServerBuilder` from the current api instance:
```java
DiscordApi api = ...;
long serverId = new ServerBuilder(api)
    .setName("My Awesome Server")
    .setIcon(api.getYourself().getAvatar())
    .setVerificationLevel(VerificationLevel.HIGH)
    .setDefaultMessageNotificationLevel(DefaultMessageNotificationLevel.ONLY_MENTIONS)
    .setRegion(Region.EU_CENTRAL)
    .create().join();
```

::: warning
By default, bots can only create servers if they are in less than 10 servers. You can contact the Discord support to request a higher limit.
:::