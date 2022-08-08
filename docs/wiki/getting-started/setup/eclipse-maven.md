# Eclipse + Maven
<ClientOnly>
    <LatestVersion/>
</ClientOnly>
This tutorial provides a beginner-friendly click by click guide to set up Javacord with Eclipse and Maven.
If you are already familiar with Eclipse and Maven, you can just see the artifact locations at [Download / Installation](/wiki/getting-started/download-installation.md).

::: tip Info
We recommend to use [Intellij + Gradle](./intellij-gradle.md) unless you already have experience with one of the other IDEs or build managers.
::: 

## :wrench: Setup

#### **1.** Start Eclipse

#### **2.** Create a new project (`File` -> `New` -> `Project`)

![](https://i.imgur.com/hYeYxen.png)

#### **3.** Select `Maven Project`

#### **4.** Click `Next`

![](https://i.imgur.com/CeHy9HK.png)

#### **5.** Check `Create a simple project`

#### **6.** Click `Next`

![](https://i.imgur.com/xxbGmr6.png)

#### **7.** Enter a group id (e.g. `com.github.yourname`)

#### **8.** Enter an artifact id (e.g. `myfirstbot`)

#### **9.** Click `Finish`

![](https://i.imgur.com/JSV9yrl.png)

#### **10.** Double click on the `pom.xml` file

![](https://i.imgur.com/NCAALIt.png)

#### **11.** Select `pom.xml`

![](https://i.imgur.com/kbdtiLJ.png)

#### **12.** Now you have to add Javacord as a dependency by editing the pom.xml file. Your file should now look like this:

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

#### **13.** Create a new package inside the `src/main/java` folder

![](https://i.imgur.com/Z1QNuQf.png)
![](https://i.imgur.com/RKJc0yU.png)

#### **14.** Create a new class inside this package

![](https://i.imgur.com/eUmumlz.png)
![](https://i.imgur.com/GsPFaag.png)

#### **15.**  Save the project (you should do this from time to time)

![](https://i.imgur.com/Ht5UT8S.png)

#### **16.** Now you can start coding! Example code:

```java
package com.github.yourname.myfirstbot;

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
![](https://i.imgur.com/rsIHH9M.png)