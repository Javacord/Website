# Optionals

::: warning
This tutorials assumes, that you are familiar with lambda expressions.
Take a look at the [lambda introduction](/wiki/essential-knowledge/lambdas/) first, if you are not!
:::

## :muscle: Motivation

The Optional class is widely used in Javacord.
Basically, every method that might return a `null` value will return an Optional in Javacord instead.
Optionals help you to avoid `NullPointerExceptions` and make it very clear if a method may not have a result.
Here's a small example:

### The old way of doing it

```java
User user = api.getCachedUserById(123L);
if (user != null) {
  user.sendMessage("Hi!");
}
```

### The new way of doing it

```java
api.getCachedUserById(123L).ifPresent(user -> 
  user.sendMessage("Hi!")
);
```

You can imagine an `Optional` like a box :package: that may or may not contain a value.
Before accessing this value, you have to "unpack" this box first.

## :open_book: Methods

The Optional class has many useful methods which can all be found in the [JavaDocs](https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html).
This tutorial gives a short introduction to the most common ones.

### get()

The `get` method returns the value of the Optional or throws a `NoSuchElementException` if it does not contain a value.

```java
TextChannel channel = api.getTextChannelById(123L).get();
channel.sendMessage("Hi");
```

::: danger
You should never use this method blindly but only if you are **100%** sure the optional contains a value.

Every time you use this method carelessly, a kitten dies :scream_cat:!
True story.
:::

### isPresent()

The `isPresent` methods checks, if the Optional contains a value.

```java
Optional<TextChannel> channel = api.getTextChannelById(123L);
if (channel.isPresent()) {
  // A text channel with the id 123 exists. It's safe to call #get() now
  channel.get().sendMessage("Hi");
}
```

### orElse(...)

The `orElse` methods returns the value of the Optional if it is present. Otherwise, it returns the given default value.

```java
// The user may not have a nickname on the given server. 
// In this case, we use the user's "regular" name.
String displayName = user.getNickname(server).orElse(user.getName());
```
The example above is (mostly) equivalent to the example below but much more concise.
```java
String displayName = "";
Optional<String> nickname = user.getNickname(server);
if (nickname.isPresent()) {
  displayName = nickname.get();
} else {
  displayName = user.getName();
}
```

::: tip
In this case you can just use `user.getDisplayName(server)` instead.
:::

### ifPresent(...)

The `ifPresent` method is very similar to an `if (value != null) { ... }` check. 
It takes a [Consumer](https://docs.oracle.com/javase/8/docs/api/java/util/function/Consumer.html) as it's argument.
This consumer is called if the Optional contains a value.
Together with lambda expressions this can be a very handy method.

```java
api.getTextChannelById(123L).ifPresent(channel -> {
  channel.sendMessage("Hi!");
});
```
The example above is (mostly) equivalent to the example below but more concise.
```java
Optional<TextChannel> channel = api.getTextChannelById(123L);
if (channel.isPresent()) {
  channel.get().sendMessage("Hi!");
}
```

### filter(...)

The `filter` method filters the Optional for a given criteria.

```java
Optional<User> botUser = api.getCachedUserById(123L).filter(User::isBot);
```
The example above is equivalent to the example below but more concise.
```java
Optional<User> user = api.getCachedUserById(123L);
Optional<User> botUser;
if (user.isPresent() && user.get().isBot()) {
  botUser = user;
} else {
  botUser = Optional.empty();
}
```

### map(...)

The `map` method "converts" the type of an Optional.
This is useful, if the type of an Optional does not contain the final value you need.

The following example gets the name of the bots current activity (the "Playing xyz" status) or "None" if the bot has no current activity.

```java
String activityName = api.getYourself().getActivity().map(Activity::getName).orElse("None");
```
For better understanding, here's the exact same code but with the types as comments:
```java
String activityName =  api.getYourself() // User
        .getActivity() // Optional<Activity>
        .map(Activity::getName) // Optional<String>
        .orElse("None"); // String
```

### flatMap(...)

The `flatMap` method if very similar to the `map` methods.
It is a used to map values that itself are Optionals to prevent Optional nesting (a "box in a box").

```java
String activityName = api.getCachedUserById(123L) // Optional<User>
        .flatMap(User::getActivity) // Optional<Activity>
        .map(Activity::getName) // Optional<String>
        .orElse("None"); // String
```

Without `flatMap`, the code would look like this:
```java
String activityName = api.getCachedUserById(123L) // Optional<User>
        .map(User::getActivity) // Optional<Optional<Activity>>
        .filter(Optional::isPresent) // Optional<Optional<Activity>>
        .map(Optional::get) // Optional<Activity>
        .map(Activity::getName) // Optional<String>
        .orElse("None"); // String
```

## :books: Further Read

This tutorial only focused on the absolute basics.
For an in-depth introduction to Optionals, you can take a look at
[Oracle's article about optionals](https://www.oracle.com/technical-resources/articles/java/java8-optional.html).

