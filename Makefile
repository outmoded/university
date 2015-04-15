test:
	@node node_modules/lab/bin/lab -L -a code --verbose
test-cov:
	@node node_modules/lab/bin/lab -L -a code -t 100
test-cov-html:
	@node node_modules/lab/bin/lab -L -a code -r html -o coverage.html

.PHONY: test test-cov test-cov-html
