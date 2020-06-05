---
keywords:
- ratelimits
---

# Ratelimits

Ratelimits is a Discord restriction which prevents you from performing actions in a very fast rate.
Most ratelimits are on a per-channel or a per-server basis.

## :exclamation: The Most Important Ratelimits

| Action               | Ratelimit | Type        |
| -------------------- | --------- | ----------- |
| Send Messages        | 5 / 5s    | per channel |
| Delete Messages      | 5 / 1s    | per channel |
| Add/Remove Reactions | 1 / 0.25s | per channel |
| Edit Server Members  | 10 / 10s  | per server  |
| Edit Member Nickname | 1 / 1s    | per server  |
| Edit Bot Username    | 2 / 1h    | per account |
| All Actions Combined | 50 / 1s   | per account |

## :muscle: Dealing with Ratelimits

Usually Javacord takes care about these limitations for you. 
As a user, there's nothing you have to do, but you should at least know that ratelimits exist.

### Example

The following code
```java
// Who even needs loops?
channel.sendMessage("Ratelimit Example #1");
channel.sendMessage("Ratelimit Example #2");
channel.sendMessage("Ratelimit Example #3");
channel.sendMessage("Ratelimit Example #4");
channel.sendMessage("Ratelimit Example #5");
channel.sendMessage("Ratelimit Example #6");
channel.sendMessage("Ratelimit Example #7");
channel.sendMessage("Ratelimit Example #8");
channel.sendMessage("Ratelimit Example #9");
channel.sendMessage("Ratelimit Example #10");
channel.sendMessage("Ratelimit Example #11");
channel.sendMessage("Ratelimit Example #12");
```

would look like this in the client:

>![](https://i.imgur.com/ailPCdH.gif)

You can clearly see the delay between every 5 sent messages.

## :x: Can I disable ratelimits?

No. Ratelimits are a limitation from Discord itself, which you cannot circumvent.