---
keywords:
- EmbedBuilder
- inline field
- setTitle
- setDescription
- setAuthor
- addField
- addInlineField
- setColor
- setFooter
- setImage
- setThumbnail
---

# Embeds

Embeds are attached to messages and have a special design.
The usually look like this:

![Embed](https://i.imgur.com/QYbXmQU.png)

## :hammer: Creating an Embed

Javacord provides an `EmbedBuilder` which can be used to create embeds:
```java
// Create the embed
EmbedBuilder embed = new EmbedBuilder()
    .setTitle("Title")
    .setDescription("Description")
    .setAuthor("Author Name", "http://google.com/", "https://cdn.discordapp.com/embed/avatars/0.png")
    .addField("A field", "Some text inside the field")
    .addInlineField("An inline field", "More text")
    .addInlineField("Another inline field", "Even more text")
    .setColor(Color.BLUE)
    .setFooter("Footer", "https://cdn.discordapp.com/embed/avatars/1.png")
    .setImage(new File("C:/Users/Bastian/Pictures/puppy.jpg"))
    .setThumbnail(new File("C:/Users/Bastian/Pictures/kitten2.png"));
// Send the embed
channel.sendMessage(embed);
```

## :camera: Supported Image Sources

By default, Discord expects embed images to be a link (e.g., the image link used in `setFooter(...)`), but you can also use attachments for images.
If you provide a non-url image source (e.g. the `puppy.jpg` file used in `setImage(...)`), Javacord automatically uploads them as an attachment to the message and uses this attachment for the embed.

## :lock: Embed Limits

| Type         | Limit           |
| ------------ | --------------- |
| Title        | 256 characters  |
| Description  | 4096 characters |
| Field Amount | Up to 25 fields |
| Field Name   | 256 characters  |
| Field Value  | 1024 characters |
| Footer Text  | 2048 characters |
| Author Name  | 256 characters  |

In addition to the limits above, the sum of all characters in an embed structure must not exceed 6000 characters.

## :question: FAQ

### What is the second parameter of `setAuthor(...)`?

```java
.setAuthor("Author Name", "http://google.com/", "https://cdn.discordapp.com/embed/avatars/0.png")
```
* First parameter: The name of the author
* Second parameter: A link for the author (e.g. their homepage). Can be `null`.
* Third parameter: The avatar of the author
> ![](https://i.imgur.com/SyE0e88.png)

### What's the difference between an inline field and a normal one?

Normal fields always start in a new line, whereas several inline fields can be in the same line.

### Can I change the placement of inline fields?

No, Discord does not allow different embed layouts.

### How do I add links with custom text?

Use the following syntax ``[custom text](link url)`` for example ``[Javacord](https://javacord.org/)``