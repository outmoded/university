### hapijs university

Use JavaScript and [hapijs](https://hapijs.com) to build web applications.
See the essentials of how to build hapi applications: authentication, validation, application architecture, and testing.
Plus, delve into deeper topics like: bearer-tokens, caching, the request lifecycle.

## Assignments and Solutions

### [Assignment1] Let's get started!

First, we need some basic structure: a lib folder, a package.json file, and an initial ./lib/index.js.
Since we will be using hapi, we need to include that in the project dependencies.
Second, create a basic hapi server on port 8000 which responds to /version requests and replies with a simple `{ "version": "0.1.1" }` JSON payload.  The version data in the response should come from the package.json file.<br/><br/>

`npm init`<br/>
`npm install --save hapi`<br/>


#### View Solution
* [compare assignment1 against start point](https://github.com/hapijs/university/compare/v1.0.0...v1.0.1)
* [assignment1 solution](https://github.com/hapijs/university/tree/v1.0.1)

#### credits for assignment1

Above assignment is from [original assignment1](https://github.com/hapijs/university/issues/1) by @hueniverse and
work by @AdriVanHoudt. See this [PR](https://github.com/hapijs/university/pull/7).


#### pre-assignment2 reading:

* [style guide](https://github.com/hapijs/contrib/blob/master/Style.md) note how hapi uses **Module globals** and **internals**.
* Discussion on [assigning variables, modules, singletons, and callbacks](https://gist.github.com/hueniverse/a06f6315ea736ed1b46d)
* Read about github's [compare tags](https://help.github.com/articles/comparing-commits-across-time/) feature to view solutions.
  **compare tags** is a useful feature to compare different states of your projects. It is used throughout this project.
* hapi documentation on [server options](https://hapijs.com/api#server.options)

### [Assignment2] plugins

The right way to work with hapi is to build your application using plugins.
Plugins provide a way to organize your code into logical components and then put them together in
different combinations or deploy them in different configurations. While some plugins are published as general purpose utilities (e.g. adding authentication),
you should think of plugins as a way to break your code into pieces.

Now that we have a basic server with one endpoint, we want to move the creation of the endpoint to a plugin,
and then register that plugin with the server. Create a new file `lib/version.js` and move the `/version` endpoint there.
Then, change our current `lib/index.js` to require the new plugin file and register the version plugin with our server.
The `server.register()` function is used to register the plugin.

Remember to follow the [style guide](https://github.com/hapijs/contrib/blob/master/Style.md), and ask any questions in the comments of the
issue created for the assignment.  If you are not sure how to get your fork back in sync with the current updated code, use the
[git guide](https://github.com/hapijs/university/blob/master/guides/git.md).

`/version` end point should reply with a simple JSON payload:
```
{
    version: Package.version,
    message: options.message
}
```

#### Highlights

* Notice that `const plugins = []` is an array.  An array is used to register the Version plugin because more plugins are to be registered in later assignments.
* Notice how options are passed to the plugin: `{ message: 'assignment2' }`.
  The `/version` point returns the message value.
* In contrast to plugin options, notice how `server.register` options are passed: `{ once: true }`.
  Often there is confusion between hapi's `server.register` options and options passed to a plugin being registered.
  lesson2 clearly shows the difference.  `{ message: 'assingment2' }` illustrates options passed
  to a plugin. These are options used inside the Version plugin.  And, the `{ once: true }` option is passed to the server
  when registering plugins: `server.register()`. See `/lib/index.js` for details.

#### Helps

* `require('./version') should be declared at the top and assigned to `Version`.
* no need for specifying the plugin version in the attributes. This is an internal plugin, not a publicly published one.

[compare assignment2 solution to assignment1](https://github.com/hapijs/university/compare/v1.0.1...v1.0.2)<br/>
[view assignment2 solution source](https://github.com/hapijs/university/tree/v1.0.2)<br/>


#### Assignment2 Credits

This assignment is from the original assignment2 [convert to plugin](https://github.com/hapijs/university/issues/43) and discussion related to the assignment
written by [@hueniverse](https://github.com/hueniverse). The [code solution](https://github.com/hapijs/university/pull/44) is from work done by [@MylesBorins](https://github.com/MylesBorins).

### [Assignment3] Testing & 100% coverage

Things are getting a bit more interesting...

It's time to add tests, verify coverage, confirm style, and automate all of this with CI (CI means: [Continuous Integration](guides/ci.md)).
We will be using the [lab](https://github.com/hapijs/lab) module to perform these tasks and automate them with [travis](https://travis-ci.org).
[Code](https://github.com/hapijs/code) will be our test's assertian library.

1. Export `init()` and move the server invocation to a new `lib/start.js` file.
   The `lib/start.js` file calls the exported `init()` function and passes configurations options to it.
   The resolved promise function in start.js outputs the server config details to the console.
   Change `package.json` file to use `start.js` as the start up script. `start.js` file is not covered by tests.
   Designing the server to start with an exported `init` function allows other scripts and applications to start and stop the server.
   This is important for several reasons:
   * It allows testing scripts to start and stop the server to execute tests.
   * It allows another program to start and stop the application.  This is useful
     when using hapi to build services - soa (service oriented architecture). Sometimes you
     make several hapi services to run on one computer and collaborate with each other.
   * It allows for the `start.js` script to start and stop the application.
2. Add a `.travis.yml` file. When a .travis.yml file exists in a GitHub repository the project is built and all tests are executed. `.travis` reports if all tests successfully pass or not.
   Note, you must configure github to excute travis CI upon
   events (push or PR) to the repository. This is found under: Settings -> Integration & Services.
3. Add a test folder with two files, `version.js` and `index.js`, each testing the corresponding file under `/lib`.
4. Modify the `package.json` file to include tests. Install the dev dependencies `lab` and `code`.
5. When using lab, enable coverage, require 100% coverage, enable linting with default rules, and install and use [code](https://github.com/hapijs/code) assertion library.
   See `package.json` file to view the test command or see a test command [write up here](https://github.com/zoe-1/university-dev/blob/master/guides/ci.md#lab--ci).
6. Write a basic test to verify our version endpoint in `version.js`.
7. Write tests to get 100% coverage.
   To get 100% test coverage you also need to confirm style.
   `lab` confirms if the project's code abides by the [hapijs style guide](https://github.com/hapijs/contrib/blob/master/Style.md).
   This is called 'linting'.

Everything should be pretty straight forward. If you are not sure on how to use lab and code,
look at other hapi.js modules and copy their test scripts and setup.

Getting 100% coverage can be tricky sometimes so if you are not sure, get as much coverage as you can,
and comment on the lines in your pull request where you are having a hard time reaching and someone will give you a clue.

Remember to properly `stop()` your servers when calling the `init()` method in each test.

For now, avoid using any of the `before()` and `after()` lab features.

As always, ask for help and help others!


### Helps


- When stubbing / patching code in a test, mark that test with the `{ parallel: false }` lab option to make it both safe for future parallel testing as well as visual cue.
- Never return anything other than an actual `Error` as an error (e.g. no strings, plain objects, etc.).
- Never use fixed port numbers in tests, only `0` or the default.
- Always `return` before `next()` unless there is a reason to continue.
- Make arguments / options in `init()` required.
- When calling `server.inject()` with a GET request, just pass the path string as the first argument instead of an options object. Makes the code much more readable.
- Use the testing shortcuts boilerplate used in hapi. Makes reading tests easier.

### lab summary

- elegant [lab](https://github.com/hapijs/lab) and [code](https://github.com/hapijs/lab)<br/>
  good lesson three game plan<br/>
  go test for dirty bugs
  * clean up guy on github see [travis agree](https://travis-ci.org)
  * talk style, value guidance, hapi emotion,<br/>
    [lab](https://github.com/hapijs/lab) enforces all.<br/>
    Seek linting, [Geek leadership](https://github.com/geek) no excuses find lab have fun.

[Compare Assignment3 Solution to Assignment2](https://github.com/hapijs/university/compare/v1.0.2...v1.0.3)<br/>
[view assignment3 solution source](https://github.com/hapijs/university/tree/v1.0.3)<br/>

#### Credits
Assignment is from [original assignment3](https://github.com/hapijs/university/issues/79) and discussion related to it.
The author was [@hueniverse](https://github.com/hueniverse).
Original code for the solution was written by [idanwe](https://github.com/idanwe).
See: [PR](https://github.com/hapijs/university/pull/85) for original source code for solution.
The `.travis.yml` file is from the [hapi](https://github.com/hapijs/hapi) project.

### [Assignment4] Use `server.app` properties

* Read documentation [server.app property](https://hapijs.com/api#server.app)
* Use the `server.app` property to store the application's `response.version` and `options.message`.
* Access the `request.server` property in the `./lib/version.js` handler to return the
  `server.app.version` and server.app.message values.
* Note: The `server.app` property is useful to set a DB connections in. `server.app` properties
  are available wherever the `request.server` is exposed.
  As the documentation says:
  > `server.app` provides a place to store run-time application data.
  > Data can be accessible wherever the server object can be accessed.

[Compare Assignment4 Solution to Assignment3](https://github.com/hapijs/university/compare/v1.0.3...v1.0.4)<br/>

### [Assignment5] Project Structure 

* In this lesson we change the `/version` route handler function location.
  The goal is design program code that is easy to maintain and reuse.
  Moving route functions from the plugin which registers routes makes for readable route registration plugins.
  Plus, it allows for easier maintenance and reuse of methods or functions.
  - When a plugin registers multiple routes or has routes with the request-lifecycle extended, plugin code can get cluttered.
    Moving method / function logic out of the plugin keeps route logic readable. Lesson8 will explore the `request-lifecycle` more.
  - There is a limitation to removing route functions from the plugin registering the route.
    Options passed to the plugin at registration time are not available to functions built in files seperate from the plugin.
    However, usually this is not an issue. Or, the issue can be by-passed using `server.app` properties.
* Create a route methods directory `./lib/route-methods`.
  Methods used in routes will be stored in this directory.
* Create a `version.js` file in the route-methods directory `./lib/route-methods/version.js`<br/>
  Methods used in the `/version` route will be stored here.<br/>
  Move the `/version` handler function to this file.<br/>
* Note: this is a personal style preferrence.<br/>
  Preferrence is to make a split screen view with:
  - the screen on the left<br/>
    displaying routes `./lib/version.js`
  - the screen on the right<br/>
    displaying methods executed in the routes `./lib/route-methods/version.js`
* Run tests. No new tests need to be built. But, need to increment lesson value to `1.0.5`. Executing passing tests
  proves changes did not break the application. Enjoy the benefits of CI [Continuous Integration](guides/ci.md).

[Compare Assignment5 Solution to Assignment4](https://github.com/hapijs/university/compare/v1.0.4...v1.0.5)<br/>


### [Assignment6] auth bearer tokens

* add [hapi-auth-bearer-token](https://www.npmjs.com/package/hapi-auth-bearer-token)<br/>
  `npm install --save hapi-auth-bearer-token`
* Register the authentication strategy in it's own plugin `./lib/authtoken.js`.
* all routes must have valid token to be accessed
  - currently only one route exists: `/version`.
  - valid token equals `1234574`
* 100% tests coverage.<br/>
  Adjust `/version` tests for token authentication.
  Test for passing and failing tokens.

Notice we have not created user authentication yet -- users have no way to log in.
Tests for the assignment assume a valid `auth bearer token` for the user already exists.
The focus is on getting `hapi auth bearer token` plugin installed and configured.
This lesson does not build a complete authentication system.

Here are resources related to [auth bearer tokens](guides/authBearerTokens.md).
Please share if you know of other links and resources related to the subject.

[Compare Assignment6 Solution to Assignment5](https://github.com/hapijs/university/compare/v1.0.5...v1.0.6)<br/>

#### Notes on original authentication assignment 
This assignment started as [assignment4](https://github.com/hapijs/university/issues/118).<br/>
It contains good discussion regarding authentication issues.  For the original solution see: [PR](https://github.com/hapijs/university/pull/182).
It used [hapi-auth-basic](https://github.com/hapijs/hapi-auth-basic#readme). 

### [Assignment7]  TLS
* tls the project.
* [TLS - Transport Layer Security](https://en.wikipedia.org/wiki/Transport_Layer_Security)
* [nodejs tls docs](https://nodejs.org/dist/latest-v10.x/docs/api/tls.html)

#### Credits
Original TLS assignment completed by [@rutaihwa](https://github.com/hapijs/university/pull/152).

[Compare Assignment7 Solution to Assignment6](https://github.com/hapijs/university/compare/v1.0.6...v1.0.7)<br/>

### [Assignment8]  /authenticate route 
* build `./authenticate` route.<br/>
  This moves us one step closer to completing the authentication system.
* Build data store `database.js` to authenticate user records with.
  User records contain `scope` values to implement hapi's way of doing RBAC (role based access control). 
  For this project their are two scopes: ['admin', 'member']. `admin` is administrative user and `member` is
  a normal user.
* methods executed in the `/authenticate` route are stored in the `./route-methods/authenticate.js` file.
  This seprates logic: 
  - `./lib/version.js` contains route registration logic. 
  - `./route-methods/authenticate.js` contains methods executed in the route.
  - The `/authenticate` route utilizes hapi's prerequisite request-lifecycle extension. The `pre` method is executed 
    before the handler.
* Request-lifecycle extensions allows for logic to be split up into multiple functions
  and be executed at specific times when a request is made to a route.<br/>
  In respect to [route.options.pre](https://hapijs.com/api#-routeoptionspre) methods,
  > These methods allow breaking the handler logic into smaller,
  > reusable components that can be shared across routes,
  > as well as provide a cleaner error handling of prerequisite operations (e.g. load required reference data from a database).
  Source: [route.options.pre](https://hapijs.com/api#-routeoptionspre)

  See other documentation for more about the request lifecycle:
  * [route.opt.ext](https://hapijs.com/api#route.options.ext),
  * [request-lifecycle](https://hapijs.com/api#request-lifecycle)

  The request lifecycle is an essential part of the hapi framework.
  As the [documentation](https://hapijs.com/api#request-lifecycle) says: "Every incoming request passes through the request lifecycle".
  Therefore, you want to be familiar with it.
* No authStrategy applied to `/authenticate` point.
* generate bearer-token upon successful authentication (cryptiles).
* Use [Boom](https://www.npmjs.com/package/boom) to return errors.

[Compare Assignment8 Solution to Assignment7](https://github.com/hapijs/university/compare/v1.0.7...v1.0.8)<br/>

#### Credits
* Lesson has some influence from [assignment4](https://github.com/hapijs/university/issues/118).

### [Assignment9] tokens, cache, complete authentication system 

This lesson completes the authentication system. Currently, our server only has two routes: `/version` and `/authenticate`.
Only users with authentic bearer tokens can access server routes: see `./lib/authtoken.js`. However, the `lib/authtoken.js` logic
is crude supporting only one static token.  On the `/authenticate` route we turn off the requirement for an authentic bearer token
with the `false` option not requiring unauthenticated users to have bearer tokens.

At this point, there is a disconnect in the system. A user can generate a valid auth token on the `/authenticate` route.
But, that token is not stored for future use. To solve this problem we use redisdb and hapi's caching plugins.

First, configure a bearer token cache. When a user successfully authenticates, the auth-bearer-token
generated for the session is stored in the cache [catabox-redis](https://github.com/hapijs/catbox-redis).
User account data associated with the session is stored in the cache with the token. This is where a users `scopes`
are stored. The scope value determines which routes a user can access.
Second, the validateFunction for the auth-bearer-token strategy is modified to use the bearer token cache to validate received tokens.
This solves the above mentioned disconnect in our bearer token system.
Third, we create the `/private` route which requires administrative user privileges (`admin` scope) to access route data.

* **catbox-redis ./lib/tokencache.js**
  - install [redisdb](http://redis.io)
  - configure server to use catbox-redis. <br/>
    See [hapi caching](https://github.com/hapijs/catbox) and [catbox-redis](https://github.com/hapijs/catbox-redis) documentation.
  - Upon successfull authentication. Set bearer-token in catbox-cache along with user record.
  - Expire the token after xxxxx time. Set expiresIn: value with server.options.
  - configure scopes ['admin', 'member'] for role based access.
  - configure `.travis.yml` to use the redis server
* **authentication**<br/>
  Refactor authentication logic to:
  - pre-empt one user from generating multiple tokens.
  - upon successful authentication set token and user record information in the cache.
  - Relevant file: `lib/route-methods/authenticate.js`
* **`lib/authtoken.js`**
  - re-write the `defaultValidateFunc` to uses the catbox-redis cache
    to validate tokens.
* **server configuration options**<br/>
  Configure the application options for `tokencache.js` options to be set with server options.
  This allows for test configurations to be modified. In our tests configurations will modify token
  expiration times so tokens from different tests do not collide.
* **create ./private point which requires admin scope for access**
  - Apply default authStrategy to ./private point.
* **tests**
  - write 100% test coverage
  - Add `{ debug: false }` config for tests.
    Otherwise, the tests print out hapi-auth-bearer-token error reports.
    Originally, added in assignment9 but can go here.
* See relevant documentation below:
  - [catbox](https://github.com/hapijs/catbox)
  - [catbox-redis](https://github.com/hapijs/catbox-redis)

#### Credits
`.travis.yml` implementing redisdb is from: [catbox-redis](https://github.com/hapijs/catbox-redis) project.

[Lesson9 solution](https://github.com/hapijs/university/compare/v1.0.8...v1.0.9)

