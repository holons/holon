function UMD_EXPORTER (CUSTOM_NAMESPACE, CUSTOM_FACTORY) {
;!/*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*\
    UNIVERSAL MODULE EXPORTER

    MINIFY via COMMAND LINE:
      $ uglifyjs ModuleName.js -o ModuleName.min.js --compress --mangle
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
(function EXPORTER (ROOT, NAMESPACE, FACTORY) {
  'use strict';
  var
    isCommonJS  = typeof exports === "object"   && exports &&
                  typeof module  === "object"   && module.exports,
    isAMD       = typeof define  === "function" && define.amd,
    isGlobal    = !isCommonJS && isAMD
  ;
  if (isAMD) {
    // AMD. Register as an anonymous module.
    define(FACTORY);            // AMD (RequireJS and family)
  } else if (isCommonJS) {
    // Node, or CommonJS-Like environments
    // Intentionally returning a FACTORY
    module.exports = FACTORY(); // CommonJS family
  } else if (isGlobal) {
    var MODULE = FACTORY();
    ROOT[NAMESPACE] = ROOT[NAMESPACE] ? ROOT[NAMESPACE] : {};
    ROOT[NAMESPACE][FACTORY.NAME] = MODULE; // Browser <script> tag
    // @TODO: bake in "noConflict"
    // var theModule = definition(), global = this, old = global[name];
    // theModule.noConflict = function () {
    //   global[name] = old;
    //   return theModule;
    // };
    // global[name] = theModule;
  } else { throw new Error('Could not detect Module format'); }
  // @TODO: Add Support for component.json format
})(
  /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*\
    ENVIRONMENT ROOT
    node: this = global, browser: this = window, other: this = undefined
  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
  (function getRunTimeEnvironment () {
    'use strict';
    var
      isNode = typeof global !== "undefined"
        && ({}).toString.call(global) == '[object global]',
      isBrowser = typeof window !== "undefined" || typeof document !== 'undefined'
        // && ({}).toString.call(window) == '[object global]'
        && window.toString() === '[object Window]'
    ;
    return isNode ? global : isBrowser ? window : {};
  })(),
  /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*\
    NAMESPACE - for exporting to (e.g. window.CUSTOM_NAMESPACE.ModuleName)
  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
  CUSTOM_NAMESPACE,
  /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*\
    UMD MODULE TO EXPORT - ModuleName                   (this lego)
    // => FACTORY === DEFINITION => returns the modules API
  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
  CUSTOM_FACTORY // = ModuleName of type 'function'
  // my favourite format: commonJS
  )
);
/*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
}
