# request lifecycle

DEPRECATED - (university is being re-written for v17)

Much of the below still is accurate but v17 does not support mulitiple connections
anymore. So, that section needs to be re-written.

### What is the request lifecycle?
Each incoming request passes through [fifteen pre-defined steps](https://gist.github.com/AdriVanHoudt/562f537ba48301bac76fb3bc42def5b3) , along with six optional extensions.
Only two extension points are guaranteed to be called with every request. ([source: lifecycle docs](https://hapijs.com/api#request-lifecycle))

### What is an extension point?
  An extension point is a stage in the request lifecycle where extensions can be added.
  Extension points are hooks that provide an interface for programmers to add custom code
  to a specific step in the lifecycle. hapi refers to the added custom code as ***events***.
  The six possible extension points are:
  * 'onRequest'
    - **always called**
  * 'onPreAuth'
  * 'onPostAuth'
  * 'onPreHandler'
  * 'onPostHandler'
  * 'onPreResponse'
    - **always called**

### What is an extension?
An extension is an event added to the request lifecycle by the programmer.<br/>
The event is an object which has a method to be executed before proceeding to the next step of the lifecycle.
An extension is registered using [server.ext(events)](https://hapijs.com/api#serverextevents) or by configuring
[route options](https://hapijs.com/api#route-options) of the [route configuration object](https://hapijs.com/api#route-configuration) .<br/>
`events` is an object or array of objects with the following:
  * type - The name of the extension point in the lifecycle where the event is going to be added.
  * method - a function or an array of functions to be executed at the specified point in the lifecycle.
  * options (optional object)

Note: not just one event but an array of events can be added at an extension point with [server.ext(events)](https://hapijs.com/api#serverextevents).


### Three levels of extensions:
* **connection-level**<br/>
  Extends the lifecycle of all requests made to any route on a specific server connection.<br/>
  Our project has two connections:
  - `const web = server.select('web');`
  - `const webTls = server.select('web-tls');`
  - The manifest declared in `lib/start.js` configures connections for our server.
  - `lib/index.js` applies ***connection-level*** extensions to the `web` and `webTls` connections.

* **plugin-level**<br/>
  Extends the lifecycle of all requests made to routes within a plugin.
* **route-level**<br/>
  Extends the lifecycle of requests made to a specific route.

### Beauty of hapi request lifecycle
Hapi gives the developer the ability to extend the request lifecycle of requests made to:
a server connection, plugin, or specific route. Plus, the added extensions (events) can be configured to execute at one of the
six different extension points in the request lifecycle.  At the completion of [assignment9](../assignments/a0.0.9.md) our project has ***connection-level*** and ***route level***  extensions.



### References:
* Documentation
  - [lifecycle](https://hapijs.com/api#request-lifecycle)
  - [server.ext(events)](https://hapijs.com/api#serverextevents) - Register an array of event objects on ***connection-level*** extension point.
  - [server.ext(event, method, [options])](https://hapijs.com/api#serverextevent-method-options) - Register a single extension event as a ***connection-level*** extension point.

* Others:
  - What is a hook?
    A hook is functionality provided by software for users of that software to have their own code called under certain circumstances.
    That code can augment or replace the current code.
    (source: [SO](https://stackoverflow.com/questions/467557/what-is-meant-by-the-term-hook-in-programming))
  - @devinivy [tutorial covering realms and extensions](https://github.com/hapijs/discuss/issues/241)
  - [route prerequisites](https://hapijs.com/api#route-prerequisites)<br/>
    hapi allows the developer to add [pre-requisites](https://hapijs.com/api#route-prerequisites) to routes!
    route pre-requisites are route-level extensions executed before the handler.


### Further research:

#### types of extensions (server versus request)
Function signatures for added extensions differ according to type of extensions. For example, if the extension is ***server extension***,
the signature is: `function(server, next)`. But, if the extension is ***request extension*** the signature is: `function(request, reply)`.
[assignment9](../assignments/a0.0.9.md) focused exclusively on request lifecycle extensions.
For more details about server extensions see:
* [server extension points](https://hapijs.com/api#serverextevents)<br/>
  In addition to the above mentioned request extension points, the below<br/>
  lists server extension points:<br/>
  - 'onPreStart' - called before the connection listeners are started.
  - 'onPostStart' - called after the connection listeners are started.
  - 'onPreStop' - called before the connection listeners are stopped.
  - 'onPostStop' - called after the connection listeners are stopped.
* ***server extension*** function signatures
  - `function(server, next)`
* [server events](https://hapijs.com/api#server-events)




PREP WORK BELOW

They are:
* prepare request
* authentication
* validation
* process the handler
* validate the response
* send response


Our ability to maximize the power of the hapi framework will depend on our understanding and use of the request lifecycle and plugins.
If we build a route that handles a request we are working with the request lifecycle but may not know it. For example:
* payload validation<br/>
  Perhaps a route is configured to validate the request's payload with a [Joi](https://www.npmjs.com/package/joi) object,<br/>
  hapi will run your configured Joi validation in the "validation" steps of the lifecycle.<br/>
* create a route<br/>
  The "prepare request" step of the lifecycle looks up the route when a request is received. <br/>
  If it is not found, it skips to the end of the lifecycle (onPreResponse) and sends an error response.
* configure query parameters to a route<br/>
  A path may be configured as: `path: '/hello/{user}'`.<br/>
  In the "prepare request" stage of the lifecycle, hapi will parse the path and parameters sent to the route.<br/>



The request lifecycle
and plugin architecture are the backbone of hapi ([source](https://gist.github.com/AdriVanHoudt/562f537ba48301bac76fb3bc42def5b3)).

Plus, hapi allows the developer to add their own events to the request lifecycle. Steps added by the developer are called extensions.
See [assignment9](../assignments/a0.0.9.md) for more about adding extensions to the request lifecycle.
For example, if you configured the route options to validate the request's payload with a [Joi](https://www.npmjs.com/package/joi) object, hapi will
run your configured Joi validation in the validation steps of the lifecycle.


However, the above internal steps in the lifecycle are configured by the developer.
For example, if you configure an authentication plugin like [hapi-auth-hawk](https://www.npmjs.com/package/hapi-auth-hawk) or [hapi-auth-cookie](https://www.npmjs.com/package/hapi-auth-cookie)
to authenticate users of your application the hapi framework will apply the authentication logic of your configured plugin (e.g. hapi-auth-cookie) at the authentication step of the lifecyle.
