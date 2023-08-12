link:
	npm run link

refresh:
	rm -rf node_modules && npm install

run: 
	npm run dev

build:
	rm -rf dist && npm run build

svgo:
	svgo ./src/assets/*.svg


init: 
	make build && make link


unlink:
	npm unlink vuedashkit &&  npm -G unlink vuedashkit