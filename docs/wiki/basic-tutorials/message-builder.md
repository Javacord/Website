---
keywords:
- create messages
- message creation
- sendMessage
---

# Using the MessageBuilder

The `MessageBuilder` class is a more powerful alternative to the `TextChannel#sendMessage(...)` method.

I can be used to construct more complex messages and supports some additional features that are not possible
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
 
## :round_pushpin: Allowed Mentions

The allowed mentions object lets you control what should be mentioned (pinged) in a message if it contains mentions.

The following code will ping:
- The user0
- All mentioned roles in the message

And will not ping:
- @everyone and @here
- The user1

```java
AllowedMentions allowedMentions = new AllowedMentionsBuilder()
                .addUser(user0.getId())
                .setMentionRoles(true)
                .setMentionEveryoneAndHere(false)
                .build();

        new MessageBuilder()
                .setAllowedMentions(allowedMentions)
                .append(user0.getMentionTag())
                .append(user1.getMentionTag())
                .append(role.getMentionTag())
                .append(role2.getMentionTag())
                .append("@everyone")
                .send(channel);
```

If you add a user to the mentions object and set `setMentionUsers(true)` it will ping every mentioned user. The same applies for `setMentionRoles(true)`
