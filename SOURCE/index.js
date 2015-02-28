/*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  COMMONJS MODULE EXPORT                                        (Version 0.0.0)

    @JOB: UBER_NGEN GENERATOR for Components schreiben
    @JOB: dropin vs configurable
    @JOB: Make "COMMENTS" create a nice visual structure of module in miniview

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
(function COMMONJS_EXPORTER (FACTORY) {
  'use strict';
  // If MODULE is a "Drop In" which executes once after loading:
  module.exports = FACTORY(/*with predefined set of PARAMS*/); // CommonJS
  // // ELSE IF MODULE is Otherwise a CONFIGURABLE:
  // module.exports = FACTORY;
})(
  /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    MODULENAME                                                      (this lego)
  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
  (function MODULE_MODULENAME (CONTRACT, ENTITIES, DEPs, window, global, undefined)
  { // to shield MODULE from overriden 'undefined' and global object pollution
    'use strict';
    function MODULENAME_API (
      /*-----------------------------------------------------------------------
        MODULE API

          @TODO: think about what i need here.
            MODULENAME_API.CONTRACT
            MODULENAME_API (CONTAINER, SETTINGS, SUGGESTIONS)
            ....


          USAGE:
            ...
      -----------------------------------------------------------------------*/
      //INJECTED DEPENDENCIES:
      CONTAINER,  // DOM Form Element to apply MODULENAME to
      //OPTIONS:
      SETTINGS,   // OPTIONAL -- name:string, required:boolean, minQueryLength:number
      SUGGESTIONS // Optional ARRAY from which to choose autocomplete SUGGESTIONS
    ) {
      /*-----------------------------------------------------------------------
        PARAMETER VALIDATION + SANITIZATION

        @JOB: Refine behavior in relation to given input
        @JOB: Only do if not singleton and single instance already exists
        @ASSERT: at least one 'billboards' is given in SETTINGS.billboards
          else: return without creating anything new!
      -----------------------------------------------------------------------*/
      SETTINGS = typeof SETTINGS === 'undefined' ?
        { // DEFAULT SETTINGS
          // settings      : {placeholder: 'Search', value: '', minQueryLength: 0},
          // SUGGESTIONS   : [],
          // selection     : '',
          // onQueryChange : function onQueryChange (oldQuery, newQuery) {
          //   return;
          // }
        }
        : SETTINGS // @JOB: Extend non-given OPTIONS with DEFAULTS, allow override defualts with "NULL"
      ;
      /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        MODULE CREATION                                       (build this lego)
      :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
      var MODULE =
        ENTITIES.length ? ENTITIES[ENTITIES.length-1] : // @JOB: if singleton vs factory
        (function MODULENAME (STATE) {
          var
          /*-------------------------------------------------------------------
            TEMPLATE - BUILDING
          -------------------------------------------------------------------*/
            // none
          /*-------------------------------------------------------------------
            TEMPLATE - CUSTOMIZATION (Markup, Properties, Styling)
          -------------------------------------------------------------------*/
            // none
          /*-------------------------------------------------------------------
            DEFINE
          -------------------------------------------------------------------*/
            // START = function START (data, schema, collection, containerQuery) {
            //   return api;
            // }
          /*-------------------------------------------------------------------
            USER INTERACTION EVENTS & HANDLER
          -------------------------------------------------------------------*/
            // none
          /*-------------------------------------------------------------------
            MODULE SPECIFIC HELPERS
          -------------------------------------------------------------------*/
            // none
          /*-------------------------------------------------------------------
            PUBLIC ENTITY API - SET MODULE ENTITY DEFAULT INTERFACE
          -------------------------------------------------------------------*/
            api =       {
              plates    : DEPs.plates,
              holonize  : {},
              // START     : function start() {
              //   var
              //     DATA          = STATE.params.data,
              //     SCHEMA        = STATE.params.schema,
              //     COLLECTION    = STATE.params.collection,
              //     CONTAINER     = STATE.params.containerID,
              //     TRANSLATIONS  = STATE.params.translations
              //   ;
              //   return START (DATA, TRANSLATIONS, SCHEMA, COLLECTION, CONTAINER);
              // },
              /*---------------------------------------------------------------
                CONFIGURE {{MODULENAME}} COMPONENT
              ---------------------------------------------------------------*/
              CONFIGURE : function configure (params) {
                if (!params) {
                  debugger;
                  // @TODO: think about 'singleton' and 'dropin' here
                  // @TODO: The component is already initialized on the server
                  //        CONFIGURE should do nothing and START() should be executed
                } else {
                  delete api.CONFIGURE;
                  STATE.params = params;
                  /*-------------------------------------------------------------
                    CUSTOMIZE - module interface, internals & CONFIGURATION
                  -------------------------------------------------------------*/
                  // just CONFIGURE something
                  // or set other api.attributes
                  // or return something
                  // or set some global stuff
                  return api;
                }
              }
            }
          ;
          api.id = ENTITIES.push(api);
          /*-------------------------------------------------------------------
            PUBLIC API EXPORT

              @JOB: make INIT/CONFIGURE and START one method with many params
              @JOB: make module CONFIGURE a constructor option

          -------------------------------------------------------------------*/
          // [Optional] CONFIGURE this module immediately
          api.CONFIGURE({}); // provide optional settings argument
          return ENTITIES[api.id-1];
        })({})
      ;
      MODULE.CONTRACT = CONTRACT;
      return MODULE;
    }
    MODULENAME_API.CONTRACT = CONTRACT;
    return MODULENAME_API;
  })(
  /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    MODULE CONTEXT
  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
    /*-------------------------------------------------------------------------
      CONTRACT

      @JOB - http://www.2ality.com/2012/10/javascript-properties.html
        (use to create the stuff below)

    -------------------------------------------------------------------------*/
    {
      NAME      : require('../package.json').name,
      VERSION   : 'v' + require('../package.json').version,
      VALIDATE  : function VALIDATE (params) {
        // require('./CONTRACT.js')(params);
        return true;
      }
      // generateData  : generateData,
      // SCHEMA        : SCHEMA,
      // getTypes      : getTypes,
      // getValidators : getValidators,
      // getSamples    : getSamples
    },
    /*-------------------------------------------------------------------------
      SET OF MODULE INSTANCES - only 1 if singleton

      @JOB: singleton vs factory

    -------------------------------------------------------------------------*/
    [],
    /*-------------------------------------------------------------------------
      DEPENDENCY TREE

        @JOB - http://www.2ality.com/2012/10/javascript-properties.html
          (use to create the stuff below)

    -------------------------------------------------------------------------*/
    (function DEPENDENCIES () {
      'use strict';
      return {
        /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
          EXTERNAL DEPENDENCIES                                  (others legos)
        :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
        plates : require('plates'),
        /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
          INTERNAL DEPENDENCIES                                      (my legos)
        :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
          // none
        /*---------------------------------------------------------------------
          e.g. INTERNAL MODULE - nameOfInternalModule1
          (copy structure of this file)
        ---------------------------------------------------------------------*/
      };
    })()
  )
  /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
);
/*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
