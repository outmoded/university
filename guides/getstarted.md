# Getting Started 


## Read Below Before Starting
* [Code of Conduct](https://github.com/hapijs/university/blob/master/COC.md)
* [hapijs Style Guide](https://github.com/hapijs/contrib/blob/master/Style.md)
  Each assignment must abide by this style guide. 
* Make sure [your fork matches the current master](./git.md)
* [What is Travis?](./travis.md)

## Git -- How to get started 
[hapijs/university](https://github.com/hapijs/university) is organized to allow you to 
checkout and work on specific assignments. The below explains git commands to checkout
the assignment you want to work on. For example, to start at the proper place for assignment1 
do the following:
* Fork the hapijs/university repository.
* `git clone https://github.com/your_repo_name/university.git`
  * bring clone of your fork into local machine.
* `git branch -a`
  * This will display all remote branches associated with the repo. 
  * note: `git branch` will not show remote branches only local.  (add -a option to see remotes)
* `git checkout assignment1`
  * This will checkout remote branch assignment1 the starting point of assignment1.  
  * To work on later assignments, adjust assignment# value to checkout the appropriate starting point.
  * assignment# branches are the starting points for each assignment. 
    For example, assignment1 branch is the starting point for assignment 1. <br/>
    To see assignment1 solution, checkout the next assignment. (assignment2).
* Next create a branch to work on assignment1 with. 
  * Previous command `git checkout assignment1` has you working on branch named: 'assignment1'
    * `git status` will show you are on branch assignment1 (no longer on master)  
  *  `git checkout -b myAssignment1`
     Now, you have your own branch to work on assignment1 called: myAssignment1.<br/>
     Plus, in case you want to start over, you can step back to assignment1 starting point with: `git checkout assignment1`.
 * Write code fulfilling assignment1 requirements on branch myAssignment1.
   * periodically commit your work to myAssignment1 branch.
      * `git add .`
      * `git commit`
* When ready push your assignment to your fork of hapijs/university:
   * `git push origin myAssignment1`
* Then, in github repo make PR request to merge the branch myAssignment1
   into the university repo branch assignment1.  
* If you want to see the completion of assignment1: `git checkout assignment2`.   


## Assignments List
To see a list of titles and branch names for all hapijs/university assignments see: [Assignments List](https://github.com/hapijs/university/blob/master/guides/contents.md).



