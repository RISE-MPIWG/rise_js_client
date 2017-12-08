'use strict';

const rise = require('./rise/rise');

rise.auth.login('pbelouin@mpiwg-berlin.mpg.de','password');
var collections = rise.collections.all();
var collection = rise.collections.one(2);
rise.auth.logout();