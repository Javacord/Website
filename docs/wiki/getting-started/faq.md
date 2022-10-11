---
keywords:

- faq
- ...
- deploy
- code not working
- ask a question
- library difference
---

# Frequently Asked Questions

Here you will find answers to some of the most asked questions.

## Q: Why do I receive empty (no content) messages in i.e. the MessageCreateListener?

You are missing the privileged `MESSAGE_CONTENT` intent. For more information of how to enable privileged intents and enable them in your code see [Gateway Intents](../basic-tutorials/gateway-intents.md).  

## Q: What is `...` in the code examples?

You have to replace the `...` with an instance that can be assigned to the datatype seen left. 

For example, if you see `TextChannel channel = ...`, you have to replace `...` with an instance that is a TextChannel which you can get from the API `api.getTextChannelById(CHANNEL_ID)` (note this returns an [Optional](../essential-knowledge/optionals)\<TextChannel\>) or from an event like `messageCreateEvent.getChannel()`.

## Q: Why is my code not working?

There are multiple reasons why your code might not work. The most common ones are:

1. Your code is not being reached. So make sure your code actually gets executed with a print statement or a debugger.
2. Add at least [`.exceptionally(ExceptionLogger.get())`](../essential-knowledge/completable-futures.html#exceptionally) to every [CompletableFuture](../essential-knowledge/completable-futures) (like when sending a message) to show any exceptions that might come from Discord.
3. Methods like `User#getRoles(Server)` do not return the roles of the user. To fix this make sure to add the `GUILD_MEMBERS` [intent](../basic-tutorials/gateway-intents).
4. You are getting a `NoSuchElementException`. Congratulations, you have killed a kitten! You are most likely getting this Exception because you handle [Optionals](../essential-knowledge/optionals) wrong. Read the article on [Optionals](../essential-knowledge/optionals) to learn how to use them correctly.

If none of these tips will help you, you can ask your question in our [Discord Server](https://discord.gg/javacord).

### How to properly ask a question to get fast support?
Don't ask:
```text:no-line-numbers
Why is my code not working?
//Code
```

```text:no-line-numbers
Why am I getting Exception X?
```

To ensure all information is provided that is needed to solve your issue, you should ask your question in a format like:
```text:no-line-numbers
I have an issue with:   YOUR_ISSUE
I want to do:           WHAT_YOU_WANT_TO_DO
Currently this happens: WHAT_HAPPENS_NOW

//Code

//Exception
The exception is thrown in the following line(not the number): CODE_LINE
```

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