'use strict';

const rise = require('./rise/rise');

//rise.auth.login('pbelouin@mpiwg-berlin.mpg.de','password');
var collections = rise.collections.all();
var collection = rise.collections.one(2);
var collection = rise.collections.resources(2);
var sections = rise.resources.sections(28700);
var content_units = rise.sections.content_units(422);
//rise.auth.logout();