Akamai Cache Clear
==================

Node.js application for clearing the Akamai cache via API

Installation
------------
- Clone the GitHub Repository
- ``` npm install ```
- add default.yaml from Confluence to the following location:  ``` config/default.yaml ```

Help
----

```
node bin/cacheclear.js -h
```

Passing in the User Argument
-------------

```
node bin/cacheclear.js -u=user@domain.com
```

Passing in the Password Argument
-----------------

```
node bin/cacheclear.js -p=password
```

Passing in the Project/Job Argument
--------------------

```
node bin/cacheclear.js -j=projectname
```

###### Projects ######
- **learn** 
- flh

> Bold indicates default

Passing in the Environment Argument
--------------------

```
node bin/cacheclear.js -e=environmentname
```

###### Environments ######
- **staging** 
- production

> Bold indicates default
