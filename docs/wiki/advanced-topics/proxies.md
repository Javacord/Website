# Proxies

There are basically two kinds of proxies: HTTP proxies and SOCKS proxies. Both may or may not support or require authentication depending on version, capabilities, and configuration. Due to the underlying libraries used, currently, Javacord fully supports HTTP proxies and partially supports SOCKS proxies.

Javacord uses HTTPS connections to communicate with the Discord REST API and a WSS connection to communicate with the Discord WebSocket endpoint. Both these protocols are secure protocols and thus do not honor settings for HTTP connections, only settings for HTTPS connections.

## :man_technologist: Configuring a Proxy ...

### ... using System Properties

If you did not explicitly set a proxy in the `DiscordApiBuilder` and did not set a system default `ProxySelector`, the default proxy selector of the JRE is used. This proxy selector honors, amongst others, the relevant standard system properties `https.proxyHost`, `https.proxyPort`, `socksProxyHost`, `socksProxyPort`, and `socksProxyVersion`. Use the former two to configure an HTTP proxy or the latter three to configure a SOCKS proxy although you will not need `socksProxyVersion`, as SOCKS4 is currently not supported.

### ... using a System Default Proxy Selector

You can use `java.net.ProxySelector.setDefault(ProxySelector)` to set a system default proxy selector that replaces the default one. In its implementation, you can dynamically determine which proxy to use for each connection.

### ... using an Explicitly Set Proxy

Using the method `DiscordApiBuilder.setProxy(Proxy)` you can set a proxy instance directly in the `DiscordApiBuilder` that is solely used for Javacord connections and does not affect the unrelated code running in the JVM.

### ... using an Explicitly Set Proxy Selector

Using the method `DiscordApiBuilder.setProxySelector(ProxySelector)` you can set a proxy selector instance directly in the `DiscordApiBuilder` that is solely used for Javacord connections and does not affect the remaining code running in the JVM. In its implementation, you can dynamically determine which proxy to use for each connection.

### Precedence of the Configuration Options

* if an explicit proxy is set, it is used
* if an explicit proxy selector is set, it is used
* if both an explicit proxy and an explicit proxy selector are set, this is a configuration error and will cause an exception to be thrown
* if neither explicit option is set, the system default proxy selector is used
* if no system default proxy selector was explicitly set, the JRE default that honors the system properties is used

## :key: Configuring Proxy Authentication ...

### ... using a System Default Authenticator

You can use `java.net.Authenticator.setDefault(Authenticator)` to set a system default authenticator that is used to provide username and password pairs for connections. This authenticator is only used if the proxy supports the `Basic` authentication scheme. If you need to support any other authentication scheme, use an explicitly configured authenticator. The `java.net.Authenticator` interface is too inflexible to support this.

### ... using an Explicitly Set Authenticator

Using the method `DiscordApiBuilder.setProxyAuthenticator(Authenticator)`, you can set a custom authenticator that is much more powerful than the `java.net.Authenticator`. You get much more information about the connection to be established, and you can return any HTTP header that is necessary for a successful authentication. This should cover all sorts of available authentication mechanisms.

## :bulb: Proxy Types

### HTTP

HTTP proxies are fully supported.

### SOCKS 4

SOCKS 4 is currently not supported.

The WebSocket library we use does not support SOCKS proxies at all and the HTTP library we use has a bug that prevents SOCKS 4 to be used. Additionally, you would need to use at least Java 9 or a separate socket factory supporting SOCKS 4, as the JRE implementation is not working in Java 8 and got fixed only in Java 9+.

### SOCKS 4a

SOCKS 4a is currently only partially supported.

The WebSocket library we use does not support SOCKS proxies at all, so it could be used for the REST connections only. Additionally, you would need to use a separate socket factory supporting SOCKS 4a, as the JRE implementation is not capable of doing SOCKS 4a, only SOCKS 4 and SOCKS 5 are supported at the time of creation of this wiki article.

### SOCKS 5

SOCKS 5 is currently only partially supported.

The WebSocket library we use does not support SOCKS proxies at all, so it could be used for the REST connections only.