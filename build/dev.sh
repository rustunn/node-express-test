rm -rf dist
babel src --out-dir dist
mkdir dist/config
cp -a config/. dist/config/
node dist/server/server.js