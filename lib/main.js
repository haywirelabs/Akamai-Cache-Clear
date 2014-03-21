//main.js

/*
Initialize Vars
 */

  var projectName = '';
  var projectCpCodes = [];
  var akamaiUser = '';
  var akamaiPassword = '';
  var akamaiEnvironment = '';
  var notificationAddresses = [];

/*
Include Configuration from File
 */

  var cpConfig = require('config').cpcodes;
  var projectConfig = require('config').defaultProject;
  var notificationListConfig = require('config').notificationList;
  var akamaiEnvironmentConfig = require('config').defaultEnvironment;
  var akamaiUserConfig = require('config').akamaiUser;
  var akamaiPasswordConfig = require('config').akamaiPW;

  console.log(akamaiPasswordConfig);
/*
Argument Parser from CLI
*/

  var ArgumentParser = require('argparse').ArgumentParser;
  var parser = new ArgumentParser({ addHelp: true, description: 'Akamai Cache Clear Options' });
  parser.addArgument([ '-u', '--user' ],{ help: 'Akamai User', defaultValue: akamaiUserConfig });
  parser.addArgument([ '-p', '--password' ],{ help: 'Akamai Password', defaultValue: akamaiPasswordConfig });
  parser.addArgument([ '-j', '--job', ], { help: 'Project or Job to act on', defaultValue: projectConfig });
  parser.addArgument([ '-e', '--environment' ], { help: 'Environment to act on.  Defaults to "staging"', defaultValue: akamaiEnvironmentConfig });
  var args = parser.parseArgs();

/*
Identify Project Name
*/

  projectName = args.job;

/*
Identify Project CP Codes for action
*/

  var cpcodekeys = [];
  configProjectsAvailable = Object.keys(cpConfig);

  if(configProjectsAvailable.indexOf(projectName) >= 0){
    cpcodekeys = Object.keys(cpConfig[projectName]);
    cpcodekeys.forEach(function(cpcodekeys){
      var cpCode = cpConfig[projectName][cpcodekeys];
      projectCpCodes.push(cpCode);
    });
  }
  else{
    throw{ name: 'FatalError', message: 'Project Name not found in configuration.'}
  }

/*
Identify Akamai User
*/

  akamaiUser = args.user;

/*
Identify Akamai Password
*/

  akamaiPassword = args.password;

/*
Identify Akamai Environment
*/

  akamaiEnvironment = args.environment;

/*
Prepare Email Address List for Notifications
*/

  var people = Object.keys(notificationListConfig);
  people.forEach(function(people){
    var email = notificationListConfig[people];
    notificationAddresses.push(email);
  });


/*
Main
*/

(function(){


/*
Input Feedback
*/
   console.log('\nProject Name: ' + projectName)
   console.log('CP Codes to be Cleared: ' + projectCpCodes)
   console.log('Akamai User: ' + akamaiUser);
   console.log('Akamai Password: ' + akamaiPassword);
   console.log('Environment: ' + akamaiEnvironment);
   console.log('Notification List: ' + notificationAddresses);
   console.log('\n')

/*
Akamai Cache Purge Action
*/

  var akamai = require('akamai');
  var cacheClear = new akamai.purge( projectCpCodes , {
    type: 'cpcode',
    user: akamaiUser,
    password: akamaiPassword,
    domain: akamaiEnvironment,
    notify: notificationAddresses
  }, function(err,res){
    if (err){
      console.log(err);
      return;
    }
    console.log(require('util').inspect(res, true, 3, true));
    console.log('Project Cleared: ' + projectName);
  });

}).call(this)
