test:
	@node node_modules/lab/bin/lab -a code
test-conv:
	@node node_modules/lab/bin/lab -a code -t 100 -L
test-conv-html:
	@node node_modules/lab/bin/lab -a code -r html -o coverage.html
changelog:
	@mdchangelog --no-prologue --no-orphan-issues --overwrite --order-milestones semver --order-issues closed_at --dependents

.PHONY: test test-cov test-cov-html changelog