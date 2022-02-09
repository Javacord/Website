---
keywords:
- interaction
- slash command
---
# Interaction Commands aka. Slash Commands
::: tip INFO
There are a lot of convenient methods which aim to make your life easier with i.e., not
being able to have an invalid configuration of your builder.
Therefore, the following examples will only show the usage with the **convenient methods**.
:::
## :bulb: Creating a Command
  
::: tip INFO
There are 2 different types of Commands:
- Global | Available for every Server once your Bot gets invited: Created with `createGlobal(DiscordApi)`.
- Server | Only available on the specific Server: Created with `createForServer(Server)`.
:::

Let's get started with the most basic command, a **ping** command.
``` java
SlashCommand command = SlashCommand.with("ping", "Checks the functionality of this command")
    .createGlobal(api)
    .join();
```

That's all you have to do!

Let's have a look at a more complex command which involves nearly all possibilities:

``` java
SlashCommand command =
        SlashCommand.with("channel", "A command dedicated to channels",
            Arrays.asList(
                SlashCommandOption.createWithOptions(SlashCommandOptionType.SUB_COMMAND_GROUP, "edit", "Edits a channel",
                    Arrays.asList(
                        SlashCommandOption.createWithOptions(SlashCommandOptionType.SUB_COMMAND, "allow", "Allows a permission to a user for a channel",
                            Arrays.asList(
                                SlashCommandOption.create(SlashCommandOptionType.CHANNEL, "CHANNEL", "The channel to modify", true),
                                SlashCommandOption.create(SlashCommandOptionType.USER, "USER", "The user which permissions should be changed", true),
                                SlashCommandOption.createWithChoices(SlashCommandOptionType.INTEGER, "PERMISSION", "The permission to allow", true,
                                    Arrays.asList(
                                        SlashCommandOptionChoice.create("MANAGE", 0),
                                        SlashCommandOptionChoice.create("SHOW", 1)))
        ))))))
        .createGlobal(api)
        .join();
```

Let that sink in first!

What are we doing here?
1. We create a base command called `channel`.
2. It has a SUB_COMMAND_GROUP called `edit` which basically is just a folder where you can put your commands in.
3. There's a SUB_COMMAND called `allow` which is our actual command. Therefore, our complete argument looks like `channel edit allow`.
4. The SUB_COMMAND has 3 arguments:
    1. The channel which should be edited.
    2. The user which permissions should be changed.
    3. A predefined list of available permissions the command executor can choose of.
    
![](https://i.imgur.com/Qb9lgqb.png)

### :notebook_with_decorative_cover: Notes on creating commands:

#### The `REQUIRED` attribute
You can only mark the **last** argument as being **not required**. This means it can be optionally set by the command executor.
In the above example you could i.e. set the `PERMISSIONS` argument to `false`.

#### Command structure
Your command has to follow these structures in order to be successfully created:

::: details Command structure
```
VALID

command
|
|__ subcommand
|
|__ subcommand

----

command
|
|__ subcommand-group
    |
    |__ subcommand
|
|__ subcommand-group
    |
    |__ subcommand


-------

INVALID


command
|
|__ subcommand-group
    |
    |__ subcommand-group
|
|__ subcommand-group
    |
    |__ subcommand-group

----

INVALID

command
|
|__ subcommand
    |
    |__ subcommand-group
|
|__ subcommand
    |
    |__ subcommand-group
```
:::
## :arrow_heading_down: Get your commands
All global commands:
``` java
List<SlashCommand> commands = api.getGlobalSlashCommands().join();
```
All commands only available on a single server:
``` java
Server server = ...;
List<SlashCommand> commands = api.getServerSlashCommands(server).join();
```
::: warning
Getting all commands from a server only contains the commands you have created on this specific server. 
Therefore, the returned list does not include any global command!
:::

## :hammer: Updating Commands
When updating your commands you only have to include what you actually want to change. 
The following updater will change the previous created command and change its base name from `channel` to `channels`. 
``` java
SlashCommand updatedCommand =
            new SlashCommandUpdater(commandId)
                .setName("channels")
                .updateGlobal(api)
                .join();
```

## :writing_hand: Bulk overwriting commands
If you have to update / create multiple commands at once it advised to use the batch updater to only have to do 1 request.
``` java
DiscordApi api = ...;

api.bulkOverwriteGlobalSlashCommands(Arrays.asList(
    new SlashCommandBuilder().setName("server").setDescription("A command for the server"),
    new SlashCommandBuilder().setName("permission").setDescription("A command for permissions")))
.join();
```

## :speech_balloon: Responding to commands
The following example responds to the previous created command to update the permissions of a channel
``` java
api.addSlashCommandCreateListener(event -> {
    SlashCommandInteraction slashCommandInteraction = event.getSlashCommandInteraction();
    ServerChannel channel = slashCommandInteraction.getOptionChannelValueByIndex(0).orElse(null);
    User user = slashCommandInteraction.getOptionUserValueByIndex(1).orElse(null);
    Long permissionNumber = slashCommandInteraction.getOptionLongValueByIndex(2).orElse(null);

    // Update channel permissions...

    slashCommandInteraction.createImmediateResponder()
            .setContent("The channels permissions have been updated")
            .respond();
});
```

::: tip INFO
Note that you have to respond withing 3 seconds, or the command will fail. If you need longer than 3 seconds you have to 
respond with `respondLater()` which allows you to respond within 15 minutes. 
If you respond later you can send a followup message, described below.
:::

### Sending followup messages
Followup messages can be sent within 15 minutes after the command has been invoked. You can send as many followup messages as you want.
``` java
api.addSlashCommandCreateListener(event -> {
    SlashCommandInteraction slashCommandInteraction = event.getSlashCommandInteraction();
    slashCommandInteraction.respondLater().thenAccept(interactionOriginalResponseUpdater -> {
        interactionOriginalResponseUpdater.setContent("You will receive the answer in a few minutes!").update();

        // time < 15 minutes
        slashCommandInteraction.createFollowupMessageBuilder()
                .setContent("Thank you for your patience, it took a while but the answer to the universe is 42")
                .send();
    });
});
```

## :policeman: Permissions
Permissions exist to enable / disable the usage of your commands for certain things. These things may be:
- Globally
- Users
- Roles

Already when you create a command you can define whether you want to enable it by default for all server once your bot gets invited.
By default, all commands you create are enabled for everyone. With the following code sniped you can disable your command for everyone.
This includes users, roles, server administrators and even server owners!
``` java
SlashCommand.with("ping","Ping!")
    .setDefaultPermission(false)
    .createGlobal(api)
    .join();
```
### Updating permissions of a single command
If you want to update the permissions of your command, you have to use the Permissions Updater.
The following will disable the usage of a command for a user and a role:
``` java
long USER_ID = ...;
long ROLE_ID = ...;
long COMMAND_ID = ...;

new ApplicationCommandPermissionsUpdater(server)
    .setPermissions(Arrays.asList(
        ApplicationCommandPermissions.create(USER_ID, ApplicationCommandPermissionType.USER, false),
        ApplicationCommandPermissions.create(ROLE_ID, ApplicationCommandPermissionType.ROLE, false)))
.update(COMMAND_ID)
.join();
```

### Updating multiple command permissions at once
If updating multiple command permissions at once it is advised to batch overwrite them in order to do only 1 request.
The previous code snipped converted to the batch updater look like:
``` java
long USER_ID = ...;
long ROLE_ID = ...;
long COMMAND_ID = ...;

ServerSlashCommandPermissionsBuilder builder1 = new ServerSlashCommandPermissionsBuilder(COMMAND_ID,
        SlashCommandPermissions.create(USER_ID, SlashCommandPermissionType.USER, false));
ServerSlashCommandPermissionsBuilder builder2 = new ServerSlashCommandPermissionsBuilder(COMMAND_ID,
        SlashCommandPermissions.create(ROLE_ID, SlashCommandPermissionType.ROLE, false));

api.batchUpdateSlashCommandPermissions(server, Arrays.asList(builder1, builder2)).join();
```

## :exclamation: Limits
### Registering a command
- Server commands are specific to the server you specify when making them. Server commands are not available in DMs. Command names are unique per application within each scope (global and server). That means:
- Your app cannot have two global commands with the same name
- Your app cannot have two server commands within the same name on the same guild
- Your app can have a global and guild command with the same name
- Multiple apps can have commands with the same names
### General
- An app can have up to 100 top-level global commands with unique names
- An app can have up to an additional 100 server commands per server
- An app can have up to 25 subcommand groups on a top-level command
- An app can have up to 25 subcommands within a subcommand group
- Commands can have up to 25 options
- Options can have up to 25 choices
- Maximum of 4000 characters for combined name, description, and value properties for each command and its subcommands and groups
- Limitations on nesting subcommands and groups
- Global rate limit of 200 slash command creates per day per server
