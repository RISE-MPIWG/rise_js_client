'use strict';

const nocache = require('superagent-no-cache');
const request = require('superagent');
const store = require('store');

const lib = function(){

  function doGet (url, params){
    const format = store.get('format');
    const page = params ? params['page'] : 1
    const per_page = params ? params['per_page'] : 6000
    return request
      .get(store.get('riseRemote') + url)
      .accept('application/' + format)
      .set('Content-Type', 'application/' + format)
      .query(params)
      .set('RISE-API-TOKEN', store.get('riseApiToken'))
      .set('page', page)
      .set('per_page', per_page)
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
  setFormat : function(format = 'json'){
    store.set('format', format);
    return format
  },
  setRemote : function(remote = 'https://rise.mpiwg-berlin.mpg.de/api'){
    store.set('riseRemote', remote);
  }
}

exports.auth = {
  login : function(email, password){
    return lib.doPost('/sign_in','{"user":{"email":"'+email+'","password":"'+password+'"}}')
      .then(function(response){
         store.set('riseUser',{'email': email});
         store.set('riseApiToken',res.body['auth_token']);
         console.log('rise login successful');
      });
  },
  logout : function (){
    request
      .delete(store.get('riseRemote')+'/sign_out')
      .set('RISE-API-TOKEN', store.get('riseApiToken'))
      .then(function(response){
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
  one : function(uuid){
    return lib.doGet('/collections/'+uuid, null);
  },
  resources : function(uuid, params = { ...params}){
    return lib.doGet('/collections/'+uuid+'/resources', params);
  },
  metadata : function(uuid){
    return lib.doGet('/collections/'+uuid+'/metadata', null);
  }
}

exports.resources = {

  all : function(params = { ...params}){
    return lib.doGet('/resources', params);
  },
  one : function(uuid){
    return lib.doGet('/resources/'+uuid, null);
  },
  sections : function(uuid, params = { ...params}){
    return lib.doGet('/resources/'+uuid+'/sections', params);
  },
  metadata : function(uuid){
    return lib.doGet('/resources/'+uuid+'/metadata', null);
  }
}

exports.sections = {

  contentUnits : function(uuid, params = { ...params}){
    return lib.doGet('/sections/'+uuid+'/content_units', params);
  },
  metadata : function(uuid){
    return lib.doGet('/collections/'+uuid+'/metadata');
  }
}
