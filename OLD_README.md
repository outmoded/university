<img src='images/logo.png' />

Welcome to hapijs university.  A community learning experiment utilizing the distributed classroom.
The idea is simple - use GitHub as a platform to teach group coding skills, everyone is both a student and a teacher.
The goal is to operate such a distributed classroom and then apply that pattern to other topics.

hapijs/university started as a group coding learning experiment.  
The university developed an application covering the essentials of a hapi application: authentication,  
validation, application architecture, testing, and more.
To track future development watch the [issues list](https://github.com/hapijs/university/issues).

Lead Maintainer - [Jon Swenson](https://github.com/zoe-1)

[![Join the chat at https://gitter.im/hapijs/university](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/hapijs/university?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

### How to participate

* <b>Individually</b>  
  Anyone is welcome to work individually on university assignments. Checkout solutions and study them at your own pace.
  * **Assignments & Solutions**    
    Read the [list of assignments](guides/contents.md) to find specific subjects you would like to work on.  
    Solutions are provided for each assignment.
  * **Getting Started**  
    Read the [Getting Started Guide](guides/getstarted.md) to understand how to work on assignments.  
    Solutions provided for each assignment. 
  * Write code fulfilling assignment requirements and submit a PR.
    Read [pull requests](https://help.github.com/articles/using-pull-requests/) if you are unsure how to make a PR. 
  * After a PR is submitted, the community peer reviews the PR allowing us to learn from each other.

* <b>Community Assignments</b>   
  Watch the [issues list](https://github.com/hapijs/university/issues) for discussion about the next stages
  of group development. You are welcome to participate. Group assignments will be tagged with the assignment label
  in the issues list.  Read more about [group assignments here.](guides/groupDevelopment.md)  

### What you will learn

You will learn essential components needed to build hapi applications:  authentication, validation, application architecture, testing, and more. 
This will be done by building an application with the following features: 
* A public page(s) accessible to all.
* Route(s) with restricted access. Only authenticated & authorized users will have access to restricted routes.
* Sessions support using [hapi-auth-cookie](https://github.com/hapijs/hapi-auth-cookie).  
  > simple cookie-based session management.  
  > The user has to be authenticated by POSTing an AJAX request.  
  > Upon successful authentication, user receives a reply with a session cookie.  
  [hapi-auth-cookie](https://github.com/hapijs/hapi-auth-cookie)   
* POST request data validation using [joi](https://github.com/hapijs/joi).
* A server that is composed by using [glue](https://github.com/hapijs/glue) to load plugins.
* tls / ssl support as described at: [learning objectives]( https://github.com/zoe-1/hapitimes)
* Combat Cross-Site Request Forgery (CSRF) attacks by using [hapijs / crumb](https://github.com/hapijs/crumb)
* Configure a plugin to serve static files: css, images, and JavaScript.
* Render HTML templates with a template engine (handlebars).
* Configure a plugin to use partial html templates.
* Server logging with [good](https://github.com/hapijs/good).
* Generate documentation with [lout](https://github.com/hapijs/lout).
* Make first steps toward building a web API.

In the end, the application will have the following resource points (routes):
* A home page open to the public (unrestricted).  
  But, responds to logged in users showing username and more.
* A login page with login HTML form (unrestricted).
* An account page (restricted) to authenticated users. 
* An admin page (restricted user with admin privileges). 
* [lout](https://github.com/hapijs/lout) will be used to generate documentation for all existing resources.
* And more to come. The university is still under active development.   
  Watch the [issues list](https://github.com/hapijs/university/issues) for details about further development.

### Completed Application 
* See completed application meeting above requirements: `git checkout assignment8`. 

### What's Next?
We are in the midst of writing a new roadmap for development, you are welcome to participate in the discussion.
Watch the [issues list](https://github.com/hapijs/university/issues) to track discussions.

### What do I need to know?

You should feel comfortable writing simple functions in JavaScript, working with GitHub, using basic git commands, have a basic familiarity with node, and be able to pick up new subjects by reading tutorials and documentation. 

### How advanced is this course?

We'll start from the basics and make our way to the most advanced topics. The way this course is structured, 
you can choose which assignments to participate in, so more experienced developers can "sit out" or help others during the basic assignments 
and participate when it gets to areas they are not as strong in. However, since teaching is one of the most effective ways to learn, participating early 
will improve existing skills of advanced developers. To participate in future Community Assignments, it is recommended you understand or have completed assignments 1-8.

### How can I help?

There are lots of way you can help make hapijs university succeed and help shape a new format for teaching development skills:
- Submit Pull Requests to improve this README, add examples, write quick tutorials on how to work with git, etc.
- Look for issues with a [`help wanted` label](https://github.com/hapijs/university/labels/help%20wanted) 
  or [`new contributor` label](https://github.com/hapijs/university/labels/new%20contributor) and help with those.
- Randomly pick submitted Pull Request and review them, offering advice and helping others improve their skills.
- Participate in discussions on the issues list.

### Anything else?

[Open an issue](https://github.com/hapijs/university/issues/new), it's free.
