//main.js

/*
  HC
  226843
  226844

  FLH
  250086
  250087
 */

(function(){
  var akamai = require('akamai');

  var cacheClear = new akamai.purge([
    '226843',
    '226844'
  ], {
    type: 'cpcode',
    user: 'joe.osborne@aquilent.com',
    password: 'grodd005',
    domain: 'staging',
    notify: [
      'joe.osborne@aquilent.com',
      'andrew.newhouse@aquilent.com',
      'abhijeet.sharma@aquilent.com'
    ]
  }, function(err,res){
    if (err){
      console.log(err);
      return;
    }
    console.log(require('util').inspect(res, true, 3, true));
  });

  console.log("cacheClear.js is finished.");
}).call(this)