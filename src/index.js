'use strict';

const rise = require('./rise/rise');

//rise.auth.login('pbelouin@mpiwg-berlin.mpg.de','password');
var collections = rise.collections.all();
var collection = rise.collections.one(2);
var collection = rise.collections.resources(2);
var sections = rise.resources.sections(28700);
//rise.auth.logout();