/*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    UNIVERSAL MODULE EXPORTER
    @TODO: YEOMAN or NGEN GENERATOR for Components schreiben

    MINIFY via COMMAND LINE:
      $ uglifyjs AdDeliverer.js -o AdDeliverer.min.js --compress --mangle
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
;!function EXPORTER (CONTAINER, NAMESPACE, FACTORY) {
  'use strict';
  if (typeof exports === "object" && exports &&
      typeof module === "object" && module.exports) {
    // Node, or CommonJS-Like environments
    // Intentionally returning a FACTORY
    module.exports = FACTORY(); // CommonJS
  } else if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(FACTORY); // AMD (RequireJS and family)
  } else {
    var MODULE = FACTORY();
    CONTAINER[NAMESPACE] = CONTAINER[NAMESPACE] ? CONTAINER[NAMESPACE] : {};
    CONTAINER[NAMESPACE][FACTORY.NAME] = MODULE; // Browser <script> tag
  }
}(
  /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    ENVIRONMENT CONTAINER
    node: this = global, browser: this = window, other: this = undefined
  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
  !function getRunTimeEnvironment () {
    'use strict';
    var
      isNode = typeof global !== "undefined"
        && ({}).toString.call(global) == '[object global]',
      isBrowser = typeof window !== "undefined"
        // && ({}).toString.call(window) == '[object global]'
        && window.toString() === '[object Window]'
    ;
    return isNode ? global : isBrowser ? window : {};
  }(),
  /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    NAMESPACE
  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
  'CODINGAMIGOS',
  /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    UMD MODULE TO EXPORT - MODULENAME                   (this lego)
  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
  !function MODULE_MODULENAME (NAME, VERSION, ENTITIES, DEPs) {
    'use strict';
    function MODULENAME_API (
      /*-----------------------------------------------------------------------
        MODULE API
      
          USAGE:
            ...
      \*---------------------------------------------------------------------*/
      //EXTERNAL DEPENDENCIES:
      container,  // DOM Form Element to apply MODULENAME to
      //OPTIONS:
      SETTINGS,   // DEFAULT  -- { placeholder: 'Search', value: '' }
                  // OPTIONAL -- name:string, required:boolean, minQueryLength:number
      suggestions // Optional ARRAY from which to choose autocomplete suggestions
    ) {
      /*-----------------------------------------------------------------------
        PARAMETER VALIDATION

        @TODO: Refine behavior in relation to given input
        @ASSERT: at least one 'billboards' is given in SETTINGS.billboards
          else: return without creating anything new!
      -----------------------------------------------------------------------*/
      SETTINGS = typeof SETTINGS === 'undefined' ? {} : SETTINGS;
      /*-----------------------------------------------------------------------
        INITIALIZE IMPLEMENTATION
      -----------------------------------------------------------------------*/
      var MODULE = 
        // ENTITIES.length ? ENTITIES[ENTITIES.length-1] : // if singleton
        !function MODULENAME (STATE) {
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
            // none
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
            api = {
              /*---------------------------------------------------------------
                BUILD MODULE                              (build this lego)
              ---------------------------------------------------------------*/
              init: function initialize (settings) {
                delete api.init;
                /*-------------------------------------------------------------
                  CUSTOMIZE - module interface, internals & initialization
                -------------------------------------------------------------*/
                // just initialize something
                // or set other api.attributes
                // or return something
                // or set some global stuff
              }
            }
          ;
          api.id = ENTITIES.push(api);
          /*-------------------------------------------------------------------
            PUBLIC API EXPORT
          -------------------------------------------------------------------*/
          // [Optional] initialize this module immediately
          // api.init({}); // provide optional settings argument
          return ENTITIES[api.id-1];
        }(
          /*-------------------------------------------------------------------
            INITIALIZE STATE
          -------------------------------------------------------------------*/
          {
            // settings      : {placeholder: 'Search', value: '', minQueryLength: 0},
            // suggestions   : [],
            // selection     : '',
            // onQueryChange : function onQueryChange (oldQuery, newQuery) {
            //   return;
            // }
          }
        )
      ;
      return MODULE;
    }
  /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    MODULE EXPORT - MODULENAME
  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
    function FACTORY () {
      // If MODULE is a "Drop In" which executes once after loading:
      return MODULENAME_API();
      // Otherwise:
      return MODULENAME_API;
    }
    FACTORY.NAME    = NAME;
    FACTORY.VERSION = VERSION;
    return FACTORY;
  }(
    /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
      MODULE NAME
    :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
    'MODULENAME',
    /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
      MODULE VERSION
    :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
    '0.0.1',
    /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
      SET OF MODULE INSTANCES - only 1 if singleton
    :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
    [],
    /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
      DEPENDENCY TREE
    :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
    !function DEPENDENCIES () {
      'use strict';
      // Helper for requiring my commonJS legos
      function my (x) {return require('path').join(process.cwd(), '/'+x);}
      return {
        /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
          NPM DEPENDENCIES                                (others legos)
        :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
          // none
        /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
          REQUIREJS DEPENDENCIES                          (others legos)
        :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
          // none
        /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
          INTERNAL DEPENDENCIES                           (my legos)
        :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
          // none
        /*---------------------------------------------------------------------
          INTERNAL MODULE - nameOfInternalModule1
        ---------------------------------------------------------------------*/
      };
    }()
  )
);
/*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
