# Writing your first bot

After you have successfully added Javacord as a dependency, created a bot user, and got its token, you are now ready to create your first simple bot! :tada:

## :key: Log the bot in

Everything starts with the `DiscordApiBuilder` class.
It is used to create a `DiscordApi` object which is the most important class of your bot.

```java
DiscordApi api = new DiscordApiBuilder()
        .setToken("<your super secret token>")
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