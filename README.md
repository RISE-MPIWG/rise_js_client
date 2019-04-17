# RISE API JS Client Library

## Usage

Import the library by using

    const rise = require('./rise');

in your js source code.

This will allow you to call RISE-specific functions. 

IMPORTANT: Your IP/Host will need to be whitelisted by the RISE instance you want to access - please contact pbelouin@mpiwg-berlin.mpg.de for more information about this.

First, you need to init the client library by doing:

    rise.init.setRemote();

This will default the remote to the rise test server (https://rise.mpiwg-berlin.mpg.de). simply set the remote of your choice as a parameter to this function like so:

    rise.init.setRemote('http://localhost:3000');

Next, you have to init the user (this performs the login function on the remote server, and sets the user information/token in local storage).

    rise.init.user('user@mpiwg-berlin.mpg.de', 'userpassword');


Congratulations, you are all set to go! now you can call the RISE collection, resource, sections and content unit fetching functions. These functions return a promise (then() and error() syntax). If the call is successful, a standard http response object will be made available in the then() function:

    rise.collections.all({filter: 'chin'}).then(function(res){
      console.log(res);
    });


Please have a look at index.js as well as the RISE API definition for an overview of the available calls.

Each RISE API call function that returns a collection accepts the following parameters:

    filter: allows you to filter the returned objects using a string (defaults to nothing)
    page: fetches the required page (defaults to page 1)

Please contact pbelouin@mpiwg-berlin.mpg.de if you have any questions/comments, or if you would like to contribute to this library.

If you wish to completely logout the user and empty the RISE js library values stored in local storage, please use

    rise.auth.logout();

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
