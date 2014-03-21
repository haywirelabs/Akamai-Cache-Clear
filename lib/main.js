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
  var akamaiUserConfig = require('config').user;
  var akamaiPasswordConfig = require('config').password;

/*
Argument Parser from CLI
*/

  var ArgumentParser = require('argparse').ArgumentParser;
  var parser = new ArgumentParser({ addHelp: true, description: 'Akamai Cache Clear Options' });
  parser.addArgument([ '-u', '--user' ],{ help: 'Akamai User'});
  parser.addArgument([ '-p', '--password' ],{ help: 'Akamai Password' });
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

  //TODO: switch based on configuration item name
  var cpcodekeys = [];
  switch ( projectName ) {
    case projectName:
      var name = cpConfig.projectName;
      cpcodekeys = Object.keys(cpConfig.learn);
      cpcodekeys.forEach(function(cpcodekeys){
        var cpCode = cpConfig.learn[cpcodekeys];
        projectCpCodes.push(cpCode);
      });
      break;
    default:
      break;
  }
/*
  var cpcodekeys = [];
  switch( args.job ) {
  case 'flh':
    cpcodekeys = Object.keys(cpConfig.flh);
    cpcodekeys.forEach(function(cpcodekeys){
      var cpCode = cpConfig.flh[cpcodekeys];
      projectCpCodes.push(cpCode);
    });
    break;
  default:
    cpcodekeys = Object.keys(cpConfig.learn);
    cpcodekeys.forEach(function(cpcodekeys){
      var cpCode = cpConfig.learn[cpcodekeys];
      projectCpCodes.push(cpCode);
    });
    break;
  }
*/
/*
Identify Akamai User
*/

/*
Identify Akamai Password
*/

/*
Identify Akamai Environment
*/

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
   console.log('\n\nJob Name: ' + projectName)
   console.log('CP Codes to be Cleared: ' + projectCpCodes)
   console.log('Akamai Users: ' + akamaiUser);
   console.log('Akamai Password' + akamaiPassword);
   console.log('Environment: ' + akamaiEnvironment);
   console.log('Notification List: ' + notificationAddresses);
   console.log('\n\n')

/*
Akamai Cache Purge Action
*/
/*
  var akamai = require('akamai');
  var cacheClear = new akamai.purge( projectCpCodes , {
    type: 'cpcode',
    user: args.user,
    password: args.password,
    domain: args.environment,
    notify: notificationAddresses
  }, function(err,res){
    if (err){
      console.log(err);
      return;
    }
    console.log(require('util').inspect(res, true, 3, true));
    console.log('Project Cleared: ' + projectName);
  });
*/
}).call(this)
