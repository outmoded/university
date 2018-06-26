# Getting Started 

DEPRECATED RE-WRITING for hapi v17


## Git -- How to get started 
[hapijs/university](https://github.com/hapijs/university) is organized to allow you to <br/>
checkout and work on specific assignments. The below explains git commands needed  <br/>
to work on assignments. Understanding these commands is necessary to participate in <br/> 
hapijs/university. Also, they are essential to collaborate remotely on distributed projects using git or github. <br/>

* **fork and clone the university repository** <br/> 
    * See [this tutorial](https://help.github.com/articles/fork-a-repo/) to understand how to fork a project.
      Then, go fork the hapijs/university repository.
    * `git clone https://github.com/your_repo_name/university.git`
      Clones the fork your just made into your local machine.
    * `git branch -a`  
       lists remote and local branches for the repository.

* **checkout the starting point of assignment.** <br/> 
  `git checkout previousAssignment#`  <br/> 
  Example: `git checkout assignment7` is the starting point for assignment8. <br/> 
  Note: `git checkout start` is starting point for assignment1. <br/> 

* **view solution of assignment.**   
  `git checkout assignment#` shows the solution of an assignment.<br/>
  Example: `git checkout assignment8` is the solution for assignment8. <br/>
* **Write solution to an assignment**  <br/> 
  - create branch to fulfill assignment.<br/>
    * `git branch`<br/>
      Shows all branches in your local repository. Plus, the current branch will be highlighted. 
      Ensure the correct branch is checked out (highlighted). This will be the starting point of your current assignment work.  <br/>
    * `git checkout assignment7` is starting point for assignment8.  <br/>
    * `git checkout -b myAssignment8` <br/>
      Creates branch named myAssignment8 from the head of the assignment7 branch.<br/>
    * Write code fulfilling assignment8 requirements on branch myAssignment8.<br/>
      * periodically commit your work to myAssignment8 branch.<br/>
         * `git add .`<br/>
         * `git commit`<br/>
      * Important, always start an assignment with the community's branch as the starting point. 
        - Do not use a branch with your solution written for a previous assignment as the starting point.
        - Ensure the branch you are checking out as a starting point, matches the community's branch for the assignment. 
        For example, suppose you just completed assignment5 on your myAssignment5 branch and want to start assignment6. 
        Do not start your work for assignment6 on the branch containing your solution written for assignment5 (myAssignment5).  
        - If you follow the above instructions and always commit your work to a myAssignment# branch and do not modify the 
        community branches for each assignment you will be fine.
        - Using community branches as starting points wil keep the project consistent and manageable. 
        Plus, participants will stay in touch with where the community project is going.

* **push your work to your fork of the university**</br>
  - Ensure the remote origin is properly configured.</br>
    * git remote -v  </br>
      Should output the below:  
      `origin   https://github.com/your_git_username/university.git (fetch)`  
      `origin  https://github.com/your_git_username/university.git (push)`  
      Ensure these configurations are correct.
    * Push your work to the fork of the university. 
        - `git push origin myAssignment8` 
          The first time you push this branch to the remote repository, it will create a new branch named `myAssignment8` on the fork of the university.
* Make a PR (pull request) to merge your branch (myAssignment8) into the hapijs/university assignment7 branch.
    - For help, see this [github guide](https://help.github.com/articles/using-pull-requests/) on how to make pull requests.  
    - Why merge myAssignment8 into the assignment7 branch? <br/> 
      You cannot merge work into the hapijs/university assignment8 branch because the assignment8 branch already has the 
      solution. The work will conflict with the assignment8 solution and warning messages will display saying there are merge conflicts.
      This means we will always merge (make PRs) into the previous assignment's branch when making a PR.
    - In a typical PR, if everything is good it is merged into the project. However, if a PR is made fulfilling an assignment which already has a solution,  
      the community will make comments on the PR and then close it. It will not be merged into the project.   

    - So, when fulfilling an assignment you always want to start at the previous assignments branch as described earlier. And, we will make PRs to merge into the previous assignments branch.


## Assignments List
To see a list of titles and branch names for all hapijs/university assignments see: [Assignments List](https://github.com/hapijs/university/blob/master/guides/contents.md).



