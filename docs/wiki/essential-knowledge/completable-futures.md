---
keywords:
- CompletableFuture
- exceptionally
- ExceptionLogger
- join
- thenAcceptAsync
---

# Completable Futures

::: warning
This tutorials assumes, that you are familiar with lambda expressions.
Take a look at the [lambda introduction](/wiki/essential-knowledge/lambdas/) first, if you are not!
:::

As Javacord is heavily multithreaded, you must understand the concept of
[Futures](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/Future.html) 
in general, as well as their most common implementation, the 
[CompletableFuture](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CompletableFuture.html). 
This little introduction gives you a quick overview of the basics you need to know in order to work with Futures.

## :thinking: What the heck is a future?

A future is basically a wrapper, that will contain a value in the future but might not contain it right now.
This is useful, if a method call requires some time and should not block the execution of your current code.
You can easily see the difference with a primitive speed comparison:

```java
long currentTime = System.currentTimeMillis();
channel.sendMessage("Test 1");
channel.sendMessage("Test 2");
channel.sendMessage("Test 3");
channel.sendMessage("Test 4");
channel.sendMessage("Test 5");
// Prints "4 ms"
System.out.println((System.currentTimeMillis() - currentTime) + " ms");
```

```java
long currentTime = System.currentTimeMillis();
channel.sendMessage("Test 1").join();
channel.sendMessage("Test 2").join();
channel.sendMessage("Test 3").join();
channel.sendMessage("Test 4").join();
channel.sendMessage("Test 5").join();
// Prints "894 ms"
System.out.println((System.currentTimeMillis() - currentTime) + " ms");
```

::: tip
`join()` blocks the current thread until the method finished. This will be explained later.
:::

## :open_book: Methods

### join()

The `join` method blocks the current thread until the method finished.
It returns the method's result or throws a `CompletionException` if anything failed.

The following example would create a new text channel in a given `server` and sends a message directly afterwards.
```java
// Create the channel
ServerTextChannel channel = new ServerTextChannelBuilder(server)
    .setName("new-channel")
    .create()
    .join();
// Send a message in the new channel
Message message = channel.sendMessage("First!").join();
// Adds an reaction to the message. Even though this method doesn't return anything,
// join() ensures, that an exception is thrown in case something went wrong
message.addReaction("👍").join();
```

::: danger
You should avoid `join()` for methods which will be called frequently.
:::

::: tip
While `join()` can become a performance issue when you call it very frequently, it is very convenient to use and easy to understand.
If you are new to programming and just want to get your first bot working, this is a good method to start with.

Once you gathered more experience, we highly advise against using `join` as it negatively impacts your bot's performance!
:::

### thenAccept(...)

The `thenAccept` method accepts a `Consumer`, that consumes the result of the method and is executed asynchronously.
It is the method you usually want to use most of the time.

The following example would create a new text channel in a given `server` and send a message directly afterwards.
```java
new ServerTextChannelBuilder(server)
    .setName("new-channel")
    .create()
    .thenAccept(channel -> {
        channel.sendMessage("First!").thenAccept(message -> {
            message.addReaction("👍");
        });
    });
```

::: danger
The example code above has a major problem: Any exception that might occur will be completely ignored.
This makes it very hard to find bugs.

For example, if your bot doesn't have the permissions to create a new channel, it will just fail silently.
:::

### exceptionally(...)

The `exceptionally` method accepts a `Function` as parameter, which consumes possible exceptions and returns an fallback value.

The following example would create a new text channel in a given `server` and send a message directly afterwards.
If something fails (e.g., if the bot isn't allowed to create a text channel in the server), it will log an exception.

```java
new ServerTextChannelBuilder(server)
    .setName("new-channel")
    .create()
    .thenAccept(channel -> {
        channel.sendMessage("First!").thenAccept(message -> {
            message.addReaction("👍").exceptionally(e -> {
                e.printStackTrace(); // Adding the reaction failed
                return null;
            });
        }).exceptionally(e -> {
            e.printStackTrace(); // Message sending failed
            return null;
        });
    }).exceptionally(e -> {
        e.printStackTrace(); // Channel creation failed    
        return null;
    });
```

Wow! This looks ugly 🤮.
But worry not! There are many options to improve this code!

To make things simpler for you, Javacord has the `ExceptionLogger` class, which can be used here.
It logs every exception you didn't catch manually.

```java
new ServerTextChannelBuilder(server)
    .setName("new-channel")
    .create()
    .thenAccept(channel -> {
        channel.sendMessage("First!").thenAccept(message -> {
            message.addReaction("👍").exceptionally(ExceptionLogger.get());
        }).exceptionally(ExceptionLogger.get());
    }).exceptionally(ExceptionLogger.get());
```

Okay! This is at least a little better, but still not really perfect :thinking:.

### thenCompose()

The `thenCompose` methods allows you to chain futures.
It takes a [Function](https://docs.oracle.com/javase/8/docs/api/java/util/function/Function.html) as parameter, that
consumes the future's value and expects a new future to be returned.

The example to create a text channel can now be written like this:
```java
new ServerTextChannelBuilder(server)
        .setName("new-channel")
        .create() 
        .thenCompose(channel -> channel.sendMessage("First!"))
        .thenCompose(message -> message.addReaction("👍"))
        .exceptionally(ExceptionLogger.get());
```

Finally :tada:! Now we only need a single `exceptionally(...)` call at the end.
We also got rid of the nested callbacks (usually referred to as "callback hell").

For better understanding, here's the example with comments that tell you the type at each line:
```java
new ServerTextChannelBuilder(server) // ServerTextChannelBuilder
        .setName("new-channel") // ServerTextChannelBuilder
        .create() // CompletableFuture<ServerTextChannel>
        .thenCompose(channel -> channel.sendMessage("First!")) // CompletableFuture<Message>
        .thenCompose(message -> message.addReaction("👍")) // CompletableFuture<Void>
        .exceptionally(ExceptionLogger.get()); // CompletableFuture<Void>
```

## :books: Further Read

This tutorial only focused on the absolute basics.
For a more detailed introduction to CompletableFutures, you can take a look at
[this tutorial](https://www.callicoder.com/java-8-completablefuture-tutorial/).

You should also take a look at the JavaDoc for a complete list of methods: [CompletableFuture JavaDoc](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CompletableFuture.html).
