# What is travis?

<b>hapijs utilizes travis to execute Pull Requests (PRs) in three environments:</b>
* node.js 0.10
* node.js 0.12
* node.js iojs

<br/>
When you upload a PR to any hapijs repository including hapijs/university, travis
executes the project code (including all tests). If your project fails to 
run, has tests that fail, does not have 100% coverage, or has linting issues, travis
will issue a warning saying: "some checks have failed".
<br/>
<br/>
As you develop code to be merged into hapijs/university, sometimes your tests pass 
on local machine but fail with travis when you submit a PR.  This happens because the packages your
project on local machine are older than what travis is using. To solve this:
* `npm update --depth=100`
* Or, delete ./node_modules and then reinstall all packages with npm install

The goal is to ensure you are using the same pacakge versions that travis is using.
Then, if test pass on local machine they should pass on travis too.







