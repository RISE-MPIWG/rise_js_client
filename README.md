# RISE API JS Client Library

This library is designed to allow developers to interact easily with APIs compatible with SHINE, a restful API protocol that allows clients to browse, filter and access a large number of open and licence-protected structured text resources from a wide variety of providers. Please visit https://rise.mpiwg-berlin.mpg.de for more information about SHINE and the RISE project. For a more detailed documentation of this project, please visit https://rise.mpiwg-berlin.mpg.de/jslib.

## Usage

### As an NPM package

This library is available as an npm package called rise_client; Thus, if you use webpack, yarn or similar, you can import this library into your project by running
    
     npm install rise_client

at the root of your project. Then, import the library by using

    const rise = require('./rise');

This will allow you to call RISE-specific functions.

### Directly from an HTML page

You can also use this library the 'old-school way' by linking to it using a script tag - for more information about this and for a more complete, interactive description of this library, please visit https://rise.mpiwg-berlin.mpg.de/jslib. To know more about the RISE & SHINE project, please visit our website at https://rise.mpiwg-berlin.mpg.de. 

IMPORTANT: Your IP/Host will need to be whitelisted by the RISE instance you want to access - please contact pbelouin@mpiwg-berlin.mpg.de for more information about this.

### Initialisation

First, you need to init the client library by doing:

    rise.init.setRemote();

This will default the remote to the rise test server (https://rise.mpiwg-berlin.mpg.de). If you prefer to point to a development version or a SHINE-compatible resource provider, simply set the remote of your choice as a parameter to this function like so:

    rise.init.setRemote('http://localhost:3000');


### Authentication

You can login a user by using auth.login(). Tthis performs the login function on the remote server, and stores the user information/token in local storage.

    rise.auth.login('user@mpiwg-berlin.mpg.de', 'userpassword');

If you wish to completely logout the user and empty the RISE js library values stored in local storage, please use

    rise.auth.logout();

Please note that authenticating users is not necessary if you just want to consume public/open resources made available by a SHINE-compatible API.

## Fetching data

You can call the RISE collection, resource, sections and content unit fetching functions. These functions return a promise (then() and error() syntax). If a call is successful, a standard http response object will be made available in the then() function:

    rise.collections.all({filter: 'chin'}).then(function(res){
      console.log(res);
    });


Please have a look at index.js as well as the SHINE API definition for an overview of the available calls.

Each SHINE API call function that returns a collection or a resource accepts the following parameters:

    filter: allows you to filter the returned objects using a string (defaults to nothing)
    page: fetches the required page (defaults to page 1)

## Contact

Please contact pbelouin@mpiwg-berlin.mpg.de if you have any questions/comments, or if you would like to contribute to this library.

## Setup

    yarn

Run tests

    yarn test

Start dev server

    yarn start

Build production version

    yarn build

Upgrade packages

    yarn upgrade-interactive
