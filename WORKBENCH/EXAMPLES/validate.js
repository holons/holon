return {
  generateData  : generateData,
  SCHEMA        : SCHEMA,
  getTypes      : getTypes,
  getValidators : getValidators,
  getSamples    : getSamples,
  VALIDATE      : VALIDATE,
  START         : function () {
    START (DATA, SCHEMA, COLLECTION, CONTAINER);
  }
};
  ///////////////////////////////////////////////////////////////
  // @TODO: The "Generator" is not in USE, but could be used, to use "sample" data in schema,
  // to generate data as long as there is no backend providing valid data
  ///////////////////////////////////////////////////////////////

  // var GENERATOR = {};
  // GENERATOR.sampleData = {
  //   "id"                        : 1,
  //   "user_id"                   : null,
  //   // "created_at"                : "2014-07-16T17:05:08+02:00",
  //   // "updated_at"                : "2014-07-16T17:05:08+02:00",

  //   // "login"                     : "NOT_IN_USE",

  //   "gender"                    : "DUMMY_p_gender",
  //   "title"                     : "DUMMY_p_title",
  //   "firstname"                 : "DUMMY_p_prename",
  //   "lastname"                  : "DUMMY_p_surname",
  //   "businessrelations"         : [{"id":1, "title":"asd1"}, {"id":2, "title":"asd2"}, {"id":3, "title":"asd3"}],
  //   //"businessrelations"         : ["relation1", "relation2", "relation3", "relation4", "relation5"],

  //   "business_unit"             : "DUMMY_p_departement",
  //   "position"                  : "DUMMY_p_position",
  //   "user_id_person"            : "DUMMY_person_id",
  //   "internal_contact_persons"  : ["DUMMY_person_id_1", "DUMMY_person_id_2", "DUMMY_person_id_3", "DUMMY_person_id_4", "DUMMY_person_id_5"],
  //   "topics"                    : ["topic1", "topic2", "topic3", "topic4", "topic5"],

  //   "phone"                     : "DUMMY_com_phone",
  //   "mobile"                    : "DUMMY_com_mobile",
  //   "email"                     : "DUMMY_com_email",
  //   "phone_company"             : "DUMMY_com_phone_company",
  //   "fax"                       : "DUMMY_com_fax",
  //   "email_company"             : "DUMMY_com_email_company",

  //   "company_id"                : null,
  //   "company_name"              : "DUMMY_bus_company_name1",
  //   "company_name_addition"     : "DUMMY_bus_company_name2",
  //   "street"                    : "DUMMY_bus_street1",
  //   "street_addition"           : "DUMMY_bus_street2",
  //   "zip"                       : "DUMMY_bus_zip",
  //   "post_box"                  : "DUMMY_bus_postbox",
  //   "city"                      : "DUMMY_bus_city",
  //   "post_box_zip"              : "DUMMY_bus_zip_postbox",
  //   "country_name"              : "DUMMY_bus_country",
  //   "region"                    : "DUMMY_bus_region",


  //   "event_invitation_receiver" : true,
  //   "email_receiver"            : true,
  //   "mass_email_receiver"       : true,
  //   "attaining_public_office"   : true,
  //   "phone_receiver"            : true,
  //   "fax_receiver"              : true,
  //   "letter_receiver"           : true,


  //   "history_text"              : ["lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum"],
  //   "history_time"              : ["2014-07-17T17:05:08+02:00"],
  //   "history_author"            : ["DUMMY_person_id"]
  // };
  // GENERATOR.dummyData = (function generateDummyDataFrom (DEPs) {
  //   DEPs.typeOf = DEPs.typeOf.F; // Choose between typeOf A - F methods
  //   return function createSampleData (quantity, format, sampleData) {
  //     function validateData(data, format) { return data; }
  //     sampleData = sampleData ? (function convertSampleData() {
  //       if (format === 'complex') {
  //         // validate that given sampleData complies to 'simple' format
  //         // otherwise transform to 'complex' format or throw error
  //         return validateData(sampleData, 'complex');
  //       } else if (format === 'simple') {
  //         // validate that given sampleData complies to 'simple' format
  //         // otherwise transform to 'simple' format or throw error
  //         // otherwise
  //         return validateData(sampleData, 'simple');
  //       } else {
  //         throw new Error('Please specify format: "complex" or "simple"');
  //       }
  //     })() : GENERATOR.sampleData;
  //     var generatedData = [];
  //     var temp;
  //     for (var counter=0; counter<quantity; counter++) {
  //       temp = {};
  //       for (var property in sampleData) {
  //         if (sampleData.hasOwnProperty(property)) {
  //           temp[property] = DEPs.createSampleAttribute(sampleData[property], counter);
  //         }
  //       }
  //       generatedData.push(temp);
  //     }
  //     return generatedData;
  //   };
  // })(
  //   (function DEPENDENCIES (DEPs) {
  //     var DEPs = {
  //       typeOf : {
  //         A: (function (global) {
  //           var cache = {};
  //           return function (obj) {
  //             var key;
  //             return obj === null ? 'null' // null
  //               : obj === global ? 'global' // window in browser or global in nodejs
  //               : (key = typeof obj) !== 'object' ? key // basic: string, boolean, number, undefined, function
  //               : obj.nodeType ? 'object' // DOM element
  //               : cache[key = ({}).toString.call(obj)] // cached. date, regexp, error, object, array, math
  //               || (cache[key] = key.slice(8, -1).toLowerCase()); // get XXXX from [object XXXX], and cache it
  //           };
  //         }(this)),
  //         B: function (obj) {
  //           var funcNameRegex = /function (.{1,})\(/;
  //           var results = (funcNameRegex).exec((obj).constructor.toString());
  //           return (results && results.length > 1) ? results[1] : "";
  //         },
  //         C: function ( thing ) {
  //           var typeOfThing = typeof thing;
  //           if ( typeOfThing === 'object' ) {
  //             typeOfThing = Object.prototype.toString.call(thing);
  //             if ( typeOfThing === '[object Object]') {
  //               if ( thing.constructor.name ) {
  //                 return thing.constructor.name;
  //               } else if ( thing.constructor.toString().charAt(0) === '[' ) {
  //                 typeOfThing = typeOfThing.substring(8,typeOfThing.length - 1);
  //               } else {
  //                 typeOfThing = thing.constructor.toString().match(/function\s*(\w+)/);
  //                 if ( typeOfThing ) {
  //                   return typeOfThing[1];
  //                 } else {
  //                   return 'Function';
  //                 }
  //               }
  //             } else {
  //               typeOfThing = typeOfThing.substring(8,typeOfThing.length - 1);
  //             }
  //           }
  //           return typeOfThing.charAt(0).toUpperCase() + typeOfThing.slice(1);
  //         },
  //         D: function (obj) {
  //           var str = (obj.prototype ? obj.prototype.constructor : obj.constructor).toString();
  //           var cname = str.match(/function\s(\w*)/)[1];
  //           var aliases = ["", "anonymous", "Anonymous"];
  //           return aliases.indexOf(cname) > -1 ? "Function" : cname;
  //         },
  //         E: function (obj) {
  //           return Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1];
  //         },
  //         F: function (item) { // https://github.com/mikemaccana/agave
  //           var getPrototype = function(item) {
  //             return Object.prototype.toString.call(item).slice(8, -1);
  //           };
  //           var kind, Undefined;
  //           if (item === null ) {
  //             kind = 'null';
  //           } else {
  //             if ( item === Undefined ) {
  //               kind = 'undefined';
  //             } else {
  //               var prototype = getPrototype(item);
  //               if ( ( prototype === 'Number' ) && isNaN(item) ) {
  //                 kind = 'NaN';
  //               } else {
  //                 kind = prototype;
  //               }
  //             }
  //           }
  //           return kind;
  //         },
  //         G: function (obj) {
  //           return  Object.prototype.toString.call(obj).replace(/([\[\]]|object|\s)/gi, "");
  //         }
  //       }, // more at: http://tobyho.com/2011/01/28/checking-types-in-javascript/
  //       createSampleAttribute : function (exampleAttribute, currentCounter) {
  //         switch (DEPs.typeOf(exampleAttribute)) {
  //           case 'String':
  //             return exampleAttribute + currentCounter;
  //           case 'Number':
  //             return exampleAttribute + currentCounter;
  //           case 'null':
  //             return null;
  //           case 'Boolean':
  //             return !exampleAttribute;
  //           case 'Array':
  //             return (function newArray(oldArray, newArray) {
  //               switch (DEPs.typeOf(oldArray[0])) {
  //                 case 'String':
  //                   for(item in oldArray) {
  //                     newArray.push(DEPs.createSampleAttribute(oldArray[item], currentCounter));
  //                   }
  //                   return newArray;
  //                 case 'Object':
  //                   var htmlCode = '<select class="klasseXXX">';
  //                   for(item in oldArray) {
  //                     htmlCode += '<option value="' + oldArray[item].id + '">' + oldArray[item].title + '</option>';
  //                   }
  //                   htmlCode += '</select>';
  //                   return htmlCode;
  //                 default:
  //                   console.log(DEPs.typeOf(oldArray[0]));
  //                   throw new Error("Could not detect TYPE of oldArray[0]!");
  //                   return;
  //               }
  //             })(exampleAttribute, []);
  //           default:
  //             console.log(DEPs.typeOf(exampleAttribute));
  //             throw new Error("Could not detect TYPE of exampleAttribute!");
  //             return;
  //         }
  //       }
  //     };
  //     return DEPs;
  //   })({})
  // );
}










function PRODUCTION_MODE () {

  function generateData (x) {
    // @TODO: REFACTORING - use SCHEMA to know how to send DATA

    // TRANSLATE FORMAT - RECEIVED DATA 2 SEND DATA
    var temp = JSON.parse(JSON.stringify(DATA[0]));
    delete temp.businessrelation_ids;
    // temp.businessrelation_ids = [];
    delete temp.topic_ids;
    // temp.topic_ids = [];
    delete temp.internal_contact_person_ids;
    // temp.internal_contact_person_ids = [];
    delete temp.fullname;
    temp.vita_steps_attributes = { };
    temp.vita_steps_attributes[0] = { user_id:  USER.ID, title: 'bla', description: 'lorem ipsum' };
    temp.vita_steps_attributes[1] = { user_id:  USER.ID, title: 'bla2', description: ' lorem ipsum lorem ipsum lorem ipsum lorem ipsum' };
    delete temp.vita_steps;

    temp.user_id = temp.user_id.id;

    // GENERATE NEW DATA from SAMPLE ITEM "x"
    // (by adding random number to the end of some attributes);
    temp.firstname             = 'Hans'+x;
    temp.lastname              = 'Meier'+x;
    temp.email                 = 'hans.meier'+x+'@email.com';
    temp.phone                 = '123456'+x;
    temp.mobile                = '0177 1234 1234'+x;
    temp.phone_company         = '030 12345'+x;
    temp.email_company         = 'hans.meier'+x+'@company.com';
    temp.business_unit         = 'Human Ressource'+x;
    temp.position              = 'Key Account Manager'+x;
    temp.company_name          = 'Example GmbH'+x;
    temp.company_name_addition = 'Holding'+x;
    temp.street                = 'Hauptstrasse 55'+x;
    temp.street_addition       = 'Nebenweg 5'+x;
    temp.zip                   = '555333'+x;
    temp.post_box              = '535353'+x;
    temp.post_box_zip          = '535353 POST BOX'+x;
    temp.city                  = 'Berlin'+x;
    temp.country_name          = 'Deutschland'+x;
    temp.region                = 'Berlin Region'+x;
    return temp;
  }

  // @TODO: CONTRACT - STATIC_TYPE, DUCK_TYPE, FILLED_EXAMPLE, EMPTY_EXAMPLE
  var SCHEMA = { // @TODO: unterscheiden zwischen "receive" and "send", ... which fields have which "rights"? (CRUD)
    // SEND 2 FRONTEND FIELDS - will be defined by FRONTEND DEVELOPER
    // SEND 2 BACKEND FIELDS  - will be defined by BACKEND DEVELOPER
    id                        : { type: "Integer", validator: function validate (data) { return true; }, sample: '' },
    firstname                 : { type: "String",  validator: function validate (data) { return true; }, sample: '' },
    lastname                  : { type: "String",  validator: function validate (data) { return true; }, sample: '' },
    gender                    : { type: "String",  validator: function validate (data) { return true; }, sample: '' },
    title                     : { type: "String",  validator: function validate (data) { return true; }, sample: '' },
    businessrelation_ids      : { type: "Array", validator: function validate (data) { return true; }, sample: '' },
    topic_ids                 : { type: "Array", validator: function validate (data) { return true; }, sample: '' },
    user_id                   : { type: "Integer", validator: function validate (data) { return true; }, sample: '' },
    internal_contact_person_ids : { type: "Array", validator: function validate (data) { return true; }, sample: '' },
    phone                     : { type: "String",  validator: function validate (data) { return true; }, sample: '' },
    mobile                    : { type: "String",  validator: function validate (data) { return true; }, sample: '' },
    email                     : { type: "String",  validator: function validate (data) { return true; }, sample: '' },
    phone_company             : { type: "String",  validator: function validate (data) { return true; }, sample: '' },
    fax                       : { type: "String",  validator: function validate (data) { return true; }, sample: '' },
    email_company             : { type: "String",  validator: function validate (data) { return true; }, sample: '' },
    business_unit             : { type: "String",  validator: function validate (data) { return true; }, sample: '' },
    position                  : { type: "String",  validator: function validate (data) { return true; }, sample: '' },
    event_invitation_receiver : { type: "Boolean", validator: function validate (data) { return true; }, sample: '' },
    email_receiver            : { type: "Boolean", validator: function validate (data) { return true; }, sample: '' },
    mass_email_receiver       : { type: "Boolean", validator: function validate (data) { return true; }, sample: '' },
    attaining_public_office   : { type: "Boolean", validator: function validate (data) { return true; }, sample: '' },
    phone_receiver            : { type: "Boolean", validator: function validate (data) { return true; }, sample: '' },
    fax_receiver              : { type: "Boolean", validator: function validate (data) { return true; }, sample: '' },
    letter_receiver           : { type: "Boolean", validator: function validate (data) { return true; }, sample: '' },
    company_name              : { type: "String",  validator: function validate (data) { return true; }, sample: '' },
    company_name_addition     : { type: "String",  validator: function validate (data) { return true; }, sample: '' },
    street                    : { type: "String",  validator: function validate (data) { return true; }, sample: '' },
    street_addition           : { type: "String",  validator: function validate (data) { return true; }, sample: '' },
    zip                       : { type: "String",  validator: function validate (data) { return true; }, sample: '' },
    post_box                  : { type: "String",  validator: function validate (data) { return true; }, sample: '' },
    post_box_zip              : { type: "String",  validator: function validate (data) { return true; }, sample: '' },
    city                      : { type: "String",  validator: function validate (data) { return true; }, sample: '' },
    country_name              : { type: "String",  validator: function validate (data) { return true; }, sample: '' },
    region                    : { type: "String",  validator: function validate (data) { return true; }, sample: '' },
    vita_steps_attributes     : { type: "Array", validator: function validate (data) { return true; }, sample: '' },
    deleted                   : { type: "Boolean", validator: function validate (data) { return undefined; }, sample: false } // should not be present
  };

  function getTypes() {
    var temp = {};
    for (key in SCHEMA) {
      temp[key] = SCHEMA[key].type;
    }
    return temp;
  }
  function getValidators() {
    var temp = {};
    for (key in SCHEMA) {
      temp[key] = SCHEMA[key].validator;
    }
    return temp;
  }
  function getSamples() {
    var temp = {};
    for (key in SCHEMA) {
      temp[key] = SCHEMA[key].sample;
    }
    return temp;
  }

  function VALIDATE (data, collection, schema) {
    var DATA;
    for(index in data) {
      DATA = data[index];
      for (key in DATA) {
        if (!(SCHEMA[key])) {
          return false;
        } else if (!((SCHEMA[key].validator)(DATA[key]))) {
          return false;
        }
      }
    }
    return true;
  }

  var schemaMapping = { // @TODO: use schema instead of hardcode!!!
    gender                      : '.Complexform__person__gender__input',
    business_unit               : '.Complexform__person__department__input',
    title                       : '.Complexform__person__title__input',
    position                    : '.Complexform__person__position__input',
    firstname                   : '.Complexform__person__prename__input',
    MOCK_contact_person         : '.Complexform__person__contactPerson__input',
    lastname                    : '.Complexform__person__surname__input',
    MOCK_other_contact_persons  : '.Complexform__person__otherContactPersons__input',
    businessrelations           : '.Complexform__person__relations__input',
    topics                      : '.Complexform__person__topics__input',
    phone                       : '.Complexform__communication__phone__input',
    phone_company               : '.Complexform__communication__phoneCompany__input',
    mobile                      : '.Complexform__communication__mobile__input',
    fax                         : '.Complexform__communication__fax__input',
    email                       : '.Complexform__communication__email__input',
    email_company               : '.Complexform__communication__emailCompany__input',
    company_name                : '.Complexform__address__name1__input',
    company_name_addition       : '.Complexform__address__name2__input',
    street                      : '.Complexform__address__street1__input',
    street_addition             : '.Complexform__address__street2__input',
    zip                         : '.Complexform__address__zip__input',
    post_box                    : '.Complexform__address__postbox__input',
    city                        : '.Complexform__address__city__input',
    post_box_zip                : '.Complexform__address__zipbox__input',
    country_name                : '.Complexform__address__country__input',
    region                      : '.Complexform__address__region__input',
    event_invitation_receiver   : '.Complexform__settings__event__input',
    phone_receiver              : '.Complexform__settings__phone__input',
    email_receiver              : '.Complexform__settings__email__input',
    fax_receiver                : '.Complexform__settings__fax__input',
    mass_email_receiver         : '.Complexform__settings__massEmail__input',
    letter_receiver             : '.Complexform__settings__letter__input',
    attaining_public_office     : '.Complexform__settings__office__input',
    history_text                : '.Complexform__journal__entry__content',
    history_time                : '.Complexform__journal__entry__date',
    history_author              : '.Complexform__journal__entry__user'
  };
  DEPENDENCIES.Complexform.init = function (COMPONENT) {
    function fillForm (DATA) { // @TODO: USE SCHEMA and DO NOT HARDCODE!!!!
      for(var prop in DATA) {
        if (DATA.hasOwnProperty(prop)) {
          if (schemaMapping[prop]) {
            COMPONENT.querySelector(schemaMapping[prop]).innerHTML = DATA[prop];
          }
        }
      }
    }
