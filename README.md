# proj-initial-angular

## GIT flow
Branch naming convention:
- anything except: master, develop, release-*, or hotfix-*

### Commands
### FEATURE
- git flow feature start feature-*
- git flow feature pull feature-*
- git flow feature publish feature-*
- git flow feature finish feature-*

### NPM
#### PACKAGES
- To add an entry to your package.json's dependencies:
-- npm install <package_name> --save
- To add an entry to your package.json's devDependencies:
-- npm install <package_name> --save-dev


### BOWER
#### Installing Bower
- npm install -l bower

#### Finding Packages
- bower install <query>

#### Installing Packages
- bower install <package>#<version>

#### Listing Installed Packages
- bower list

#### Updating Packages
- bower update
- bower update <package>

#### Uninstalling Packages
- bower uninstall <package>
