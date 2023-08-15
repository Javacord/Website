import{_ as e,r as t,o,c as p,a as s,b as c,e as i,d as n}from"./app.151ccb98.js";const l={},u=i(`<h1 id="sharding" tabindex="-1"><a class="header-anchor" href="#sharding" aria-hidden="true">#</a> Sharding</h1><p>Discord allows (and forces) you to &quot;split&quot; larger bots into several independent parts. This behavior is called &quot;sharding&quot;, and the independent parts are called &quot;shards&quot;. You can think of shards as completely independent bots. Every shard is responsible for a disjoint set of servers.</p><h2 id="sharding-in-javacord" tabindex="-1"><a class="header-anchor" href="#sharding-in-javacord" aria-hidden="true">#</a> \u{1F469}\u200D\u{1F3ED} Sharding in Javacord</h2><h3 id="logging-in-with-a-single-shard" tabindex="-1"><a class="header-anchor" href="#logging-in-with-a-single-shard" aria-hidden="true">#</a> Logging in with a single shard</h3><p>Logging in with a single shard is pretty much the same as logging in without sharding:</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">DiscordApi</span> api <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DiscordApiBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">setToken</span><span class="token punctuation">(</span><span class="token string">&quot;top secret&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">setCurrentShard</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">setTotalShards</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Shard &quot;</span> <span class="token operator">+</span> api<span class="token punctuation">.</span><span class="token function">getCurrentShard</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; logged in!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><strong>Note</strong>: <code>current shard</code> starts counting at <code>0</code>! This means in the example above you would have current shard <code>0</code> and shard <code>1</code> with a <code>total amount</code> of <code>2</code> shards.</p></blockquote><blockquote><p><strong>Important</strong>: There must be a &gt; 5-second delay between each shard-login</p></blockquote><h3 id="logging-in-with-a-fixed-amount-of-shards" tabindex="-1"><a class="header-anchor" href="#logging-in-with-a-fixed-amount-of-shards" aria-hidden="true">#</a> Logging in with a fixed amount of shards</h3><p>You can manually set a fixed amount of total shards and log in all of them:</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">new</span> <span class="token class-name">DiscordApiBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">setToken</span><span class="token punctuation">(</span><span class="token string">&quot;top secret&quot;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">setTotalShards</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">loginAllShards</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>shardFuture <span class="token operator">-&gt;</span> shardFuture
                <span class="token punctuation">.</span><span class="token function">thenAcceptAsync</span><span class="token punctuation">(</span><span class="token class-name">Main</span><span class="token operator">::</span><span class="token function">onShardLogin</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">exceptionally</span><span class="token punctuation">(</span><span class="token class-name">ExceptionLogger</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">onShardLogin</span><span class="token punctuation">(</span><span class="token class-name">DiscordApi</span> api<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Shard &quot;</span> <span class="token operator">+</span> api<span class="token punctuation">.</span><span class="token function">getCurrentShard</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; logged in!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// You can treat the shard like a normal bot account, e.g. registering listeners</span>
        api<span class="token punctuation">.</span><span class="token function">addMessageCreateListener</span><span class="token punctuation">(</span>event <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token comment">// ...</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>loginAllShards()</code> returns a collection with completable futures (<code>Collection&lt;CompletableFuture&lt;DiscordApi&gt;&gt;</code>). This method automatically obeys the &gt; 5-second delay rule.</p><h3 id="using-the-recommended-shard-amount" tabindex="-1"><a class="header-anchor" href="#using-the-recommended-shard-amount" aria-hidden="true">#</a> Using the recommended shard amount</h3><p>You can &quot;ask&quot; Discord to recommend you a total amount of shards. This is done by using the <code>DiscordApiBuilder#setRecommendedTotalShards()</code> method, which returns a <code>CompletableFuture&lt;DiscordApiBuilder&gt;</code> after getting the required information.</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">new</span> <span class="token class-name">DiscordApiBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">setToken</span><span class="token punctuation">(</span><span class="token string">&quot;top secret&quot;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">setRecommendedTotalShards</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">loginAllShards</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>shardFuture <span class="token operator">-&gt;</span> shardFuture
                <span class="token punctuation">.</span><span class="token function">thenAccept</span><span class="token punctuation">(</span><span class="token class-name">Main</span><span class="token operator">::</span><span class="token function">onShardLogin</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">exceptionally</span><span class="token punctuation">(</span><span class="token class-name">ExceptionLogger</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">onShardLogin</span><span class="token punctuation">(</span><span class="token class-name">DiscordApi</span> api<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="behavior-of-shards" tabindex="-1"><a class="header-anchor" href="#behavior-of-shards" aria-hidden="true">#</a> \u{1F4A1} Behavior of Shards</h2><h3 id="managed-servers" tabindex="-1"><a class="header-anchor" href="#managed-servers" aria-hidden="true">#</a> Managed servers</h3><p>You can calculate for which servers a shard is responsible using the server id:</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">boolean</span> isResponsible <span class="token operator">=</span> <span class="token punctuation">(</span>serverId <span class="token operator">&gt;&gt;</span> <span class="token number">22</span><span class="token punctuation">)</span> <span class="token operator">%</span> totalShards <span class="token operator">==</span> currentShard<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="private-messages" tabindex="-1"><a class="header-anchor" href="#private-messages" aria-hidden="true">#</a> Private messages</h3><p>Private messages are always sent to the first shard (<code>currentShard == 0</code>).</p><h3 id="when-do-i-need-sharding" tabindex="-1"><a class="header-anchor" href="#when-do-i-need-sharding" aria-hidden="true">#</a> When do I need sharding?</h3><p>Sharding is forced for bots which are in more than 2500 servers.</p><h2 id="sharding-for-very-large-bots" tabindex="-1"><a class="header-anchor" href="#sharding-for-very-large-bots" aria-hidden="true">#</a> \u{1F304} Sharding for Very Large Bots</h2>`,24),r=n('Sharding for very large bots (> 150,000 servers) is a bit different from "normal" sharding. Discord will contact you once your bot reaches this state. Additional information can be found in the '),d={href:"https://discordapp.com/developers/docs/topics/gateway#sharding-for-large-bots",target:"_blank",rel:"noopener noreferrer"},k=n("official Discord api documentation"),h=n(".");function v(m,g){const a=t("ExternalLinkIcon");return o(),p("div",null,[u,s("p",null,[r,s("a",d,[k,c(a)]),h])])}var f=e(l,[["render",v],["__file","sharding.html.vue"]]);export{f as default};
