#!/usr/bin/env sh

# git checkout dev

printf '{"gameVersion": "%s"}\n' $1 > ./src/metadata.json
# //Read data
node > new_package.json <<EOF
var data = require('./package.json');

//Manipulate data
data.version = '$1';

console.log(JSON.stringify(data, null, 2));

EOF

cat new_package.json > package.json
rm new_package.json

npm install

git add -A
git commit -m "Updating to version `echo $1` - `date +'%Y-%m-%d %H:%M:%S'`"
git checkout main
git merge dev -m "Updating to version `echo $1` - `date +'%Y-%m-%d %H:%M:%S'`"
git push
./deploy.sh
git checkout dev
git push