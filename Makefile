start:
	npm start

install:
	npm install

test:
	npm test

cov:
	npm run test-coverage

cov-html:
	npm run test-coverage-html

cov-mac:
	npm run test-coverage-html
	open -a Safari ./test/coverage.html

help:
	@echo "  						    "
	@echo "  Assignment3 Makefile Commands"
	@echo "  						    "
	@echo "  make <command>"
	@echo "  						    "
	@echo "  command list below:"
	@echo "  start		-- start node server."
	@echo "  test 	 	-- run tests"
	@echo "  cov 		-- run coverage tests output to console."
	@echo "  cov-html	-- run coverage tests output to html file."
	@echo "  cov-mac	-- run coverage tests output to html file and open in Safari"
	@echo "  						    "

.PHONY: start install test cov cov-html cov-mac help 
