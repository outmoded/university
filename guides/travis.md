# What is travis?

<b>hapijs utilizes travis to execute Pull Requests (PRs) in three environments:</b>
* node.js 4.0
* node.js 4 (latest) 
* node.js 5 (latest)

<br/>
When you upload a PR to any hapijs repository including hapijs/university, travis
executes the project code (including all tests). If your project fails to 
run, has tests that fail, does not have 100% coverage, or has linting issues, travis
will issue a warning saying: "some checks have failed".
<br/>
<br/>
As you develop code to be merged into hapijs/university, sometimes when you submit a PR your tests pass 
on the local machine but fail with travis on github.  This happens because the project packages on your 
local machine are older than what travis is using with the github university repo. To solve this:
* `npm update --depth=100`
* Or, delete ./node_modules and then reinstall all packages with `npm install`

The goal is to ensure you are using the same pacakge versions that travis is using.
Then, if tests pass on your local machine they will pass on travis too.







