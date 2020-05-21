# Listeners

## :man_mechanic: Creating listeners

Creating listeners is extremely easy in Javacord.
You can either use Java 8's lambda expressions to register listeners inline or just create a new class for them, if an inline listener would get too messy.

### Inline Listeners

```java
api.addMessageCreateListener(event -> {
    if (event.getMessageContent().equalsIgnoreCase("!ping")) {
        event.getChannel().sendMessage("Pong!");
    }
});
```

### In their own class

```java
api.addListener(new MyListener());
```
and
```java
public class MyListener implements MessageCreateListener {

    @Override
    public void onMessageCreate(MessageCreateEvent event) {
        if (event.getMessageContent().equalsIgnoreCase("!ping")) {
            event.getChannel().sendMessage("Pong!");
        }
    }

}
```

### Before logging in

Sometimes it might be useful to add listeners before calling the `DiscordApiBuilder#login()` method.

```java
DiscordApi api = new DiscordApiBuilder()
        // An inline listener
        .addMessageCreateListener(event -> {
            Message message = event.getMessage();
            if (message.getContent().equalsIgnoreCase("!ping")) {
                event.getChannel().sendMessage("Pong!");
            }
        })
        .addServerBecomesAvailableListener(event -> {
            System.out.println("Loaded " + event.getServer().getName());
        })
        // A listener in their own class
        .addListener(new MyListener())
         // Alternative syntax that can be used for classes that require a DiscordApi parameter in their constructor
        .addListener(MyListener::new)
        .setToken("top secret")
        .setWaitForServersOnStartup(false)
        .login()
        .join();
```

> Note: In most cases, it's enough to add listeners after logging in

### Object listeners

Another cool feature is the ability to attach listeners directly to objects. An example where this can be useful is, for example, reacting to reactions. The following code would delete the message if someone adds a :thumbsdown: reaction.

```java
message.addReactionAddListener(event -> {
    if (event.getEmoji().equalsEmoji("👎")) {
        event.deleteMessage();
    }
}).removeAfter(30, TimeUnit.MINUTES);
```
> Seems like the bot is very sensitive to criticism.

## :bomb: Removing listeners

There are two ways to remove a listener:

### Using the returned ListenerManager

Every time you register a listener, a `ListenerManager` is returned which can be used to unregister the listener:
```java
ListenerManager<MessageCreateListener> listenerManager = api.addMessageCreateListener(event -> {
    // Do stuff
});

listenerManager.remove();
```

This manager also has some utility methods. You can, for example, remove a listener after a given time, which can be useful for object listeners:
```java
message.addReactionAddListener(event -> {
  // Do stuff
}).removeAfter(30, TimeUnit.MINUTES);
```

### Using the `removeListener(...)` method

You can remove any listener using the `removeListener(...)` method:
```java
MyListener listener = new MyListener();
api.addListener(listener);
// ...
api.removeListener(listener);
```