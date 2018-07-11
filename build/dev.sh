rm -rf dist
babel src --out-dir dist/src
mkdir dist/config
cp -a config/. dist/config/
cp -a resources/. dist/resources/
node dist/src/server/server.js