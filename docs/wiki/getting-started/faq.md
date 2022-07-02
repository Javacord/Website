---
keywords:

- faq
- ...
- deploy
- library difference
---

# Frequently Asked Questions

Here you will find answers to some of the most asked questions.

## Q: What is `...` in the code examples?

You have to replace the `...` with an instance that can be assigned to the datatype seen left. 

For example, if you see `TextChannel channel = ...`, you have to replace `...` with an instance that is a TextChannel which you can get from the API `api.getTextChannelById(CHANNEL_ID)` (note this returns an [Optional](../essential-knowledge/optionals)\<TextChannel\>) or from an event like `messageCreateEvent.getChannel()`.

## Q: How do I properly deploy my bot?

When using Gradle you can apply the [`application`](https://docs.gradle.org/current/userguide/application_plugin.html) plugin. This will add a few new tasks in the `distribution` group 
* **distTar**
  * Creates a tar archive with your properly packaged bot. You can find it in `./build/distributions`
* **distZip**
  * Creates a zip archive with your properly packaged bot. You can find it in `./build/distributions`
* **installDist**
  * The same as the other 2 tasks but your bot will not be inside an archive. You can find it in `./build/install`

After extracting your bot from an archive, execute one script in the `./bin/` folder. Either the `.bat` for a Windows and the other for a `UNIX` environment

## Q: What differs Javacord from JDA and D4J?

While all 3 libraries are Wrappers for the programming language Java, they use different techniques and concepts for their API.
* **Javacord**: Uses Java classes for its API like [CompletableFuture](../essential-knowledge/completable-futures) for async requests and [Optional](../essential-knowledge/optionals) for return types which may be `null`. 
  * Sending a Message: `channel.sendMessage("Javacord")`
  * Checking if the Author of a message is a user: `message.getMessageAuthor().asUser().isPresent()`
* **JDA**: Has its own wrapper to execute requests and returns `null` if values are not present.
  * Sending a Message: `channel.sendMessage("JDA").queue()`
  * Checking if the Author of a message is a user: `message.getMember() != null`
* **Discord4J**: Takes on the `reactive` approach. 
  * Sending a Message: `channel.createMessage("Pong!").block();`