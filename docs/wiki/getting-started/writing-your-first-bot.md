# Writing your first bot

After you have successfully added Javacord as a dependency, created a bot user, and got its token, you are now ready to create your first simple bot! :tada:

## :exclamation: Enabling required intents
By default, all non-privileged intents are enabled. To receive the message content, attachments, components, and embeds you need a special privileged intent `MESSAGE_CONTENT`.
To enable this privileged intent please see the [Gateway Intents](../basic-tutorials/gateway-intents.md#privileged-intents) wiki article.

::: tip Slash Commands
Generally it is recommended to use [Slash Commands](../basic-tutorials/interactions/commands.md) instead of text commands because they offer many advantages
like auto-completion, fixed and optional arguments, different kind of argument built with built-in types: numbers(with ranges), text, channel and a lot more.
:::

## :key: Log the bot in

Everything starts with the `DiscordApiBuilder` class.
It is used to create a `DiscordApi` object which is the most important class of your bot.

```java
DiscordApi api = new DiscordApiBuilder()
        .setToken("<your super secret token>")
        .addIntents(Intent.MESSAGE_CONTENT)
        .login().join();
```

After executing this code, you should already see your bot online in Discord.
Of course, just being online is not enough, so let's add some more code!

## :ear: Adding a listener

After you got your `api` instance, let's continue by adding a listener that answers every `!ping` message with a simple `Pong!`.

```java
api.addMessageCreateListener(event -> {
    if (event.getMessageContent().equalsIgnoreCase("!ping")) {
        event.getChannel().sendMessage("Pong!");
    }
});
```

![](./ping-pong-white.gif)

## :woman_mechanic: Putting it all together

A good place for your code is the `main(...)` method that every executable Java program must have.
Your complete class may look like this:

```java
public class MyFirstBot {

    public static void main(String[] args) {
        // Log the bot in
        DiscordApi api = new DiscordApiBuilder()
                .setToken("<your super secret token>")
                .addIntents(Intent.MESSAGE_CONTENT)
                .login().join();

        // Add a listener which answers with "Pong!" if someone writes "!ping"
        api.addMessageCreateListener(event -> {
            if (event.getMessageContent().equalsIgnoreCase("!ping")) {
                event.getChannel().sendMessage("Pong!");
            }
        });
    }

}
```

Congratulations, that's already everything you have to know for the beginning.
Now, you can play around a little bit by exploring other listeners and methods.
Or you just continue reading articles in the *Basic Tutorials* category.