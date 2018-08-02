# Code Conventions Coverage Lint

## Javascript

### ESLint

- [x] Strict Mode
- [x] Semicolon
- [x] Any variable that is only assigned once should be defined using `const`
- [x] Any variable that is assigned multiple times should be defined using `let`.
- [x] Variables should not be declared using `var`.
- [ ] Declare on first use, not at top of function; [self](#prototype-members) being an exception
- [x] Do not chain declarations unless inside `for` parentheses (repeat `const` or `let` for each variable in a separate statement)
- [x] No implicit or single statement scopes
- [x] Always spaces, never tabs
- [x] 4 spaces indents
- [x] No trailing whitespace at end-of-line
- [x] Always `'` never `"`
- [x] All files need to end with a newline (or more accurately end of line).  IDEs will often do a line separator instead.  This is to ensure it is unix friendly.  The "cat" command is a good example of seeing this behavior.  Git does a good job of pointing these out when doing pull requests.
- [ ] - Empty line after `{`
    1. Following a multi-line condition
    2. In function scope declarations
    3. In arrow function declarations using curly braces
- [x] Always space after { and before } in inlined object
- [x] One space between function and ( when declaring a function