---
keywords:
- interaction
- component
- button
- actionrow
- selectmenus
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

This works for Select Menus as well:

``` java
TextChannel channel = ...;

new MessageBuilder()
    .setContent("Select an option of this list!")
    .addComponents(
        ActionRow.of(SelectMenu.create("options", "Click here to show the options", 1, 1,
            Arrays.asList(SelectMenuOption.create("Option One", "You selected Option One!", "Click here to select Option One"),
                SelectMenuOption.create("Option Two", "You selected Option Two!", "Click here to select Option Two"),
                SelectMenuOption.create("Option Three", "You selected Option Three!", "Click here to select Option Three")))))
    .send(channel);
```
![](https://i.imgur.com/bhcGjCN.png)

![](https://i.imgur.com/ZlviGPe.png)
