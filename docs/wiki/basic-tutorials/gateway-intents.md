---
keywords:
- Intents
---

# Gateway Intents

Discord allows you to "subscribe" to specific groups of events.
These "subscriptions" are called intent.
Disabling intents that are not required for your bot can significantly increase your bot's performance.

## :clipboard: List of Intents

Below you can find a table with all intents supported by Discord.

| Intent                         | Safe to Disable    | Privileged         |
|--------------------------------|--------------------|--------------------|
| `GUILDS`                       | :x:                | :x:                |
| `GUILD_MEMBERS`                | :heavy_check_mark: | :heavy_check_mark: |
| `GUILD_BANS`                   | :warning:\*        | :x:                |
| `GUILD_EMOJIS`                 | :warning:\*        | :x:                |
| `GUILD_INTEGRATIONS`           | :heavy_check_mark: | :x:                |
| `GUILD_WEBHOOKS`               | :heavy_check_mark: | :x:                |
| `GUILD_INVITES`                | :heavy_check_mark: | :x:                |
| `GUILD_VOICE_STATES`           | :warning:\*        | :x:                |
| `GUILD_PRESENCES`              | :heavy_check_mark: | :heavy_check_mark: |
| `GUILD_MESSAGES`               | :heavy_check_mark: | :x:                |
| `GUILD_MESSAGE_REACTIONS`      | :heavy_check_mark: | :x:                |
| `GUILD_MESSAGE_TYPING`         | :heavy_check_mark: | :x:                |
| `DIRECT_MESSAGES`              | :heavy_check_mark: | :x:                |
| `DIRECT_MESSAGE_REACTIONS`     | :heavy_check_mark: | :x:                |
| `DIRECT_MESSAGE_TYPING`        | :heavy_check_mark: | :x:                |
| `MESSAGE_CONTENT`              | :heavy_check_mark: | :heavy_check_mark: |
| `AUTO_MODERATION_CONFIGURATION`| :heavy_check_mark: | :x:                |
| `AUTO_MODERATION_EXECUTION`    | :heavy_check_mark: | :x:                |


\* Will most likely work, but needs further testing

::: tip Good to know!
*Guild* is a synonym for servers, commonly used in Discord's API.
See [Glossary](/wiki/basic-tutorials/glossary/).
:::

## :bulb: What Happens When I Disable Some Intents?

When you disable some of the listed intents, Javacord will not fire events that belong to the intents and
will not update these specific parts of the cache.

At the moment, we don't have a list which events are affected by which intents (but it will come soon:tm:).
However, most intents should be self-explanatory.
E.g. when you disable the `DIRECT_MESSAGES` intent, your bot will not receive any private messages.

## :crown: Privileged Intents

Some intents are defined as "privileged" due to the sensitive nature of the data.
To use these intents, you have to go to your bot in the [Developer Portal](https://discord.com/developers/applications)
(where you created bot) and manually enable the intents:

![](./enable_privileged_intents.png)

There are some additionally restrictions for bots that are in over 100 servers:
* Your bot must be verified
* Your bot must be whitelisted to use this intents

Take a look at the official article from Discord about this topic and how to verify your bot: 
[Bot Verification and Data Whitelisting](https://support.discord.com/hc/en-us/articles/360040720412).

## :exclamation: Notable Intents

The following two intents are especially noteworthy: `GUILD_MEMBERS` and `GUILD_PRESENCES`.
Besides being privileged, they have some special implications for Javacord:

### `GUILD_PRESENCES`

This intent is required to get updates about a user's status (i.e., if they are online, what game they are playing, ...).
Additionally, without this intent it might take considerably longer to cache all users because of ratelimits 
(up to 10 minutes for shards with 1000 servers). 
It is advised against setting `DiscordApiBuilder#setWaitForAllUsersOnStartup(true)` without this intent, unless absolutely necessary.

### `GUILD_MEMBERS`

This intent is required to keep all users in Javacord's cache.
Without this intent, methods like `Server#getMembers()` or `DiscordApi#getCachedUsers()` will return empty collections.
However, you will still be able to access users from objects like messages, e.g. `Message#getUserAuthor()` will still work.

## :gear: Setting Intents

Javacord allows you to specify intents in the `DiscordApiBuilder` prior to login.
There are many options to set intents.
The following example code shows the most common ones:

### Set All Non-Privileged Intents (Default)

This method enables all non-privileged intents.
This is the default setting in Javacord.

```java
DiscordApi api = new DiscordApiBuilder()
    .setToken("topc secret")
    .setAllNonPrivilegedIntents()
    .login()
    .join();
```

### Set All Non-Privileged Intents Except

This method enabled all non-privileged intents, except the given ones.

```java
DiscordApi api = new DiscordApiBuilder()
    .setToken("topc secret")
    .setAllNonPrivilegedIntentsExcept(Intent.GUILD_WEBHOOKS)
    .login()
    .join();
```

### Set All Intents

This method enabled all intents.

```java
DiscordApi api = new DiscordApiBuilder()
    .setToken("topc secret")
    .setAllIntents()
    .login()
    .join();
```

### Set All Intents Except

This method enabled all intents, except the given ones.

```java
DiscordApi api = new DiscordApiBuilder()
    .setToken("topc secret")
    .setAllIntentsExcept(Intent.GUILD_PRESENCES, Intent.GUILD_WEBHOOKS)
    .login()
    .join();
```

### Set Intents

This method only enables the given intents.

```java
DiscordApi api = new DiscordApiBuilder()
    .setToken("topc secret")
    .setIntents(Intent.GUILDS, Intent.DIRECT_MESSAGES)
    .login()
    .join();
```
