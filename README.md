### hapijs university

A community learning experiment utilizing the distributed classroom.
The idea is simple: use GitHub as a platform to teach group coding skills, use JavaScript and [hapijs](https://hapijs.com)
to build web applications, operate such a distributed classroom and apply the pattern to other topics.

University re-write in process because JavaScript, nodejs, and hapi have evolved.
hapi v17 is out and fully [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) end-to-end.
"It combines the latest technologies with a proven core that has been powering some of the world largest sites."
See [hapi v17 release notes](https://github.com/hapijs/hapi/issues/3658) for all details.

Lead Maintainer - [Jon Swenson](https://github.com/zoe-1)

### What do I need to know?

You should feel comfortable writing simple functions in JavaScript, working with GitHub, using basic git commands,
have a basic familiarity with node, and be able to pick up new subjects by reading tutorials and documentation.

### How to participate

* <b>Individually</b>
  Anyone is welcome to work individually on university assignments.  See list of assignments below.
  To study solutions:
  - use Github's [compare feature](https://help.github.com/articles/comparing-commits-across-time/) to
    compare commits, branches, or tags across time. Use it to compare assignments and solutions.
    Links to comparison views are provided for each solution.
  - Read source code for each solution by clicking on the tagged solution. For example, v0.1.1 is assignment1's solution and
    v0.1.2 is assignment2's solution. The format is: v0.1.X. 'X' is the assignment number.
    Links to each solution below.
  - Besides viewing solutions on github, clone the project, checkout solutions and study them on your own computer.

* <b>Community Assignments</b>
  Besides working individually on assignments. You are welcome
  Watch the [issues list](https://github.com/hapijs/university/issues) for discussion about the next stages
  of group development. You are welcome to participate. Group assignments will be tagged with the 'assignment' label
  in the issues list.  Read more about [group assignments here.](guides/groupDevelopment.md) (community development)
  * Write code fulfilling assignment requirements and submit a PR.
    Read [pull requests](https://help.github.com/articles/using-pull-requests/) if you are unsure how to make a PR.
  * After a PR is submitted, the community peer reviews the PR allowing us to learn from each other.

Track development on the [issues list](https://github.com/hapijs/university/issues).

### What you will learn

You will learn the essential components needed to build hapi applications: authentication, validation, application architecture, and testing.
Plus, we will delve into deeper topics like: bearer-tokens, caching, configuring for multiple environments,
hapi process monitoring, the request lifecycle, and conclude with integrating graphql into a hapi application.

[dependencies go show list](guides/dependencies.md)

## Assignments and Solutions

### [Assignment1] Let's get started!

First, we need some basic structure: a lib folder, a package.json file, and an initial ./lib/index.js.
Since we will be using hapi, we need to include that in the project dependencies.
Second, create a basic hapi server on port 8000 which responds to /version requests and replies with a simple `{ "version": "0.1.1" }` JSON payload.  The version data in the response should come from the package.json file.<br/><br/>

`npm init`<br/>
`npm install --save hapi`<br/>


[view assignment1 solution](https://github.com/hapijs/university/tree/v0.1.1)<br/>
[compare assignment1 solution to start point](https://github.com/hapijs/university/compare/v0.1.0...v0.1.1)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Above link is to: `https://github.com/zoe-1/university-dev/compare/v0.1.0...v0.1.1`.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Utilizes Github's [compare tags](https://help.github.com/articles/comparing-commits-across-time/) feature to view the solution.

#### credits for assignment1

Above assignment based on [original assignment1](https://github.com/hapijs/university/issues/1).


#### pre-assignment2 reading:

* [style guide](https://github.com/hapijs/contrib/blob/master/Style.md) note how hapi uses **Module globals** and **internals**.
* Discussion on [assigning variables, modules, singletons, and callbacks](https://gist.github.com/hueniverse/a06f6315ea736ed1b46d)
* On Github see [comparing on the commits](https://help.github.com/articles/comparing-commits-across-time/) when across time compare be.
  That feature comparing on the commits is used alot to compare and view the said solution again with the set beginning.
  // That feature comparing on the commits is used on the Lesson one solution. It compares the starting point with the solution of lesson one.
* hapi documentation on [server options](https://hapijs.com/api#server.options)

### [Assignment2] Plugins

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

[compare assignment2 solution to assignment1](https://github.com/hapijs/university/compare/v0.1.1...v0.1.2)<br/>
[view assignment2 solution source](https://github.com/hapijs/university/tree/v0.1.2)<br/>


#### Assignment2 Credits
This assignment based on original assignment2: [convert to plugin](https://github.com/hapijs/university/issues/43)

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

[Compare Assignment3 Solution to Assignment2](https://github.com/hapijs/university/compare/v0.1.2...v0.1.3)<br/>
[view assignment3 solution source](https://github.com/hapijs/university/tree/v0.1.3)<br/>

#### Credits
Assignment is based on original assignment3: [100% coverage](https://github.com/hapijs/university/issues/79).

### [Assignment4] Use `server.app` properties

* Use the `server.app` property to store the application's `response.version` and `options.message`.
  See documentation for more about [server.app](https://hapijs.com/api#server.app)
* Access the `request.server` property in the `./lib/version.js` handler to return the
  `server.app.version` and server.app.message values.
* Note: The `server.app` property is useful to set the DB connection in. `server.app` properties
  are available wherever the `request.server` is exposed.

[Compare Assignment4 Solution to Assignment3](https://github.com/hapijs/university/compare/03ca7d1ec0f7775f6c15533076e60e5ee19b6c72...5f341383016e44d582ab09911b86371b2ad1f6c5)<br/>

### [Assignment5] Refactor

* In this lesson we change the `/version` route handler function location.
  The goal is to remove route functions from the plugin which registers the route.
  This creates readable route registration plugins.
  - There is a limitation to removing route functions from the plugin registering the route.
    The limitation is options passed to the plugin at registration time are not available to functions
    built in files seperate from the plugin.
  - When a plugin registers multiple routes or has routes with the request-lifecycle extended, plugin code can get cluttered.
    Moving method / function logic out of the plugin keeps route logic readable.
  - Start to familiarize yourself with hapi's request-lifecycle extensions.  Adding extensions allows for
    logic to be split up into multiple functions and be executed at specific times when a request is made to a route.
    See docs: [route.opt.ext](https://hapijs.com/api#route.options.ext),
    [request-lifecycle](https://hapijs.com/api#request-lifecycle),
    [route.options.pre](https://hapijs.com/api#-routeoptionspre)
* Create a route methods directory `./lib/route-methods`.
  Resources used in routes will stored in this directory.
* Create a `version.js` file in the route-methods directory `./lib/route-methods/version.js`
  Methods used in the `/version` route will be stored here.
  Move the `/version` handler function to this file.
* Note: this is a personal style preferrence.
  Preferrence is to make a split screen view with: 
  - the screen on the left<br/>
    displays the routes `./lib/version.js`
  - the screen on the right<br/>
    displays the methods executed in the routes `./lib/route-methods/version.js`
* Run tests. No new tests need to be built. But, executing passing tests
  proves changes did not break the application.

[Compare Assignment5 Solution to Assignment4](https://github.com/hapijs/university/compare/v0.1.4...v0.1.5)<br/>


### [Assignment6] OK auth bearer tokens fun

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

[Compare Assignment6 Solution to Assignment5](https://github.com/hapijs/university/compare/v0.1.5...v0.1.6)<br/>

[Originally was Assignment4](https://github.com/hapijs/university/issues/118)<br/>
[Assignment Solution development](https://github.com/zoe-1/university-rewrite/commit/697dee8e4b3b73bffbde93f4dcccaa015e157b11)



### [Assignment7]  TLS
* tls the project.
* [TLS - Transport Layer Security](https://en.wikipedia.org/wiki/Transport_Layer_Security)
* [nodejs tls docs](https://nodejs.org/dist/latest-v10.x/docs/api/tls.html)

[Compare Assignment7 Solution to Assignment6](https://github.com/hapijs/university/compare/v0.1.6...v0.1.7)<br/>

[Assignment7 Solution dev](https://github.com/zoe-1/university-rewrite/commit/036ac9acadd8ff002b1029c4c19520d0512a0da4)

### !!! below still being developed

### [Assignment6]  /authenticate & /private end points
* build `./authenticate` and `./private` points.
* use prerequisite extensions to execute authentication logic.
* Make simple database.js data store to authenticate user records with.
* Apply default authStrategy to ./private point.
* No authStrategy for ./authenticate point.
* Add `{ debug: false }` config for tests.
  Otherwise, the tests print out hapi-auth-bearer-token error reports.
  Originally, added in assignment9 but can go here.

[Assignment6 Solution](https://github.com/zoe-1/university-rewrite/commit/739aec80cfb36c503bcf575fa0408170020b0df9)

### [Assignment7] catabox-redis
* generate bearer-token upon successful authentication (cryptiles).
* Set bearer-token in catbox-cache along with user record.
* Expire the token after xxxxx time. Set expiresIn: value with server.options.
* configure scopes ['admin', 'member'] for role based access.
* create ./private point which requires admin scope for access.
* pre-empt one user from generating multiple tokens.

[Assignment7 Solution](https://github.com/zoe-1/university-rewrite/commit/834a9a13bf566e4f387aa5751eda4927205f46af)

### [Assignment8] confidence
* Build confidence object in ./lib/configs.js
* Configure the object to be filtered by the `env` criteria
* (environment).
The environments will be production, test, default.
  - production: configurations for deployment.
  - test: configs for testing.
  - default: configs for running on local enviroment.
* docs: https://github.com/hapijs/confidence
* TLS and confidence:
  - confidence manipulates the tls certs if they are
    loaded in the Confidence object. To solve the issue
    load tls certs into configs object after confidence
    generates it.

[Assignment8 Solution](https://github.com/zoe-1/university-rewrite/commit/c61e2f839f28d5681f3cf8a67d927b9bd6979532)

### [Assignment9] good & lifecycle

good hapi process monitoring & extending hapi request lifecycle

- [] update to good v8.1.1
   built this lesson using `good@8.0.0-rc1` before stable 8.1.1 released.
  `npm i good@8.0.0-rc1`
* configure good console to write log reports to a logfile.
  Configure confidence file for good to log: test, production, and default.
* Catch invalid attempts to access the ./private route.
  Extend the `onPreResponse` step of the lifecycle for the ./private route.
  When invalid tokens are used to access ./private, log the event to logfile.
* Add `{ debug: false }` config to Confidence file for tests.
  Otherwise, the tests print out hapi-auth-bearer-token error reports.

[Assignment9 Solution](https://github.com/zoe-1/university-rewrite/commit/bf05c4b00194a30e9e86e6ebe6552298788a7d8b)

### [Assignment10] refactor

-[] determine if this is proper place to refactor.
     Or, rewrite previous assignments so no refactor is needed.

**plugins**
  * make  a `user` plugin.
  * move user logic (./authenticate) from `version` plugin and place
    in `user`.
**routeMethod cleanup**
  * make routeMethod directory. Move route methods out of the route plugin.
  * place routeMethods in routeMethod directory files.
    Ex) methods used in the ./authenticate route will be stored in
    routeMethod/authenticate.js file.
 * The goal is to make plugin route objects extremely readable.

**tree after do refactor**
```
lib/
├── authtoken.js
├── cache.js
├── certs
│   ├── cert.crt
│   └── key.key
├── config.js
├── database.js
├── index.js
├── routeMethod
│   ├── authenticate.js
│   ├── private.js
│   └── version.js
├── start.js
├── user.js
└── version.js
```

[Assignment10 Solution](https://github.com/zoe-1/university-rewrite/commit/f8b6c0de59d14e05d1b70f5e3fe93740f1c1d5b7)

### [Assignment11] hapi & graphql (part1)
 * Implement example from graphi project.
      project:  https://github.com/geek/graphi
* Graphi options passed through confidence object
* test coverage
* sources: https://github.com/geek/graphi and http://graphql.org

[Assignment11 Solution](https://github.com/zoe-1/university-rewrite/commit/1970999da255bcf40f05d502f92b803dd7b051c1)

### [Assignment12] hapi & graphql (part2)

#### Basic graph schema, queries and data source
* small data source of several hapi repositories
    * query accesses plugin data which can return:
      - id
      - name
      - description
      - related [Array of related repositories]
    * test coverage
    * linting ignores graph files.

[Assignment12 Solution](https://github.com/zoe-1/university-rewrite/commit/1db58e9a24452e6a822a49d4ce613ef3299508ff)

### [Assignment13] hapi & graphql (part3)
 * schema interfaces and types:
      - one interface: Repositories
      - three types: Hapi, xHapi, Topics.
    * 'xHapi' repositories are repos not under the hapi umbrella.
    * graphql searches / queries:
      - simple searches based on repositories id.
      - retrieve related repositories
      - retrieve related repositories of related repositories
        (friend of friends)
      - inlineFragraments retrieve topics if repo is xHapi type.
      - inlineFragraments retrieve topics of related projects if is
        xHapi type.
    * Changed data store to be an array of records / objects.
      - preparing for mutations.

[Assignment13 Solution](https://github.com/zoe-1/university-rewrite/commit/8d59921e084a812c29a51afee0991148cdc7ab63)

### [Assignment14] hapi & graphql (part4)
* flow added project
      - https://flow.org
      - facebook's static type checker
      - lib/graphi/src files are:
        * checked by flow
        * compiled by babel
        * Note: flow only checks schema related files.
          Not to be used on hapi server files.

    * Build simple plugins to load graphql schemas and resolvers.
      - pass server object to modules so `server.app.db` can be
        accessed by resolver functions.
    * removed old schema logic

[Assignment14 Solution](https://github.com/zoe-1/university-rewrite/commit/9392ff33cb9523e259fc0120e42d9d177fe1746e)

### [Assignment15] hapi & graphql (part5)

* mutation queries
* handle requests to update repository name.
* resolver to make update to data store.
* tests 100%

[Assignment15 Solution](https://github.com/zoe-1/university-rewrite/commit/3a951343eeaeacba8d4c7ab8435e4fbd423a5259)

### [Assignment16] refactor

* Think about how to implement refactored code earlier so the refactor is not needed.
* consider using rethinkdb right from the start. However, this would add
  a new level of complexity on top of learning about hapi and graphql.
* Does adding graphql to the project distract from learning `hapi`?
   Based upon talk I hear about `graphql` thought adding it to the project may attract more people.

[university-rewrite](https://github.com/zoe-1/university-rewrite)


### Anything else?

[Open an issue](https://github.com/hapijs/university/issues/new), it's free.
