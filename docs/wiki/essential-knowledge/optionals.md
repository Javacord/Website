# Optionals

::: warning
This tutorials assumes you are familiar with lambda expressions. Take a look at the [Lambda Introduction](https://javacord.org/wiki/essential-knowledge/lambda-introduction) first, if you are not!
:::

The Optional class is widely used in Javacord. Basically, every method which might return a `null` value will return an Optional in Javacord instead. Optionals will help you to avoid NullPointerExceptions and make very clear if a method may not have a result. Here's a small example:

**The old way of doing it**
```java
User user = api.getCachedUserById(123L);
if (user != null) {
  user.sendMessage("Hi!");
}
```
**The new way of doing it**
```java
api.getCachedUserById(123L).ifPresent(user -> user.sendMessage("Hi!"));
```

## :open_book: Methods

The Optional class has a ton of useful methods which can all be found in the [JavaDocs](https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html). Here's a small explanation of the most important ones:
### get()

This method just returns the value of the Optional. You should only use this method if you are sure that the Optional contains a value, because it throws a `NoSuchElementException` if it does not contain a value.

**Example**
```java
TextChannel channel = api.getTextChannelById(123L).get();
channel.sendMessage("Hi");
```

### isPresent()

This method checks if the Optional contains a value.

**Example**
```java
Optional<TextChannel> channel api.getTextChannelById(123L);
if (channel.isPresent()) {
  // A text channel with the id 123 exists. It's safe to call #get() now
  channel.get().sendMessage("Hi");
}
```

### orElse(...)

This method returns the value of the Optional or the given "default" value if the Optional does not contain a value.

**Example**
```java
String name = user.getNickname(server).orElse(user.getName());
```

::: tip
In this case you could also just use `user.getDisplayName(server)`
:::

### ifPresent(...)

This is definitely one of the more interesting methods. It takes a [Consumer](https://docs.oracle.com/javase/8/docs/api/java/util/function/Consumer.html) as it's argument which is called if the Optional contains a value. Together with lambda expressions this can be a very handy method.

**Example**
```java
api.getTextChannelById(123L).ifPresent(channel -> channel.sendMessage("Hi!"));
```

### map(...)

This methods "converts" the type of an Optional. This might be useful, if the Optional does not contain the final value you need.

**Example**
```java
String currentGame = api.getYourself().getActivity().map(Activity::getName).orElse("None");
```

### filter(...)

This method filters the value of an Optional for additional criteria. E.g. if you only want a bot user by id.

**Example**
```java
Optional<User> botUser = api.getCachedUserById(123).filter(User::isBot);
```

## :memo: Self-Test

Just try to understand the following code. If you do, you won't have much trouble with Optionals. It won't get any harder. 🙂
```java
String currentGame = api.getCachedUserById(123)
        .map(User::getActivity)
        .filter(Optional::isPresent)
        .map(Optional::get)
        .map(Activity::getName)
        .orElse("None");
```

::: tip
Both `getCachedUserById(...)` and `getActivity(...)` return an Optional
:::

::: details Solution
```java
String currentGame = api.getUserById(123) // Gets an Optional<User>
        .map(User::getActivity) // "Converts"/Maps the user to a Optional<Activity>. The value is now Optional<Optional<Activity>>
        .filter(Optional::isPresent) // Checks if the activity (game) exists
        .map(Optional::get) // "Converts"/Maps the Optional<Optional<Game>> to Optional<Game>
        .map(Activity::getName) // "Converts"/Maps the activity object to the name of the activity (a String)
        .orElse("None"); // If the user does not exist or doesn't play a game, currentGame is "None"

```
:::