const nocache = require('superagent-no-cache');
const request = require('superagent');
const store = require('store');

request
  .post('https://rise.mpiwg-berlin.mpg.de/api/sign_in')
  .set('Content-Type', 'application/json')
  .send('{"user":{"email":"pbelouin@mpiwg-berlin.mpg.de","password":"password"}}')
  .use(nocache) // Prevents caching of *only* this request
  .end((err, res) => {
    store.set('apiToken',res.body['auth_token']);
  });

request
  .get('https://rise.mpiwg-berlin.mpg.de/api/collections')
  .set('RISE-API-TOKEN', store.get('apiToken'))
  .use(nocache) // Prevents caching of *only* this request
  .end((err, res) => {
    console.log(res);
  });