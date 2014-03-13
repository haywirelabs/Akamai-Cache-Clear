//main.js

/*
    Project/Job CP Codes
 */

 var hcGovCpCodes = [
   '226843',
   '226844'
 ];

 var flhCpCodes = [
   '250086',
   '250087'
 ];

/*
    Notification List
 */

var notificationList = [
  'joe.osborne@aquilent.com',
  'andrew.newhouse@aquilent.com',
  'abhijeet.sharma@aquilent.com'
];

 /*
    Main
  */

(function(){

  /*
    Argument Parser
   */
  var ArgumentParser = require('argparse').ArgumentParser;
  var parser = new ArgumentParser({ addHelp: true, description: 'Akamai Cache Clear Options' });
  parser.addArgument([ '-u', '--user' ],{ help: 'Akamai User'});
  parser.addArgument([ '-p', '--password' ],{ help: 'Akamai Password' });
  parser.addArgument([ '-j', '--job', ], { help: 'Project or Job to act on', defaultValue: 'learn' });
  parser.addArgument([ '-e', '--environment' ], { help: 'Environment to act on.  Defaults to "staging"', defaultValue: 'staging' });
  var args = parser.parseArgs();

  /*
    Identify Project CP Codes for action
   */

   switch( args.job ) {
    case 'flh':
      var projectCpCodes = flhCpCodes;
      var projectName = 'Find Local Help';
      break;
    default:
      var projectCpCodes = hcGovCpCodes;
      var projectName = 'Healthcare.gov Learn'
      break;
   }

  /*
    Akamai Cache Purge Action
  */

  var akamai = require('akamai');
  var cacheClear = new akamai.purge( projectCpCodes , {
    type: 'cpcode',
    user: args.user,
    password: args.password,
    domain: args.environment,
    notify: notificationList
  }, function(err,res){
    if (err){
      console.log(err);
      return;
    }
    console.log(require('util').inspect(res, true, 3, true));
    console.log('Project Cleared: ' + projectName);
  });

}).call(this)