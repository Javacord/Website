---
keywords:
- interaction
- component
- button
- actionrow
---
# Message Components
## :grey_question: What are components?
Components are interactive elements like buttons or hidden elements like the ActionRow which use is for displaying the visible components. You can add them to a message and interact with users in a very convenient way.
Currently, the only interactive components available at the moment are buttons. They differ in style and behaviour(link redirect) seen in the picture below:
![](https://support.discord.com/hc/article_attachments/1500019725621/buttons.png)
## :bulb: Sending a message with a component
Sending a component with your message is a simple as that:
``` java
TextChannel channel = ...;

new MessageBuilder()
    .setContent("Click on one of these Buttons!")
    .addComponents(
        ActionRow.of(Button.success("success", "Send a message"),
            Button.danger("danger", "Delete this message"),
            Button.secondary("secondary", "Remind me after 5 minutes")))
    .send(channel);
```
![](https://i.imgur.com/5tMCePH.png)

You simply add a High Level component like an ActionRow which is a container for displaying your components.
In turn the ActionRow consist of the components you can interact with like Buttons.

## :speech_balloon: Responding to component interactions
The following code snipped shows how you can respond to the previously created example:
``` java
api.addMessageComponentCreateListener(event -> {
    MessageComponentInteraction messageComponentInteraction = event.getMessageComponentInteraction();
    String customId = messageComponentInteraction.getCustomId();

    switch (customId) {
        case "success":
            messageComponentInteraction.createImmediateResponder()
                    .setContent("You clicked a button!")
                    .respond();
            break;
        case "danger":
            messageComponentInteraction.getMessage().ifPresent(Message::delete);
            break;
        case "secondary":
            messageComponentInteraction.respondLater().thenAccept(interactionOriginalResponseUpdater -> {
                //Code to respond after 5 minutes
            });
            break;
    }
});
```
*Note: once you receive a message component interaction you* ***must*** *respond with `createImmediateResponder` to send a message or `respondLater`, otherwise the interaction will fail.*