<img src='images/logo.png' />

Welcome to hapijs university.
This is a community learning experiment utilizing the distributed classroom. The idea is simple - use GitHub as a platform for teaching people coding skills as a group, where everyone is both a student and a teacher. The goal is to learn how to operate such a distributed classroom and then apply that pattern to other topics by other people.

Lead Maintainer - [Jon Swenson](https://github.com/zoe-1)

[![Join the chat at https://gitter.im/hapijs/university](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/hapijs/university?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

### How the project works
* An assignment is issued.<br/>
  See [Issues List Here](https://github.com/hapijs/university/issues), in this list look 
  for the issue labelled "assignment". That issue will describe the requirements of the current assignment.
  At anytime the issue list will contain: an issued assignment or a discussion about the next assignment.
* Anyone is welcome to fork the project, write code fulfilling the assignment requirements and submit a PR.
* After PRs are submitted, we peer review each others PRs and learn from the critiques.<br/>
  Look at what others are submitting and see if you can improve your own solution (borrow ideas, add tests, write examples, update the documentation). 
  If you see ways in which others can improve their solution, comment on their Pull Request.
* At the end of an assignment and peer review process, we have a nice refined solution to be merged into the project.
* Merge in a PR and move on to the next assignment.
* Before starting the next assignment, make sure [your fork matches the current master](guides/git.md) since only one Pull Request can be accepted.

### Getting Started
You are welcome to join! To start:
* read the [Getting Started Guide](https://github.com/hapijs/university/blob/master/guides/getstarted.md).
* and read the rest of this document.

### Assignment List
See the [list of assignments](https://github.com/hapijs/university/blob/master/guides/contents.md) to checkout specific assignments.  


### What are we going to build?

Using the distributed classroom style of learning and development,
we are going to build an application with the following features: 
* A public page(s) accessible to all.
* Route(s) with restricted access. Only authenticated users with correct permissions will have access to restricted routes.
* Sessions support using "a simple cookie-based session management. The user has to be authenticated with a web form, and upon successful authentication, receive a reply with a session cookie." [hapi-auth-cookie](https://github.com/hapijs/hapi-auth-cookie)
* form validation using [joi](https://github.com/hapijs/joi).
* tls / ssl support as described at: [learning objectives]( https://github.com/zoe-1/hapitimes)
* Combat Cross-Site Request Forgery (CSRF) attacks by using [hapijs / crumb](https://github.com/hapijs/crumb)
* Configure a plugin to serve static files: css, images, and JavaScript.
* Render HTML templates with a template engine (handlebars).
* Configure a plugin to utilize partial html templates and helpers to generate data for html templates.

In the end the application will have the following routes:
* A home page open to the public (unrestricted).
* A login page with login HTML form (unrestricted).
* A logged in landing page (restricted). 
* An admin page (restricted user with admin privileges). 
[See plugins tutorial](http://www.hapijs.com/tutorials/plugins) for more about prefixes.


### What am I going to learn?

You will learn how to build an application server using node and [hapi](http://hapijs.com) with the following [characteristics](https://github.com/zoe-1/hapitimes). 
It will start with the basics and move on to more advance topic such as authentication, validation, application architecture, testing, and more. 

### What do I need to know?

You should feel comfortable writing simple functions in JavaScript, working with GitHub, using basic git commands, have a basic familiarity with node, and be able to pick up new subjects by reading tutorials and documentation.

### How advanced is this course?

We'll start from the basics and make our way to the most advanced topics. The way this course is structured, you can choose which assignments to participate in, so more experienced developers can "sit out" or help others during the basic assignments and participate when it gets to areas they are not as strong in. However, since teaching is one of the most effective ways to learn, participating early will improve the existing skills of advanced developers.

The assignment will include just enough information to get you going, but you will need to do most of the learning on your own by using the wide range of online resources available. However, the real benefit of this process will come from the code review of your Pull Request. This is where expert developers will review your work and provide you specific and actionable feedback.

### How can I help?

There are lots of way you can help make hapijs university succeed and help shape a new format for teaching development skills:
- Submit Pull Requests to improve this README, add examples, write quick tutorials on how to work with git, etc.
- Look for issues with a [`help wanted` label](https://github.com/hapijs/university/labels/help%20wanted) or [`new contributor` label](https://github.com/hapijs/university/labels/new%20contributor) and help with those.
- Randomly pick submitted Pull Request and review them, offering advice and helping others improve their skills.

### Anything else?

[Open an issue](https://github.com/hapijs/university/issues/new), it's free.
