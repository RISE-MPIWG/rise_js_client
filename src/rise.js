'use strict';

const nocache = require('superagent-no-cache');
const request = require('superagent');
const store = require('store');



const lib = function(){

  function doGet (url, params){
    return request
      .get(store.get('riseRemote') + url)
      .accept('application/json')
      .query(params)
      .set('RISE-API-TOKEN', store.get('riseApiToken'))
      .use(nocache)
  }

  function doPost (url, params){
    return request
      .post(store.get('riseRemote') + url)
      .set('Content-Type', 'application/json')
      .accept('application/json')
      .send(params)
      .use(nocache)
  }

  return {
    doGet: doGet,
    doPost: doPost
  };

}();

exports.init = {
  user : function(email, password){
    lib.doPost('/sign_in','{"user":{"email":"'+email+'","password":"'+password+'"}}')
      .end((err, res) => {
        store.set('riseUser',{'email': email, 'password': password});
        store.set('riseApiToken',res.body['auth_token']);
      });
  },
  setRemote : function(remote = 'https://rise.mpiwg-berlin.mpg.de/api'){
    store.set('riseRemote', remote);
  }
}

exports.auth = {

  logout : function (){
    request
      .delete(store.get('riseRemote')+'/sign_out')
      .set('RISE-API-TOKEN', store.get('riseApiToken'))
      .end((err, res) => {
        store.remove('riseUser');
        store.remove('riseApiToken');
        store.remove('riseRemote');
        console.log('rise logout successful');
      });
  }
}

exports.collections = {

  all : function(params = { ...params}){
    return lib.doGet('/collections', params);
  },
  one : function(id){
    return lib.doGet('/collections/'+id, null);
  },
  resources : function(id, params = { ...params}){
    return lib.doGet('/collections/'+id+'/resources', params);
  }
}

exports.resources = {

  all : function(params = { ...params}){
    return lib.doGet('/resources', params);
  },
  one : function(id){
    return lib.doGet('/resources/'+id, null);
  },
  sections : function(id, params = { ...params}){
    return lib.doGet('/resources/'+id+'/sections', params);
  }
}

exports.sections = {

  contentUnits : function(id, params = { ...params}){
    return lib.doGet('/sections/'+id+'/content_units', params);
  }
}
