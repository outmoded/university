# Continuous Integration

According to [Thought Works](https://www.thoughtworks.com/continuous-integration):
> Continuous Integration (CI) is a development practice that requires developers
> to integrate code into a shared repository several times a day. Each check-in is
> then verified by an automated build, allowing teams to detect problems early.
>
> By integrating regularly, you can detect errors quickly, and locate them more easily.

hapi projects require the use of the [travis-ci](https://travis-ci.org) to apply continuous integration to hapi repos.
travis-ci automates the building and testing of all hapi projects on github.  This ensures
every project has 100% test coverage, abides by the [style guide](https://github.com/hapijs/contrib/blob/master/Style.md), and successfully builds.
Each time new code is pushed to a github hapi repo, the travis-ci automatically builds the project
and executes all tests in the project. If the project: fails to build, has failed linting checks,
or has failed tests, the travis-ci gives a big warning message. This greatly helps eliminate merging
`dirty bugs` into a project.

Github's support of the travis-ci makes it easier for teams to develop stable software. 
It can be used on all github projects. Read [travis-ci core concepts](https://docs.travis-ci.com/user/for-beginners/) for beginners to gain
a better understanding of travis CI (continous integeration) and it's uses on github projects.

Other sources:
* [wikipedia CI write up](https://en.wikipedia.org/wiki/Continuous_integration)


### lab & CI
[lab](https://github.com/hapijs/lab) is the hapi JavaScript/Node testing utility. It executes tests,<br/>
performs linting, and enforces a [style guide](https://github.com/hapijs/contrib/blob/master/Style.md) on tested code.
Travis automates the execution of lab's tests. <br/>
If any lab test fails (coverage, linting, or style) travis will issue a failed to build warning.
* `lab -t 100 -L -v`<br/>
   Above is the university `package.json` test command.<br/> 
   This is the command which `travis-ci` uses to run tests on the project.
   - `lab` uses lab testing utility
   - `-t 100` sets the minimum code test coverage percentage to 100%
   - `-L` run linting rules using the linter.
   - `-v` enable verbose test output.
