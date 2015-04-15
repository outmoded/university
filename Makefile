test:
	@node node_modules/lab/bin/lab -La code
test-cov:
	@node node_modules/lab/bin/lab -La code -t 100
test-cov-html:
	@node node_modules/lab/bin/lab -La code -r html -o coverage.html

.PHONY: test test-cov test-cov-html
