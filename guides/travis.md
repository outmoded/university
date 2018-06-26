# What is travis?

<b>hapijs utilizes travis to execute Pull Requests (PRs) in three node_js environments:</b>
  - "8" 
  - "9" 
  - "node" (latest) 

<br/>
When you upload a PR to any hapijs repository including hapijs/university, travis
builds the project and runs all tests. If your project fails to 
run, has tests that fail, does not have 100% coverage, or has linting issues, travis
will issue a warning saying: "some checks have failed".
<br/>
<br/>
Sometimes when you submit a PR to hapijs/university, the tests pass on the local machine
but fail with travis on github.  This happens because the project packages on your local machine
are older than what travis installs with the github university repo. To solve this:
* `npm update --depth=100`
* Or, delete ./node_modules and then reinstall all packages with `npm install`

The goal is to ensure you are using the same package versions travis is using.
Then, if tests pass on your local machine they will pass on travis too.







