# Lambdas

As Javacord heavily benefits from [lambda expressions](https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html), this introduction gives you a quick overview, if you are not familiar with lambdas. Lambdas are used as a short form of [functional interface](https://docs.oracle.com/javase/8/docs/api/java/lang/FunctionalInterface.html) implementations.
Functional interfaces, are basically just interfaces with a single method definition. All listeners in Javacord, for example, are functional interfaces and look like this internally (simplified):
```java
/**
 * This listener listens to message creations.
 */
@FunctionalInterface
public interface MessageCreateListener {

    /**
     * This method is called every time a message is created.
     *
     * @param event The event.
     */
    void onMessageCreate(MessageCreateEvent event);

}
```

Before Java 8, you would have implemented this kind of listener as an [anonymous class](https://docs.oracle.com/javase/tutorial/java/javaOO/anonymousclasses.html), which would look like this:
```java
api.addMessageCreateListener(new MessageCreateListener() {
    @Override
    public void onMessageCreate(MessageCreateEvent event) {
        // Do stuff
        event.deleteMessage();
    }
});
```
In Java 8, this can be replaced with a lambda expression, which does exactly the same thing, but shortens your code. The method parameter (in this case `event`) is written in front of the `->` arrow, and the method body is written after it.
```java
api.addMessageCreateListener(event -> {
    // Do stuff
    event.deleteMessage();
});
```

::: tip
If the method has more than one parameter, it would look like this: `(param1, param2) -> { ... }`
:::

There's even a shorter version: if you are only executing one statement, you can get rid of the `{ }` brackets as well:
```java
api.addMessageCreateListener(event -> event.deleteMessage());
```
However, the above method can be shortened even more, by replacing the lambda expression with a so called "[method reference](https://docs.oracle.com/javase/tutorial/java/javaOO/methodreferences.html)".
```java
api.addMessageCreateListener(MessageEvent::deleteMessage);
```

There are also plenty classes in Java 8, which benefit from lambda expressions. One example would be the Optional class, which is explained [here](/wiki/essential-knowledge/working-with-optionals/).