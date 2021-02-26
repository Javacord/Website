---
keywords:
- create messages
- message creation
- sendMessage
---

# Using the MessageBuilder

The `MessageBuilder` class is a more powerful alternative to the `TextChannel#sendMessage(...)` method.

It can be used to construct more complex messages and supports some additional features that are not possible
with a simple `TextChannel#sendMessage(...)` call.

## :female_detective: Example

The following code
```java
new MessageBuilder()
    .append("Look at these ")
    .append("awesome", MessageDecoration.BOLD, MessageDecoration.UNDERLINE)
    .append(" animal pictures! 😃")
    .appendCode("java", "System.out.println(\"Sweet!\");")
    .addAttachment(new File("C:/Users/Bastian/Pictures/kitten.jpg"))
    .addAttachment(new File("C:/Users/Bastian/Pictures/puppy.jpg"))
    .setEmbed(new EmbedBuilder()
            .setTitle("WOW")
            .setDescription("Really cool pictures!")
            .setColor(Color.ORANGE))
    .send(channel);
```
will be displayed like this:

 ![](https://i.imgur.com/AP1cjDf.png)
