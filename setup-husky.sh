#Create git if dont exist
if [ ! -d ".git" ]; then
  git init
fi

# Create package.json if dont exist
if [ ! -f "package.json" ]; then
  npm init -y
fi

# Download commitlint
wget https://raw.githubusercontent.com/TimboDeveloper/unikarepo/develop/.commitlintrc

# Install packages
npm install husky commitizen commitlint-config-gitmoji timbo-cz-conventional-changelog commitlint -D

# Add the commitzen changelog
jq '. + { "config": { "commitizen": { "path": "timbo-cz-conventional-changelog" } } }' package.json > package.tmp && mv package.tmp package.json

# Add the prepare script
jq '.scripts += { "prepare": "husky install" }' package.json > package.tmp && mv package.tmp package.json

# Setup everything
npm run prepare 
npx husky add .husky/commit-msg "npx commitlint --edit"
npx husky add .husky/prepare-commit-msg "exec < /dev/tty && node_modules/.bin/cz --hook || true"

# Create .gitignore
if [ ! -f ".gitignore" ]; then
  touch .gitignore
fi

#Add node_modules to .gitignore
echo "node_modules" >> .gitignore

