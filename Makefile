.PHONY: setup

setup:
	curl -Lk https://github.com/russellgoldenberg/starter/archive/master.zip > temp.zip
	unzip -q temp.zip
	mv starter-master/* .
	mv starter-master/.gitignore .
	mv starter-master/.editorconfig .
	mv starter-master/.eslintrc .
	rm -rf temp.zip starter-master Makefile docs
	rm README.md
	mv README.story.md README.md
	mv Makefile.story Makefile
	npm i
	rm package-lock.json
	npm run doc

github:
	rm -rf docs
	cp -r dist/ docs
	git add -A
	git commit -m "update dev version"
	git push

archive:
	zip -r archive.zip dev
	git add -A
	git commit -m "archive"
	git push

aws-assets:
	aws s3 sync dist s3://pudding.cool/2019/10/shelters --delete --cache-control 'max-age=31536000' --exclude 'index.html' --exclude 'main.js'

aws-htmljs:
	aws s3 cp dist/index.html s3://pudding.cool/2019/10/shelters/index.html
	aws s3 cp dist/main.js s3://pudding.cool/2019/10/shelters/main.js

aws-cache:
	aws cloudfront create-invalidation --distribution-id E13X38CRR4E04D --paths '/2019/10/shelters*'	

pudding: aws-assets aws-htmljs aws-cache archive

