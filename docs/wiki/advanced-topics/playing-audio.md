---
keywords:
- audio
- music
- voice
---

# Playing Audio

::: warning
Support for audio was added to Javacord very recently.
If you encounter any bugs, please [create an issue on GitHub](https://github.com/Javacord/Javacord/issues/new)!
:::

Javacord allows your bot to connect to voice channels and play audio (e.g., music).
This short tutorial gives you an introduction on how to connect to a voice channel and play your 
[favorite music](https://youtu.be/qRC4Vk6kisY).

## :electric_plug: Connect to a voice channel

Connecting to a voice channel is very straight forward:
Calling `#connect()` on an instance of `ServerVoiceChannel` will connect your bot to this voice channel and
return a [future](/wiki/essential-knowledge/completable-futures/) with an `AudioConnection` object.

### Example

The following example will connect the bot to the voice channel of the user that typed `!music` in the chat:

```java
ServerVoiceChannel channel = ...;
channel.connect().thenAccept(audioConnection -> {
    // Do stuff
}).exceptionally(e -> {
    // Failed to connect to voice channel (no permissions?)
    e.printStackTrace();
    return null;
});
```

## :ear: Playing music

There are plenty of sources for audio (e.g., YouTube, local files, etc.).
The current de facto standard library for extracting audio from these sources with Java is the
[LavaPlayer](https://github.com/sedmelluq/lavaplayer) library.

To use it with Javacord, you have to add it as a dependency to your project (e.g., with Gradle or Maven) and
create a Javacord audio source like this:

```java
public class LavaplayerAudioSource extends AudioSourceBase {

    private final AudioPlayer audioPlayer;
    private AudioFrame lastFrame;

    /**
     * Creates a new lavaplayer audio source.
     *
     * @param api A discord api instance.
     * @param audioPlayer An audio player from Lavaplayer.
     */
    public LavaplayerAudioSource(DiscordApi api, AudioPlayer audioPlayer) {
        super(api);
        this.audioPlayer = audioPlayer;
    }

    @Override
    public byte[] getNextFrame() {
        if (lastFrame == null) {
            return null;
        }
        return applyTransformers(lastFrame.getData());
    }

    @Override
    public boolean hasFinished() {
        return false;
    }

    @Override
    public boolean hasNextFrame() {
        lastFrame = audioPlayer.provide();
        return lastFrame != null;
    }

    @Override
    public AudioSource copy() {
        return new LavaplayerAudioSource(getApi(), audioPlayer);
    }
}
```

With this audio source, you can now start using Lavaplayer, e.g. to play a YouTube video:
```java
// Create a player manager
AudioPlayerManager playerManager = new DefaultAudioPlayerManager();
playerManager.registerSourceManager(new YoutubeAudioSourceManager());
AudioPlayer player = playerManager.createPlayer();

// Create an audio source and add it to the audio connection's queue
AudioSource source = new LavaplayerAudioSource(api, player);
audioConnection.setAudioSource(source);

// You can now use the AudioPlayer like you would normally do with Lavaplayer, e.g.,
playerManager.loadItem("https://www.youtube.com/watch?v=NvS351QKFV4", new AudioLoadResultHandler() {
    @Override
    public void trackLoaded(AudioTrack track) {
        player.playTrack(track);
    }

    @Override
    public void playlistLoaded(AudioPlaylist playlist) {
        for (AudioTrack track : playlist.getTracks()) {
            player.playTrack(track);
        }
    }

    @Override
    public void noMatches() {
        // Notify the user that we've got nothing
    }

    @Override
    public void loadFailed(FriendlyException throwable) {
        // Notify the user that everything exploded
    }
});
```
