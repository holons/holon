////////////////////////
exports.exitIfErrorElse = exitIfErrorElse

function exitIfErrorElse(callback){
  return function(err){
    if (err){
      console.error(err.message)
      return process.exit(1)
    }
    var args = Array.prototype.slice.call(arguments, 1)
    callback.apply(this, args)
  }
}

//////////////
/* global component (root component)*/
window.component = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function() {
        'use strict';
        var book = new this.Models.BookModel({
            title: 'JavaScript The Good Parts',
            author: 'Douglas Crockford'
        });

        var view = new this.Views.BookView({model: book});
        $('body').append(view.render().el);
    }
};

$(function() {
    'use strict';
    app.init();
});

///////////////

Concerning the folders you mentioned:

/libs is usually used for custom classes/functions/modules
/vendor or /support contains 3rd party libraries (added as git submodule when using git as source control)
/spec contains specifications for BDD tests (i.e. using jspec).
/tests contains the unit-tests for an application (using a testing framework, see here)
When building a rather large application, i recommend the following additional folders (especially if you are using some kind of MVC- / ORM-Framework like express or mongoose):

/models contains all your ORM models (called Schemas in mongoose)
/views contains your view-templates (using any templating language supported in express)
/public contains all static content (images, stylesheets, client-side javascript)
/assets/images contains image files
/assets/pdf contains static pdf files
/css contains style sheets (or compiled output by a css engine)
/js contains client side javascript
/controllers contain all your express routes, seperated by module/area of your application
I got used to orginize my projects this way and i think it works out pretty well.


/////////////////////////////
function ( inputs) {

  return inputs.a + inputs.b + inputs.c;
}




{ // machine (in the sense of finite state automata )
  inputs: {
    a: { example: 99, required: true, description: 'a number to add' },
    b: { example: 99, required: true, description: 'a number to add' },
    c: { example: 99, required: true, description: 'a number to add' },
  },
  description: "Sum three provided values",
  fn: function ( inputs , exits ) {
    console.log('hi');
    if (inputs.b === 0 || inputs.c === 0 ) {
      return exits.divisionByZero();
    }
    return exits.success(inputs.a / inputs.b / inputs.c);
  },
  exits: {
    success: {
      example: 0.283322352
    },
    divisionByZero: {
      description:  'No result could be calculated because one of the'+
                    'divisors was passed in as zero'
    }
  }
}

/// USAGE:
// 1. install
// 2. require it
// 3. check out the docs - see how it works
//   (what to pass in - what to expect)

var BasicMath = require('machinepack-basic-math');
var BasicMath.divideThings({ a:1, b:2, c:3}, {
  divisonByZero: function () {
    // ... handle error from division by zero
  },
  success: function (quotient) {
    // ... do something w/ quotient
  }
});

// document themselves
// validate their own inputs
// guarantee their return values
// know all possible ways they can fail
// cache return values for referentially transparent codepaths

node-machines.org/spec


/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


REACTOR ~ EVENT BUS
  Nuclear and have only 3 API methods you REALLY need to know:
  dispatch,
  get,
  observe.
  Don't worry extensive API docs will be provided for all of these methods

MODEL ~ STORE
  are self managed state
  providing a single canonical place to define the behavior a domain of your application over time.
  - provide initial state
  - can be attached/detached to a REACTOR (it's never referenced directly)
  - reactor.dispatch(actionType, payload) will ensure that all store recieve the action and get a chance to update themselves.


KEY PATHS
  KeyPaths are a pointer to some piece of your application state. They can be represented a String or Array

  'items' Is a valid keypath that would lookup the items section of your app state, analagous to state['items'] in javascript.

  'foo.bar' and ['foo', 'bar'] would be equivalent keypaths. Tip: Use array keypaths when needing a dynamic keypath or need to reference an numerical key.


GETTERS
  Getters are quite possibly the most powerful abstraction in Nuclear and are used everywhere.
  They abstract the reading of some piece of app state combined with a transformation (optional).
