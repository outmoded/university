## supplemental git helps

## melding commits together
`git rebase -i <commit_id>`<br/>
`commit_id` is the starting point for the rebase. All commits following
that id will be able to be modified during the rebase process.


## diffs

View differences bewteen commits, branches, tags, or stages.
* show diff of staged changes
`git diff --staged`

## working with tags

### compare tags
* git
  - `git diff tag1 tag2`<br/>
  - `git log tag1..tag2`<br/>
  - `git diff tag1 tag2 -- some/file/name`  # differences between particular file.<br/>
* github
  - ``

### open vim to write message about tag.
`git tag -a "vTAG_NAME"`<br/><br/>

* list tags and nine lines of message
  `git tag -n9`

* list tags only in 1.8.5 series
  `git tag -l "v1.8.5*"`

* push specific tag to origin
  `git push origin tag_name`

* show commit id for v0.0.3
  `git rev-list -n 1 v0.0.3`

* list project tags
  `show-ref --tags || git tag -l`

## remote

`man git-remote`

### Useful remote commands

```bash
$ git remote add origin git@github.com:zoe-1/fg.git
$ git remote remove origin
$ git branch     # show local branches (* active) 
$ git branch -a  # show all local and remote branches
$ git branch -r  # show remote branches
```

### set new remote url 
`$ git remote set-url [--push] <name> <newurl>`

### delete remote branch
```bash
$ git branch -D graphiPart2       # deletes local branch
$ git push origin :graphiPart2    # deletes remote
```

