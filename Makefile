
start:
	npm start 

install:
	npm install

lab:
	npm test 

lab-cov:
	npm run test-cov-html

lab-cov-mac:
	npm run test-cov-html
	open -a Safari ./test/coverage.html


	
