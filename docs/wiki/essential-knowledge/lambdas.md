# Lambdas

Lambdas are used to implement [functional interfaces](https://docs.oracle.com/javase/8/docs/api/java/lang/FunctionalInterface.html).
Simply said, functional interfaces are interfaces with a single method definition.
All listeners in Javacord are functional interfaces and look like this internally (simplified):

```java
@FunctionalInterface
public interface MessageCreateListener {
    void onMessageCreate(MessageCreateEvent event);
}
```

Before Java 8, you would have implemented this kind of listener as an [anonymous class](https://docs.oracle.com/javase/tutorial/java/javaOO/anonymousclasses.html), which would look like this:

```java
api.addMessageCreateListener(new MessageCreateListener() {
    @Override
    public void onMessageCreate(MessageCreateEvent event) {
        // Do stuff
        event.pinMessage();
    }
});
```

In Java 8, this can be replaced with a lambda expression, which does exactly the same thing, but in a more readable fashion. 
The method parameter (in this case `event`) is written in front of the `->` arrow, and the method body is written after it.

```java
api.addMessageCreateListener(event -> {
    // Do stuff
    event.pinMessage();
});
```

::: tip
If the method has more than one parameter, it would look like this: 
```java
(param1, param2) -> { ... }
```
:::

There's even a shorter version: If you are only executing one statement, you can get rid of the `{ }` brackets as well:
```java
api.addMessageCreateListener(event -> event.pinMessage());
```

However, the above method can be shortened even more, by replacing the lambda expression with a so called "[method reference](https://docs.oracle.com/javase/tutorial/java/javaOO/methodreferences.html)".
```java
api.addMessageCreateListener(MessageEvent::pinMessage);
```

There are also plenty classes in Java 8, that make use of lambda expressions.
One example would be the Optional class, which is explained [here](/wiki/essential-knowledge/optionals/).

## :books: Further Read

This tutorial only focused on the absolute basics.
For an in-depth introduction to lambda expressions, you can take a look at
[Oracle's article about lambda expressions](https://www.oracle.com/technical-resources/articles/java/architect-lambdas-part1.html).

