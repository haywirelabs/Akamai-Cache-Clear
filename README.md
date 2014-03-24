Akamai Cache Clear
==================

Node.js application for clearing the Akamai cache via API

Installation
------------
- Clone the GitHub Repository
- Install all NPM Dependencies
  - ``` npm install ```
- Update your Akamai user name in the configuration file
  - ``` APPROOT/config/default.yaml ```
- Update your Akamai password in the configuration file
  - ``` APPROOT/config/default.yaml ```

Help
----

```
node bin/cacheclear.js -h
```

Passing in the User Argument
-------------

```
node bin/cacheclear.js -u user@domain.com
```

Passing in the Password Argument
-----------------

```
node bin/cacheclear.js -p password
```

Passing in the Project/Job Argument
--------------------

```
node bin/cacheclear.js -j projectname
```

Passing in the Environment Argument
--------------------

```
node bin/cacheclear.js -e environmentname
```
