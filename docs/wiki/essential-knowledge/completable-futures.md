# Completable Futures

::: warning
This tutorials assumes you are familiar with lambda expressions. Take a look at the [Lambda Introduction](https://javacord.org/wiki/essential-knowledge/lambda-introduction) first, if you are not!
:::

As Javacord is heavily multithreaded, you have to understand the concept of [Futures](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/Future.html) in general, as well as their most common implementation, the [CompletableFuture](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CompletableFuture.html). This little introduction should give you a quick overview of the basics you need to know in order to work with Futures.

## :thinking: So, what the heck is a future?

A future is basically a wrapper, which will contain a value in the future, but might not contain it right now. This is useful, if a method call requires some time and should not block the execution of your current code. You can easily see the difference with a primitive speed comparison:
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
> Note: `join()` blocks the current thread until the method is finished. This will be explained later.

## :open_book: Methods

### join()

This method blocks the current thread until the method finishes and returns its result or throws a `CompletionException` if anything failed. You usually should avoid `join()` for larger bots or methods which will be called frequently.

**Example**

The following example would create a new text channel in the given `server` and sends a message directly afterwards.
```java
// Create the channel
ServerTextChannel channel = server.createTextChannelBuilder()
    .setName("new-channel")
    .create()
    .join();
// Send a message in the new channel
Message message = channel.sendMessage("First!").join();
// Adds an reaction to the message. Even though this method doesn't return anything,
// join() ensures, that an exception is thrown in case something went wrong
message.addReaction("👍").join();
```
`join()` can basically be used every time if you don't care that much about your application's performance. So if you're only developing a small bot for your own server and your current goal is to just get it working, it is probably easier to always use `join()` to get the result of a method. You won't usually run into problems if you don't overuse this method.

### thenAcceptAsync(...)

This method accepts a `Consumer`, which consumes the result of the method and is executed asynchronously. It is the method you usually want to use.

**Example**

The following example would create a new text channel in the given `server` and send a message directly afterwards.
```java
server.createTextChannelBuilder()
    .setName("new-channel")
    .create()
    .thenAcceptAsync(channel -> {
        // This code is already running async, so you can safely use join() here
        Message message = channel.sendMessage("First!").join();
        message.addReaction("👍").join();
    });
```
This method has one downside however: it will not throw or log any exception which might happen while executing the code. If your bot doesn't have the permissions to create a new channel, for example, it will just fail silently. If you don't want this, you can additionally use the `exceptionally(...)` method.

### exceptionally(...)

This method accepts a `Function` as parameter, which consumes possible exceptions. We are not talking about the result it returns here, to keep things simple.

**Example**

The following example would create a new text channel in the given `server` and send a message directly afterwards. If something fails (e.g. if the bot isn't allowed to create a text channel in the server), it will log an exception.
```java
server.createTextChannelBuilder()
    .setName("new-channel")
    .create()
    .thenAcceptAsync(channel -> {
        // This code is already running async, so you can safely use join() here
        Message message = channel.sendMessage("First!").join();
        message.addReaction("👍").join();
    }).exceptionally(throwable -> {
        // Print possible errors to the log
        throwable.printStackTrace();
        return null;
    });
```
To make things even simpler for you, Javacord has the `ExceptionLogger` class, which can be used here. It logs every exception you didn't catch manually.
```java
server.createTextChannelBuilder()
    .setName("new-channel")
    .create()
    .thenAcceptAsync(channel -> {
        // This code is already running async, so you can safely use join() here
        Message message = channel.sendMessage("First!").join();
        message.addReaction("👍").join();
    }).exceptionally(ExceptionLogger.get());
```
The exception logger even allows you to ignore special kinds of exceptions. If you, for example, don't want to log errors for missing permissions, but still log errors cause by other problems (e.g. an invalid channel name like an empty string `""`) you can tell the exception logger to not log these exceptions:
```java
server.createTextChannelBuilder()
    .setName("new-channel")
    .create()
    .thenAcceptAsync(channel -> {
        // This code is already running async, so you can safely use join() here
        Message message = channel.sendMessage("First!").join();
        message.addReaction("👍").join();
    // Log every exception, besides MissingPermissionsExceptions
    }).exceptionally(ExceptionLogger.get(MissingPermissionsException.class));
```