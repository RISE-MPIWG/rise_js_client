'use strict';

const nocache = require('superagent-no-cache');
const request = require('superagent');
const store = require('store');
const prefix = 'https://rise.mpiwg-berlin.mpg.de/api/';

exports.auth = {

  login : function(email, password){
    request
      .post(prefix+'sign_in')
      .set('Content-Type', 'application/json')
      .send('{"user":{"email":"'+email+'","password":"'+password+'"}}')
      .use(nocache)
      .end((err, res) => {
        store.set('apiToken',res.body['auth_token']);
      });
  },
  logout : function (){
    request
      .delete(prefix+'sign_out')
      .set('RISE-API-TOKEN', store.get('apiToken'))
      .end((err, res) => {
        console.log(res)
      });
  }
}

exports.collections = {
  all : function(){
    request
      .get(prefix+'collections')
      .set('Accept', 'application/json')
      .set('RISE-API-TOKEN', store.get('apiToken'))
      .use(nocache) // Prevents caching of *only* this request
      .end((err, res) => {
      	console.log(res.body);
        return res.body;
      });
  },
  one : function(id){
    request
      .get(prefix+'collections/'+id)
      .set('Accept', 'application/json')
      .set('RISE-API-TOKEN', store.get('apiToken'))
      .use(nocache)
      .end((err, res) => {
      	console.log(res.body);
        return res.body;
      });
  },
  resources : function(id){
    request
      .get(prefix+'collections/'+id+'/resources')
      .set('Accept', 'application/json')
      .set('RISE-API-TOKEN', store.get('apiToken'))
      .use(nocache)
      .end((err, res) => {
      	console.log(res.body);
        return res.body;
      });
  }
}
exports.resources = {
  all : function(){
    request
      .get(prefix+'collections')
      .set('Accept', 'application/json')
      .set('RISE-API-TOKEN', store.get('apiToken'))
      .use(nocache) // Prevents caching of *only* this request
      .end((err, res) => {
      	console.log(res.body);
        return res.body;
      });
  },
  one : function(id){
    request
      .get(prefix+'collections/'+id)
      .set('Accept', 'application/json')
      .set('RISE-API-TOKEN', store.get('apiToken'))
      .use(nocache)
      .end((err, res) => {
      	console.log(res.body);
        return res.body;
      });
  },
  sections : function(id){
    request
      .get(prefix+'resources/'+id+'/sections')
      .set('Accept', 'application/json')
      .set('RISE-API-TOKEN', store.get('apiToken'))
      .use(nocache)
      .end((err, res) => {
      	console.log(res.body);
        return res.body;
      });
  }
}
exports.sections = {
  contentUnits : function(id){
    request
      .get(prefix+'sections/'+id+'/content_units')
      .set('Accept', 'application/json')
      .set('RISE-API-TOKEN', store.get('apiToken'))
      .use(nocache)
      .end((err, res) => {
      	console.log(res.body);
        return res.body;
      });
  }
}