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
All this is a bit confusing :thinking: so let's break it down!

## :bone: Basics
To start using the embed builder, you need to instantiate it like any other class and then you can start acessing it's methods. We'll go through the basic ones here:

* `EmbedBuilder.setTitle("")`- Most of the time you will want a title for your embed, won't you :question: This sets the title of the embed, the top-most words in the embed.

* `EmbedBuilder.setDescription("")`- This sets the description, this is like the subtitle of your embed if you will. It is displayed right after the title.

* `EmbedBuilder.addFeild("", "", false)`- So if you want more subtitles than your description, This is the way to do that! thats cool and all, but what are the 3 parameters? The first one is the subtitle of the feild and the second one is the content of that subtitle, and the third one is a boolean that will change the position of the subtitle, suppose there are 2 of these "feilds" and you want them to go side by side then just set both (or any one) to have the inline value (the last parameter) to true and it will display it on the same line! Alternatively you can also use the dedicated method, `EmbedBuilder.addInlineFeild("");` to do the work of the last parameter in the `EmbedBuilder.addFeild("")`

* `EmbedBuilder.setFooter("", "")`- This sets the bottom-most text in the embed, There is also an optional last parameter, which is a url for a image that will be displayed beside the text at the bottom

* `EmbedBuilder.setColor(Color)`- This setts the color on the side of the embed... The way you use it is create a new color class, like so: `Color embedColor = new Color(r, g, b)` and put the RGB (ints) values in the constructor, and then use that variable in the `setColor()`. One neat perk, if you use intellij idea is that you have a integrated color picker when you use the constructor to set the color. Alternatively you can also use the predefined colors like a `Color.RED` and many others. 

## :gear: Advanced topics
These are some of the more rarely used but still useful methods:

* `EmbedBuilder.setImage("")`- Adds an Image to the bottom of the embed, This can edither be a link to a image on the web or one stored on your computer.

* `EmbedBuilder.setThumbnail("")`- Adds an image to the embed but this time at the right side of it! aThis can either be a link or a local file.

* `EmbedBuilder.setAuthor("", "")`- This adds text to the top of the embed (above the title), you can make it dynamic by using `event.getMessageAuthor().getDisplayName();`, It has an optional second parameter which can be an image much like the footer.

* `EmbedBuilder.setTimestampToNow()`- Sets the Timestamp of the embed to be the current time.

* `EmbedBuilder.getTimestamp()`- gets the timesStamp of the embed, useful for when you have to add a footer and set it to the time the message was sent.


## :camera: Supported Image Sources

By default, Discord expects embed images to be a link (e.g., the image link used in `setFooter(...)`), but you can also use attachments for images.
If you provide a non-url image source (e.g. the `puppy.jpg` file used in `setImage(...)`), Javacord automatically uploads them as an attachment to the message and uses this attachment for the embed.

## :lock: Embed Limits

| Type         | Limit           |
| ------------ | --------------- |
| Title        | 256 characters  |
| Description  | 2048 characters |
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
