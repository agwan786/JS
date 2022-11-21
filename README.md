# Server-Sent Events Demo

[Server-Sent events](https://developer.mozilla.org/en-US/docs/Server-sent_events/Using_server-sent_events) is a specification for implementing server-side-push for web frontend applications, through plain-old HTTP.

It is best contrasted with [WebSockets](https://developer.mozilla.org/en/docs/WebSockets), which offer a full-duplex messaging channel over a custom protocol, operating within a single TCP connection (with an HTTP-compatible handshake).

## Trying out the demo

 1. Clone this gist
 1. `node server.js`
 1. Navigate to http://localhost:8888/
 1. See the events start rolling in
 1. Navigate away from the page, and back again
    * the `node` console will report the client going away and coming back
    * the client will automatically reconnect to the event source
 1. While on the page, kill the `node` process, then restart it
    * the client will report loss of connection
    * the client will automatically reconnect when the server comes back
    * the client will inform the server of the last message it saw (see below)

## Main disadvantages

 * [Support](http://caniuse.com/#feat=eventsource) is not universal
    * Neither is [WebSocket](http://caniuse.com/#search=websockets)'s, though
    * The single major difference is in IE-land; not even 11 supports SSE
 * There is no return channel for the client to use

## Main advantages

 * As WebSocket is a custom protocol, it needs explicit support
    * Which is far from being a given in more exotic network setups
    * Proxies/middleware are good examples of where WebSockets often break
 * Easy to test and write automation against, since it's just HTTP
 * Things like session management work exactly like the rest of your HTTP API
 * Some have reported [better latency performance](http://matthiasnehlsen.com/blog/2013/05/01/server-sent-events-vs-websockets/) over WebSockets
    * Though I'm not entirely sure how that's possible; maybe browsers' HTTP stacks are more mature than the WebSocket counterparts?
    * Maybe some extra latency comes from the initial protocol switch?
 * Sometimes you simply don't *need* a full-duplex connection
    * Talk to server over standard REST JSON, for example
    * Deliver notifications over SSE
 * Browser handles reconnections automatically behind the scenes
    * If you tag your messages with [ID's](http://www.html5rocks.com/en/tutorials/eventsource/basics/#toc-event-stream-format), the browser will provide the last ID it saw along with the reconnection, allowing you to send the correct amount of catch-up to the client
    * Your frontend-application won't even have to care about the ID; it's by the server, for the server
 * While both WebSockets and SSE will likely need a polyfill/fallback in the wild, note that:
    * To allow falling back from WebSockets, you need a separate, completely different API on the backend for that
    * Falling back from SSE can be handled entirely client-side
 * Forward-compatible with... whatever may come!
    * SSE is an abstraction over *push-events*, with management of the underlying connection offloaded to the browser
    * There's no reason HTTP needs to be the only available transport: mobile user-agents could use the push-notification service of their platform, for instance
