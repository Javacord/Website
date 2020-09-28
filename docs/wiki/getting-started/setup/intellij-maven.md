# IntelliJ + Maven

This tutorial provides a beginner-friendly click by click guide to set up Javacord with Intellij and Maven.
If you are already familiar with IntelliJ and Maven, you can just see the artifact locations at [Download / Installation](/wiki/getting-started/download-installation.md).

::: tip Info
We recommend to use [Intellij + Gradle](./intellij-gradle.md) unless you already have experience with one of the other IDEs or build managers.
::: 

## :wrench: Setup

#### **1.** Start IntelliJ

#### **2.** Create a new project (`File` -> `New` -> `Project`)

![](https://i.imgur.com/Twz9SlW.png)

#### **3.** Select `Maven`

#### **4.** Make sure to select an SDK which is 1.8 (or greater)

#### *5.** Click `Next`

![](https://i.imgur.com/OGDuITx.png)

#### **6.** Enter a group id (e.g. `com.github.yourname`)

#### **7.** Enter an artifact id (e.g. `myfirstbot`)

#### **8.** Click `Next`

![](https://i.imgur.com/kWoutrk.png)

#### **9.** Click on `Finish`

![](https://i.imgur.com/pXwWMbi.png)

#### **10.** Your project should now look like this. First click on `Enable Auto-Import`

![](https://i.imgur.com/PXZ6aww.png)

#### **11.** Now you have to add Javacord as a dependency by editing the pom.xml file. Your file should now look like this:

<LatestVersionInfo/>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>your.package.name</groupId>
    <artifactId>myfirstbot</artifactId>
    <version>1.0-SNAPSHOT</version>

    <dependencies>
        <dependency>
            <groupId>org.javacord</groupId>
            <artifactId>javacord</artifactId>
            <version>$latest-version</version>
            <type>pom</type>
        </dependency>
    </dependencies>

</project>
```

#### **12.** Create a new package

![](https://i.imgur.com/EtgpIok.png)
![](https://i.imgur.com/P4e3RwT.png)

#### **13.** Create a new class inside this package

![](https://i.imgur.com/VVnLssf.png)
![](https://i.imgur.com/nyl3Jit.png)

#### **14.** You can now start coding! Example code:

```java
package com.github.yourname;

import org.javacord.api.DiscordApi;
import org.javacord.api.DiscordApiBuilder;

public class Main {

    public static void main(String[] args) {
        // Insert your bot's token here
        String token = "your token";

        DiscordApi api = new DiscordApiBuilder().setToken(token).login().join();

        // Add a listener which answers with "Pong!" if someone writes "!ping"
        api.addMessageCreateListener(event -> {
            if (event.getMessageContent().equalsIgnoreCase("!ping")) {
                event.getChannel().sendMessage("Pong!");
            }
        });

        // Print the invite url of your bot
        System.out.println("You can invite the bot by using the following url: " + api.createBotInvite());
    }
    
}
```

## :running_woman: Run the code

You can run your code by clicking on the small green arrow
![](https://i.imgur.com/USGlewm.png)

## :construction: Possible problems

**Note:** If you get the following error:
![](https://i.imgur.com/Q34zZpb.png)

you have to change your language level to `1.8`

![](https://i.imgur.com/IwQ5LN8.png)