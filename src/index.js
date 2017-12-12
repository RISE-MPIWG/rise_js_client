'use strict';

const rise = require('./rise');

//rise.auth.login('pbelouin@mpiwg-berlin.mpg.de','password');
rise.init.setRemote();
//rise.init.user('pbelouin@mpiwg-berlin.mpg.de', 'password');


rise.collections.all({filter: 'chin'}).then(function(res){
  console.log('RESPONSE');
  console.log(res);
});

rise.collections.resources(1, {filter: '三'}).then(function(res){
  console.log('RESPONSE');
  console.log(res);
});

rise.resources.sections(3898).then(function(res){
  console.log('RESPONSE');
  console.log(res);
});


rise.sections.contentUnits(95).then(function(res){
  console.log('RESPONSE');
  console.log(res);
});

//rise.auth.logout();