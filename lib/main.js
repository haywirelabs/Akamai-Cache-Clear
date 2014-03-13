//main.js

/*
    Include Configurations
 */

  var cpConfig = require('config').cpcodes;
  var notificationListConfig = require('config').notificationList;

  var addresses = [];
  var people = Object.keys(notificationListConfig);
  people.forEach(function(people){
    var email = notificationListConfig[people];
    addresses.push(email);
  });

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
   var projectCpCodes = [];
   var projectName = '';
   var cpcodekeys = [];
   switch( args.job ) {
    case 'flh':
      cpcodekeys = Object.keys(cpConfig.flhCpCodes);
      cpcodekeys.forEach(function(cpcodekeys){
        var cpCode = cpConfig.flhCpCodes[cpcodekeys];
        projectCpCodes.push(cpCode);
      });
      projectName = 'Find Local Help';
      break;
    default:
      cpcodekeys = Object.keys(cpConfig.hcGovCpCodes);
      cpcodekeys.forEach(function(cpcodekeys){
        var cpCode = cpConfig.hcGovCpCodes[cpcodekeys];
        projectCpCodes.push(cpCode);
      });
      projectName = 'Healthcare.gov Learn';
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
    notify: addresses
  }, function(err,res){
    if (err){
      console.log(err);
      return;
    }
    console.log(require('util').inspect(res, true, 3, true));
    console.log('Project Cleared: ' + projectName);
  });

}).call(this);