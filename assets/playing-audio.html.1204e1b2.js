import{_ as c,r as t,o as i,c as l,a,b as s,w as u,d as n,e as o}from"./app.151ccb98.js";const r={},d=a("h1",{id:"playing-audio",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#playing-audio","aria-hidden":"true"},"#"),n(" Playing Audio")],-1),k={class:"custom-container warning"},v=a("p",{class:"custom-container-title"},"WARNING",-1),m=n("Support for audio was added to Javacord very recently. If you encounter any bugs, please "),b={href:"https://github.com/Javacord/Javacord/issues/new",target:"_blank",rel:"noopener noreferrer"},y=n("create an issue on GitHub"),h=n("!"),w=n("Javacord allows your bot to connect to voice channels and play audio (e.g., music). This short tutorial gives you an introduction on how to connect to a voice channel and play your "),_={href:"https://youtu.be/qRC4Vk6kisY",target:"_blank",rel:"noopener noreferrer"},f=n("favorite music"),g=n("."),A=a("h2",{id:"connect-to-a-voice-channel",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#connect-to-a-voice-channel","aria-hidden":"true"},"#"),n(" \u{1F50C} Connect to a voice channel")],-1),x=n("Connecting to a voice channel is very straight forward: Calling "),P=a("code",null,"#connect()",-1),S=n(" on an instance of "),L=a("code",null,"ServerVoiceChannel",-1),T=n(" will connect your bot to this voice channel and return a "),C=n("future"),F=n(" with an "),j=a("code",null,"AudioConnection",-1),N=n(" object."),M=o(`<h3 id="example" tabindex="-1"><a class="header-anchor" href="#example" aria-hidden="true">#</a> Example</h3><p>The following example will connect the bot to the voice channel of the user that typed <code>!music</code> in the chat:</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">ServerVoiceChannel</span> channel <span class="token operator">=</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">;</span>
channel<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenAccept</span><span class="token punctuation">(</span>audioConnection <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// Do stuff</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">exceptionally</span><span class="token punctuation">(</span>e <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// Failed to connect to voice channel (no permissions?)</span>
    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="playing-music" tabindex="-1"><a class="header-anchor" href="#playing-music" aria-hidden="true">#</a> \u{1F442} Playing music</h2>`,4),O=n("There are plenty of sources for audio (e.g., YouTube, local files, etc.). The current de facto standard library for extracting audio from these sources with Java is the "),V={href:"https://github.com/lavalink-devs/lavaplayer",target:"_blank",rel:"noopener noreferrer"},J=n("LavaPlayer"),E=n(" library."),I=o(`<p>To use it with Javacord, you have to add it as a dependency to your project (e.g., with Gradle or Maven) and create a Javacord audio source like this:</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LavaplayerAudioSource</span> <span class="token keyword">extends</span> <span class="token class-name">AudioSourceBase</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">AudioPlayer</span> audioPlayer<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">AudioFrame</span> lastFrame<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Creates a new lavaplayer audio source.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">api</span> A discord api instance.
     * <span class="token keyword">@param</span> <span class="token parameter">audioPlayer</span> An audio player from Lavaplayer.
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">LavaplayerAudioSource</span><span class="token punctuation">(</span><span class="token class-name">DiscordApi</span> api<span class="token punctuation">,</span> <span class="token class-name">AudioPlayer</span> audioPlayer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>api<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>audioPlayer <span class="token operator">=</span> audioPlayer<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">getNextFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>lastFrame <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token function">applyTransformers</span><span class="token punctuation">(</span>lastFrame<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">hasFinished</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">hasNextFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        lastFrame <span class="token operator">=</span> audioPlayer<span class="token punctuation">.</span><span class="token function">provide</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> lastFrame <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">AudioSource</span> <span class="token function">copy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">LavaplayerAudioSource</span><span class="token punctuation">(</span><span class="token function">getApi</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> audioPlayer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>With this audio source, you can now start using Lavaplayer, e.g. to play a YouTube video:</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token comment">// Create a player manager</span>
<span class="token class-name">AudioPlayerManager</span> playerManager <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultAudioPlayerManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
playerManager<span class="token punctuation">.</span><span class="token function">registerSourceManager</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">YoutubeAudioSourceManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">AudioPlayer</span> player <span class="token operator">=</span> playerManager<span class="token punctuation">.</span><span class="token function">createPlayer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Create an audio source and add it to the audio connection&#39;s queue</span>
<span class="token class-name">AudioSource</span> source <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LavaplayerAudioSource</span><span class="token punctuation">(</span>api<span class="token punctuation">,</span> player<span class="token punctuation">)</span><span class="token punctuation">;</span>
audioConnection<span class="token punctuation">.</span><span class="token function">setAudioSource</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// You can now use the AudioPlayer like you would normally do with Lavaplayer, e.g.,</span>
playerManager<span class="token punctuation">.</span><span class="token function">loadItem</span><span class="token punctuation">(</span><span class="token string">&quot;https://www.youtube.com/watch?v=NvS351QKFV4&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">AudioLoadResultHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">trackLoaded</span><span class="token punctuation">(</span><span class="token class-name">AudioTrack</span> track<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        player<span class="token punctuation">.</span><span class="token function">playTrack</span><span class="token punctuation">(</span>track<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">playlistLoaded</span><span class="token punctuation">(</span><span class="token class-name">AudioPlaylist</span> playlist<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">AudioTrack</span> track <span class="token operator">:</span> playlist<span class="token punctuation">.</span><span class="token function">getTracks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            player<span class="token punctuation">.</span><span class="token function">playTrack</span><span class="token punctuation">(</span>track<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">noMatches</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Notify the user that we&#39;ve got nothing</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">loadFailed</span><span class="token punctuation">(</span><span class="token class-name">FriendlyException</span> throwable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Notify the user that everything exploded</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function R(Y,q){const e=t("ExternalLinkIcon"),p=t("RouterLink");return i(),l("div",null,[d,a("div",k,[v,a("p",null,[m,a("a",b,[y,s(e)]),h])]),a("p",null,[w,a("a",_,[f,s(e)]),g]),A,a("p",null,[x,P,S,L,T,s(p,{to:"/wiki/essential-knowledge/completable-futures/"},{default:u(()=>[C]),_:1}),F,j,N]),M,a("p",null,[O,a("a",V,[J,s(e)]),E]),I])}var D=c(r,[["render",R],["__file","playing-audio.html.vue"]]);export{D as default};