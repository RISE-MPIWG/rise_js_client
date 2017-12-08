'use strict';

const nocache = require('superagent-no-cache');
const request = require('superagent');
const store = require('store');

exports.auth = {
  login : function(email, password){
    console.log(email,password)
    request
      .post('https://rise.mpiwg-berlin.mpg.de/api/sign_in')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send('{"user":{"email":"'+email+'","password":"'+password+'"}}')
      .use(nocache) // Prevents caching of *only* this request
      .end((err, res) => {
        store.set('apiToken',res.body['auth_token']);
      });
  },
  logout : function (){
      console.log('logout');
  }
}

exports.collections = {
  all : function(){
    request
      .get('https://rise.mpiwg-berlin.mpg.de/api/collections')
      .set('Accept', 'application/json')
      .set('RISE-API-TOKEN', store.get('apiToken'))
      .use(nocache) // Prevents caching of *only* this request
      .end((err, res) => {
        console.log(res);
      });
  }
}