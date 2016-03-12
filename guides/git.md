## Working with git

## Syncing your fork back to the remote master

After you submitted your assignment and received your feedback, chances are it was closed without
being merged into the remote master (the official course repository). You now have a fork that is
not in the same state as the official copy and you need to sync it back for the next assignment. If
you don't, future pull requests will include the previous assignments and will create a mess.

There are two main ways to get back to sync and one way to avoid this problem in the future:

### Delete your fork and fork again

This is the simplest. You just go to your fork on GitHub, go to **settings** and at the bottom
click on **Delete this repository**. Once deleted, go back to
[the official repository](https://github.com/hapijs/university) and fork it again. All set.
Remember to also delete your local directory and then to clone your new fork all over again.

### Replace your master branch with the remote branch.

```
git remote add upstream https://github.com/hapijs/university
git fetch upstream
git branch backup
git checkout upstream/master -B master
git push origin master --force
```

You are now back in sync and can start the next assignment

### Avoid this problem in the first place

Once your fork is in sync (using one of the two methods above), do not make changes directly to
your master branch. Instead, make a local branch for the current assignment:

```
git branch assignment1
git checkout assignment1
```

Make your changes as instructed by the assignment and save them.

```
git add .
git commit -m 'my changes'
git push origin assignment1
```

When done, go to your fork on GitHub, switch to the assignment branch using the button on the top
left, right above the file list, and then initiate a pull request.
