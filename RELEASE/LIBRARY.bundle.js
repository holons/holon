!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.LIBRARY=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
module.exports = MODULE_holon;

var Plates = _dereq_('plates');

function MODULE_holon () {
  return {
    Plates: Plates,
    holonize: {}
  };
} 

},{"plates":2}],2:[function(_dereq_,module,exports){
/*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  COMMONJS MODULE EXPORT                                        (Version 0.0.0)

    @JOB: YEOMAN or NGEN GENERATOR for Components schreiben
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
  (function MODULE_MODULENAME (META, ENTITIES, DEPs, window, global, undefined)
  { // to shield MODULE from overriden 'undefined' and global object pollution
    'use strict';
    function MODULENAME_API (
      /*-----------------------------------------------------------------------
        MODULE API
      
          USAGE:
            ...
      \*---------------------------------------------------------------------*/
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            PLATES = (function () {
              var api = {};
              ///////////////////////////////////////////////////////////////////////////////////////
              ///////////////////////////////////////////////////////////////////////////////////////
              // GENERAL HELPERS
              //
              // Cache variables to increase lookup speed.
              //
              var _toString = Object.prototype.toString;
              //
              // Polyfill the Array#indexOf method for cross browser compatibility.
              //
              [].indexOf || (Array.prototype.indexOf = function indexOf(a, b ,c){
                for (
                  c = this.length , b = (c+ ~~b) % c;
                  b < c && (!(b in this) || this[b] !==a );
                  b++
                );

                return b^c ? b : -1;
              });
              //
              // Polyfill Array.isArray for cross browser compatibility.
              //
              Array.isArray || (Array.isArray = function isArray(a) {
                return _toString.call(a) === '[object Array]';
              });
              ///////////////////////////////////////////////////////////////////////////////////////
              ///////////////////////////////////////////////////////////////////////////////////////
              //
              // ### function Mapper(conf)
              // #### @conf {Object} configuration object
              // Constructor function for the Mapper instance that is responsible for
              // providing the mapping for the data structure
              //
              function Mapper(conf) {
                if (!(this instanceof Mapper)) { return new Mapper(conf); }

                this.mappings = [];
                this.conf = conf || {};
              }
              // MAPPER HELPERS
              //
              // ### function last(newitem)
              // #### @newitem {Boolean} do we need to add a new item to the mapping
              // Helper function for adding new attribute maps to a Mapper instance
              //
              function last(newitem) {
                if (newitem) {
                  this.mappings.push({});
                }

                var m = this.mappings[this.mappings.length - 1];

                if (m && m.attribute && m.value && m.dataKey && m.replace) {
                  m.re = new RegExp(m.attribute + '=([\'"]?)' + m.value + '\\1');
                } else if (m) {
                  delete m.re;
                }

                return m;
              }
              //
              // Create the actual chainable methods: where('class').is('foo').insert('bla')
              //
              Mapper.prototype = {
                //
                // ### function append(plates, data, map)
                // #### @plates {String} Template or path/id of the template
                // #### @data {Object|String} data for the appended template
                // #### @map {Plates.Map} mapping for the data
                //
                append: function append(plates, data, map) {
                  var l = last.call(this);

                  if (data instanceof Mapper) {
                    map = data;
                    data = undefined;
                  }
                  l.plates = plates;
                  l.data = data;
                  l.mapper = map;

                  return last.call(this, true);
                },
                //
                // ### function remove()
                // This will remove the element that was specified in the `where` clause
                // from the template.
                //
                remove: function remove() {
                  last.call(this).remove = true;
                  return last.call(this, true);
                },
                //
                // ### function as(val)
                // #### @val {String} A string that represents an attribute in the tag.
                // If there is no attribute by that name name found, one may be created
                // depending on the options that where passed in the `Plates.Map`
                // constructor.
                //
                as: function as(val) {
                  last.call(this).replace = val;
                  return last.call(this) && this;
                },
                //
                // ### function insert(val)
                // #### @val {String} A string that represents a key. Data will be inserted
                // in to the attribute that was specified in the `where` clause.
                //
                insert: function insert(val) {
                  var l = last.call(this);
                  l.replace = l.attribute;
                  l.dataKey = val;
                  return last.call(this) && this;
                },
                //
                // ### function has(val)
                // #### @val {String|RegExp} The value of the attribute that was specified
                // in the `where` clause.
                //
                has: function has(val) {
                  last.call(this).value = val;
                  this.replace(val);
                  return last.call(this) && this;
                },
                //
                // ### function is(val)
                // #### @val {string} The value of the attribute that was specified in the
                // `where` clause.
                //
                is: function is(val) {
                  last.call(this).value = val;
                  return last.call(this) && this;
                },
                //
                // ### function tag(val)
                // #### @val {String} the name of the tag should be found
                //
                tag: function tag(val) {
                  last.call(this, true).tag = val;
                  return this;
                },
                //
                // ### function class(val)
                // #### @val {String} a value that may be found in the `class` attribute of a tag
                // the method name should be wrapped in quotes or it will throw errors in IE.
                //
                'class': function className(val) {
                  return this.where('class').is(val);
                },
                //
                // ### function where(val)
                // #### @val {String} an attribute that may be found in a tag
                // This method will initiate a clause. Once a clause has been established
                // other member methods will be chained to each other in any order.
                //
                where: function where(val) {
                  last.call(this, true).attribute = val;
                  return last.call(this) && this;
                },
                //
                // ### function use(val)
                // #### @val {String} A string that represents a key.
                // Data will be inserted into the attribute that was specified in the
                // `where` clause.
                //
                use: function use(val) {
                  last.call(this).dataKey = val;
                  return last.call(this) && this;
                },
                //
                // ### function replace(val1, val2)
                // #### @val1 {String|RegExp} The part of the attribute that needs to be replaced
                // #### @val2 {String} The value it should be replaced with
                //
                replace: function replace(val1, val2) {
                  var l = last.call(this);
                  l.replacePartial1 = val1;
                  l.replacePartial2 = val2;
                  return this;
                }
              };
              //
              // Provide helpful aliases that well help with increased compatibility as not
              // all browsers allow the Mapper#class prototype (IE).
              //
              Mapper.prototype.className = Mapper.prototype['class'];
              //
              // Aliases of different methods.
              //
              Mapper.prototype.partial = Mapper.prototype.append;
              Mapper.prototype.to = Mapper.prototype.use;
              //
              // Expose the Mapper.
              //
              api.Map = Mapper;
              ///////////////////////////////////////////////////////////////////////////////////////
              ///////////////////////////////////////////////////////////////////////////////////////
              var Merge = function Merge() {};
              ///// MERGE HELPERS
              //
              function matchClosing(input, tagname, html) { // Matches a closing tag to a open tag
                var closeTag = '</' + tagname + '>',
                    openTag  = new RegExp('< *' + tagname + '( *|>)', 'g'),
                    closeCount = 0,
                    openCount = -1,
                    from, to, chunk
                    ;

                from = html.search(input);
                to = from;

                while(to > -1 && closeCount !== openCount) {
                  to = html.indexOf(closeTag, to);
                  if (to > -1) {
                    to += tagname.length + 3;
                    closeCount ++;
                    chunk = html.slice(from, to);
                    openCount = chunk.match(openTag).length;
                  }
                }
                if (to === -1) {
                  throw new Error('Unmatched tag ' + tagname + ' in ' + html)
                }

                return chunk;
              }
              //
              // compileMappings
              //
              // sort the mappings so that mappings for the same attribute and value go consecutive
              // and inside those, those that change attributes appear first.
              //
              function compileMappings(oldMappings) {
                var mappings = oldMappings.slice(0);

                mappings.sort(function(map1, map2) {
                  if (!map1.attribute) return 1;
                  if (!map2.attribute) return -1;

                  if (map1.attribute !== map2.attribute) {
                    return map1.attribute < map2.attribute ? -1 : 1;
                  }
                  if (map1.value !== map2.value) {
                    return map1.value < map2.value ? -1 : 1;
                  }
                  if (! ('replace' in map1) && ! ('replace' in map2)) {
                    throw new Error('Conflicting mappings for attribute ' + map1.attribute + ' and value ' + map1.value);
                  }
                  if (map1.replace) {
                    return 1;
                  }
                  return -1;
                });

                return mappings;
              }
              //
              // ### function fetch(data, mapping, value, key)
              // #### @data {Object} the data that we need to fetch a value from
              // #### @mapping {Object} The iterated mapping step
              // #### @tagbody {String} the tagbody we operated against
              // #### @key {String} optional key if the mapping doesn't have a dataKey
              // Fetches the correct piece of data
              //
              function fetch(data, mapping, value, tagbody, key) {
                key = mapping.dataKey || key;

                //
                // Check if we have data manipulation or filtering function.
                //
                if (mapping.dataKey && typeof mapping.dataKey === 'function') {
                  return mapping.dataKey(data, value || '', tagbody || '', key);
                }

                //
                // See if we are using dot notation style
                //
                if (!~key.indexOf('.')) return data[key];

                var result = key
                  , structure = data;

                for (var paths = key.split('.'), i = 0, length = paths.length; i < length && structure; i++) {
                  result = structure[+paths[i] || paths[i]];
                  structure = result;
                }

                return result !== undefined ? result : data[key];
              }
              ///////////////////////////////////////////////////////////////////////////////////////
              Merge.prototype = {
                nest: [],

                tag: new RegExp([
                  '<',
                  '(/?)', // 2 - is closing
                  '([-:\\w]+)', // 3 - name
                  '((?:[-\\w]+(?:', '=',
                  '(?:\\w+|["|\'](?:.*)["|\']))?)*)', // 4 - attributes
                  '(/?)', // 5 - is self-closing
                  '>'
                ].join('\\s*')),

                //
                // HTML attribute parser.
                //
                attr: /([\-\w]*)\s*=\s*(?:(["\'])([\-\.\w\s\/:;&#]*)\2)/gi,

                //
                // In HTML5 it's allowed to have to use self closing tags without closing
                // separators. So we need to detect these elements based on the tag name.
                //
                selfClosing: /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/,

                //
                // ### function hasClass(str, className)
                // #### @str {String} the class attribute
                // #### @className {String} the className that the classAttribute should contain
                //
                // Helper function for detecting if a class attribute contains the className
                //
                hasClass: function hasClass(str, className) {
                  return ~str.split(' ').indexOf(className);
                },

                //
                // ### function iterate(html, value, components, tagname, key)
                // #### @html {String} peice of HTML
                // #### @value {Mixed} iterateable object with data
                // #### @components {Array} result of the this.tag regexp execution
                // #### @tagname {String} the name of the tag that we iterate on
                // #### @key {String} the key of the data that we need to extract from the value
                // #### @map {Object} attribute mappings
                //
                // Iterate over over the supplied HTML.
                //
                iterate: function iterate(html, value, components, tagname, key, map) {
                  var output  = '',
                      segment = matchClosing(components.input, tagname, html),
                      data = {};

                  // Is it an array?
                  if (Array.isArray(value)) {
                    // Yes: set the output to the result of iterating through the array
                    for (var i = 0, l = value.length; i < l; i++) {
                      // If there is a key, then we have a simple object and
                      // must construct a simple object to use as the data
                      if (key) {
                        data[key] = value[i];
                      } else {
                        data = value[i];
                      }

                      output += this.bind(segment, data, map);
                    }

                    return output;
                  } else if (typeof value === 'object') {
                    // We need to refine the selection now that we know we're dealing with a
                    // nested object
                    segment = segment.slice(components.input.length, -(tagname.length + 3));
                    return output += this.bind(segment, value, map);
                  }

                  return value;
                },

                //
                // ### function bind(html, data, map)
                // #### @html {String} the template that we need to modify
                // #### @data {Object} data for the template
                // #### @map {Mapper} instructions for the data placement in the template
                // Process the actual template
                //
                bind: function bind(html, data, map) {
                  if (Array.isArray(data)) {
                    var output = '';

                    for (var i = 0, l = data.length; i<l; i++) {
                      output += this.bind(html, data[i], map);
                    }

                    return output;
                  }

                  html = (html || '').toString();
                  data = data || {};

                  var that = this;

                  var openers = 0,
                      remove = 0,
                      components,
                      attributes,
                      mappings = map && compileMappings(map.mappings),
                      intag = false,
                      tagname = '',
                      isClosing = false,
                      isSelfClosing = false,
                      selfClosing = false,
                      matchmode = false,
                      createAttribute = map && map.conf && map.conf.create,
                      closing,
                      tagbody;

                  var c,
                      buffer = '',
                      left;

                  for (var i = 0, l = html.length; i < l; i++) {
                    c = html.charAt(i);

                    //
                    // Figure out which part of the HTML we are currently processing. And if
                    // we have queued up enough HTML to process it's data.
                    //
                    if (c === '!' && intag && !matchmode) {
                      intag = false;
                      buffer += html.slice(left, i + 1);
                    } else if (c === '<' && !intag) {
                      closing = true;
                      intag = true;
                      left = i;
                    } else if (c === '>' && intag) {
                      intag = false;
                      tagbody = html.slice(left, i + 1);
                      components = this.tag.exec(tagbody);

                      if(!components) {
                        intag = true;
                        continue;
                      }

                      isClosing = components[1];
                      tagname = components[2];
                      attributes = components[3];
                      selfClosing = components[4];
                      isSelfClosing = this.selfClosing.test(tagname);

                      if (matchmode) {
                        //
                        // and its a closing.
                        //
                        if (!!isClosing) {
                          if (openers <= 0) {
                            matchmode = false;
                          } else {
                            --openers;
                          }
                        } else if (!isSelfClosing) {
                          //
                          // and its not a self-closing tag
                          //
                          ++openers;
                        }
                      }

                      if (!isClosing && !matchmode) {
                        //
                        // if there is a match in progress and
                        //
                        if (mappings && mappings.length > 0) {
                          for (var ii = mappings.length - 1; ii >= 0; ii--) {
                            var setAttribute = false
                              , mapping = mappings[ii]
                              , shouldSetAttribute = mapping.re && attributes.match(mapping.re);

                            //
                            // check if we are targetting a element only or attributes
                            //
                            if ('tag' in mapping && !this.attr.test(tagbody) && mapping.tag === tagname) {
                              tagbody = tagbody + fetch(data, mapping, '', tagbody);
                              continue;
                            }

                            tagbody = tagbody.replace(this.attr, function(str, key, q, value, a) {
                              var newdata;

                              if (shouldSetAttribute && mapping.replace !== key || remove) {
                                return str;
                              } else if (shouldSetAttribute || typeof mapping.replacePartial1 !== 'undefined') {
                                setAttribute = true;

                                //
                                // determine if we should use the replace argument or some value from the data object.
                                //
                                if (typeof mapping.replacePartial2 !== 'undefined') {
                                  newdata = value.replace(mapping.replacePartial1, mapping.replacePartial2);
                                } else if (typeof mapping.replacePartial1 !== 'undefined' && mapping.dataKey) {
                                  newdata = value.replace(mapping.replacePartial1, fetch(data, mapping, value, tagbody, key));
                                } else {
                                  newdata = fetch(data, mapping, value, tagbody, key);
                                }

                                return key + '="' + (newdata || '') + '"';
                              } else if (!mapping.replace && mapping.attribute === key) {
                                if (
                                  mapping.value === value ||
                                  that.hasClass(value, mapping.value ||
                                  mappings.conf.where === key) ||
                                  (_toString.call(mapping.value) === '[object RegExp]' &&
                                    mapping.value.exec(value) !== null)
                                ) {
                                  if (mapping.remove) {
                                    //
                                    // only increase the remove counter if it's not a self
                                    // closing element. As matchmode is suffectient to
                                    // remove tose
                                    //
                                    if (!isSelfClosing) remove++;
                                    matchmode = true;
                                  } else if (mapping.plates) {
                                    var partial = that.bind(
                                        mapping.plates
                                      , typeof mapping.data === 'string' ? fetch(data, { dataKey: mapping.data }) : mapping.data || data
                                      , mapping.mapper
                                    );

                                    buffer += tagbody + that.iterate(html, partial, components, tagname, undefined, map);
                                    matchmode = true;
                                  } else {
                                    var v = newdata = fetch(data, mapping, value, tagbody, key);
                                    newdata = tagbody + newdata;

                                    if (Array.isArray(v)) {
                                      newdata = that.iterate(html, v, components, tagname, value, map);
                                      // If the item is an array, then we need to tell
                                      // Plates that we're dealing with nests
                                      that.nest.push(tagname);
                                    } else if (typeof v === 'object') {
                                      newdata = tagbody + that.iterate(html, v, components, tagname, value, map);
                                    }

                                    buffer += newdata || '';
                                    matchmode = true;
                                  }
                                }
                              }

                              return str;
                            });

                            //
                            // Do we need to create the attributes if they don't exist.
                            //
                            if (createAttribute && shouldSetAttribute && !setAttribute) {
                              var spliced = selfClosing ? 2 : 1
                                , close = selfClosing ? '/>': '>'
                                , left = tagbody.substr(0, tagbody.length - spliced);

                              if (left[left.length - 1] === ' ') {
                                left = left.substr(0, left.length - 1);

                                if (selfClosing) {
                                  close = ' ' + close;
                                }
                              }

                              tagbody = [
                                left,
                                ' ',
                                mapping.replace,
                                '="',
                                fetch(data, mapping),
                                '"',
                                close
                              ].join('');
                            }
                          }
                        } else {
                          //
                          // if there is no map, we are just looking to match
                          // the specified id to a data key in the data object.
                          //
                          tagbody.replace(this.attr, function (attr, key, q, value, idx) {
                            if (key === map && map.conf.where || 'id' && data[value]) {
                              var v = data[value],
                                  nest = Array.isArray(v),
                                  output = nest || typeof v === 'object'
                                    ? that.iterate(html.substr(left), v, components, tagname, value, map)
                                    : v;

                              // If the item is an array, then we need to tell
                              // Plates that we're dealing with nests
                              if (nest) { that.nest.push(tagname); }

                              buffer += nest ? output : tagbody + output;
                              matchmode = true;
                            }
                          });
                        }
                      }

                      //
                      // if there is currently no match in progress
                      // just write the tagbody to the buffer.
                      //
                      if (!matchmode && that.nest.length === 0) {
                        if (!remove) buffer += tagbody;

                        if (remove && !!isClosing) --remove;
                      } else if (!matchmode && that.nest.length) {
                          this.nest.pop();
                      }
                    } else if (!intag && !matchmode) {
                      //
                      // currently not inside a tag and there is no
                      // match in progress, we can write the char to
                      // the buffer.
                      //
                      if (!remove) buffer += c;
                    }
                  }
                  return buffer;
                }
              };
              //
              // Expose the Plates#bind interface.
              //
              api.bind = function bind(html, data, map) {
                var merge = new Merge();
                return merge.bind(html, data, map);
              };
              ///////////////////////////////////////////////////////////////////////////////////////
              ///////////////////////////////////////////////////////////////////////////////////////
              return api;
            })(),
 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
                BUILD MODULE                              
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
                for (var prop in PLATES) {
                  api[prop] = PLATES[prop];
                }
              }
            }
          ;
          api.id = ENTITIES.push(api);
          /*-------------------------------------------------------------------
            PUBLIC API EXPORT

              @JOB: make INIT/CONFIGURE and START one method with many params
              @JOB: make module initialization a constructor option
              
          -------------------------------------------------------------------*/
          // [Optional] initialize this module immediately
          api.init({}); // provide optional settings argument
          return ENTITIES[api.id-1];
        })({})
      ;
      MODULE.META = META;
      return MODULE;
    }
    MODULENAME_API.META = META;
    return MODULENAME_API;
  })(
  /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    MODULE CONTEXT
  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
    /*-------------------------------------------------------------------------
      META

      @JOB - http://www.2ality.com/2012/10/javascript-properties.html
        (use to create the stuff below)

    -------------------------------------------------------------------------*/
    {
      NAME    : _dereq_('../package.json').name.toUpperCase(),
      VERSION : 'v' + _dereq_('../package.json').version,
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
          // none
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

},{"../package.json":3}],3:[function(_dereq_,module,exports){
module.exports={
  "name": "plates",
  "version": "0.4.11",
  "description": "Unobtrusive templating for the flatiron framework",
  "keywords": [
    "templates",
    "templating",
    "unobtrusive"
  ],
  "author": {
    "name": "Nodejitsu Inc.",
    "email": "info@nodejitsu.com"
  },
  "license": "MIT",
  "repository": [
    {
      "type": "git",
      "url": "git://github.com/flatiron/plates.git"
    }
  ],
  "devDependencies": {
    "vows": "0.7.x",
    "mustache": "0.4.x",
    "benchmark": "0.2.x"
  },
  "scripts": {
    "test": "vows --spec test/api-test.js"
  },
  "engines": [
    "node"
  ],
  "main": "./lib/plates.js",
  "readme": "![plates](https://github.com/flatiron/plates/raw/master/plates.png)\n\n# Synopsis\nPlates (short for templates) binds data to markup. Plates has NO special syntax. It works in the browser and in [Node.js](http://nodejs.org/).\n\n# Motivation\n- DSLs (Domain Specific Languages) such as <%=foo%> or {{foo}} reduce portability.\n- DOM templating is SLOW.\n- Promote the separation of concerns principle by decoupling decision making from presentation.\n- Make both the code and markup more readable and maintainable by a wider audience.\n\n# Status\n\n[![Build Status](https://secure.travis-ci.org/flatiron/plates.png)](http://travis-ci.org/flatiron/plates)\n\n# Features\n- Automatically bind data to a tag's body by matching unique tag IDs to data keys.\n- Bind data to a tag's body based on any attribute's values.\n- Bind data to a tag's attribute based on any attribute's values.\n\n- TODO: Specify option to create attribute if it does not exist.\n\n# Installation\nThere are a few ways to use `plates`. Install the library using npm. You can add\nit to your `package.json` file as a dependancy, or include the script in your\nHTML page.\n\n# Usage\n\n## Simple case\nBy default, `plates` will try to match the key in the data to an `id` in the\ntag, since both should be unique.\n\n```js\nvar Plates = require('plates');\n\nvar html = '<div id=\"test\">Old Value</div>';\nvar data = { \"test\": \"New Value\" };\n\nvar output = Plates.bind(html, data); \n```\n\n## Explicit instructions\nA common use case is to apply the new value to each tag's body based on the\n`class` attribute.\n\n```js\nvar html = '<span class=\"name\">User</span>...<span class=\"name\">User</span>';\n\nvar data = { \"username\": \"John Smith\" };\nvar map = Plates.Map();\n\nmap.class('name').to('username');\n\nconsole.log(Plates.bind(html, data, map));\n```\n\n## Complex instructions\nAnother common case is to replace the value of an attribute if it is a match.\n\n```js\nvar html = '<a href=\"/\"></a>';\n\nvar data = { \"newurl\": \"http://www.nodejitsu.com\" };\nvar map = Plates.Map();\n\nmap.where('href').is('/').insert('newurl');\n\nconsole.log(Plates.bind(html, data, map));\n```\n\nPartial value replacement\n\n```js\nvar html = '<a href=\"/foo/bar\"></a>';\n\nvar data = { \"newurl\": \"bazz\" };\nvar map = Plates.Map();\n\nmap.where('href').has(/bar/).insert('newurl'); // `has` can take a regular expression.\n\nconsole.log(Plates.bind(html, data, map));\n```\n\nIn even more complex cases, an arbitrary attribute can be specified. If a value\nis matched, a specific value can be used and then used as another attribute's\nvalue.\n\n```js\nvar html = '<img data-foo=\"bar\" src=\"\"></img>';\n\nvar data = { \"imageurl\": \"http://www.nodejitsu.com\" };\nvar map = Plates.Map();\n\nmap.where('data-foo').is('bar').use('imageurl').as('src');\n\nconsole.log(Plates.bind(html, data, map));\n```\n\n## Collections\n\nPlates can also iterate through collections:\n\n```js\nvar html = '<div class=\"name\"></div>';\nvar collection = [\n  {'name': 'Louis CK'},\n  {'name': 'Andy Kindler'},\n  {'name': 'Greg Giraldo'}\n];\n\nconsole.log(Plates.bind(html, collection));\n```\n\n## Partials\n\nPlates also supports partials:\n\n```js\nvar partial = '<li class=\"partial\"></li>';\nvar base = '<div><h1 class=\"foo\"></h1><ul class=\"menu\"></ul></div>';\n\nvar baseData = { foo: 'bar' };\nvar mapping = Plates.Map();\n\nmapping.class('menu').append(partial);\nconsole.log(Plates.bind(base, baseData, mapping));\n```\n\n# API\n\n## Plates Static Methods\n\n```\nfunction Plates.bind(html, data, map)\n@param html {String} A string of well-formed HTML.\n@param data {Object} A JSON object.\n@param map {Object} An instance of `Plates.Map()`.\n\n@return {String} The result of merging the data and html.\n```\n\n## Map Constructor\n\n```\nfunction Plates.Map(options)\n@options {Object} An object literal that contains configuration options.\n  - @option where {String} The default attribute to match on instead of ID.\n  - @option as {String} The default attribute to replace into.\n@return {Object} An object that represents a reusable map, has mapping methods.\n```\n\n## Map Instance Methods\n\n### where()\n\n```\nfunction Map#where(attribute)\n@param attribute {String} An attribute that may be found in a tag.\n\nThis method will initiate a clause. Once a clause has been established,\nother member methods may be chained to each other in any order.\n```\n\n### class(), className()\n\n```\nfunction Map#class(attribute)\n@param attribute {String} A value that may be found in the `class` attribute of a tag.\n```\n\n### is()\n\n```\nfunction Map#is(value)\n@param value {String} The value of the attribute specified in the `where` clause.\n```\n\n### has()\n\n```\nfunction Map#has(value)\n@param value {String|RegExp} The value of the attribute specified in the `where` clause.\n```\n\n### insert()\n\n```\nfunction Map#insert(attribute)\n@param attribute {String} A string that represents a key. Data will be inserted into \nthe attribute that was specified in the `where` clause.\n```\n\n### use()\n\n```\nfunction Map#use(key)\n@param key {String|Function} A string that represents a key in the data object that was provided or a function which returns a string value to use.\n\nIf a function is provided, it will be passed data, value and tagbody parameters.\n```\n\n### to()\n\n```\nfunction Map#to(key)\n@param key {String|Function} A string that represents a key in the data object that was provided or a function which returns a string value to use.\n\nIf a function is provided, it will be passed data, value and tagbody parameters.\n\nSame as `use` method.\n```\n\n### as()\n\n```\nfunction Map#as(attribute)\n@param attribute {String} A string that represents an attribute in the tag.\n\nIf there is no attribute by that name found, one may be created depending on the options\nthat were passed to the `Map` constructor.\n```\n\n### remove()\n\n```\nfunction Map#remove()\n\nRemoves the matching elements from the template.\n```\n\n### append(), partial()\n\n```\nfunction Map#append(html, data, map)\n@param html {String} A string that represents the new template that needs to be\nadded.\n@param data {Mixed} data for the partial, if it's a string it's a reference to a\nkey in the data structure that was supplied to the main template.\n@param map {Plates.Map} data mapping for the partial.\n\nIf the supplied HTML string doesn't contain any HTML markup we assume that we\nthe given string is the location of the template. When you are using Plates on\nthe browser is assumes that you supplied it with an id selector and will fetch\nthe innerHTML from the element. If you are using Plates in Node.js it assumes\nthat you gave it a file path that is relative to the current working directory.\n```\n\n# License\n\n(The MIT License)\n\nCopyright (c) 2011 Nodejitsu Inc. http://www.twitter.com/nodejitsu\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the 'Software'), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
  "readmeFilename": "README.md",
  "_id": "plates@0.4.11",
  "_shasum": "afa82ccd49f797b490e90f0dfd8b59e4217e4099",
  "_resolved": "git://github.com/coding-amigos/plates#440c09610d22d04a8152afcd6eadb4beaa8c67b3",
  "_from": "plates@git://github.com/coding-amigos/plates#v0.4.11"
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NlcmFwYXRoL3dvcmtzcGFjZS9jb2RpbmdhbWlnb3MvaG9sb24vbm9kZV9tb2R1bGVzL2F0b21pZnkvbm9kZV9tb2R1bGVzL2F0b21pZnktanMvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9ob21lL3NlcmFwYXRoL3dvcmtzcGFjZS9jb2RpbmdhbWlnb3MvaG9sb24vU09VUkNFL2luZGV4LmpzIiwiL2hvbWUvc2VyYXBhdGgvd29ya3NwYWNlL2NvZGluZ2FtaWdvcy9ob2xvbi9ub2RlX21vZHVsZXMvcGxhdGVzL2xpYi9wbGF0ZXMuanMiLCIvaG9tZS9zZXJhcGF0aC93b3Jrc3BhY2UvY29kaW5nYW1pZ29zL2hvbG9uL25vZGVfbW9kdWxlcy9wbGF0ZXMvcGFja2FnZS5qc29uIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNweUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gTU9EVUxFX2hvbG9uO1xuXG52YXIgUGxhdGVzID0gcmVxdWlyZSgncGxhdGVzJyk7XG5cbmZ1bmN0aW9uIE1PRFVMRV9ob2xvbiAoKSB7XG4gIHJldHVybiB7XG4gICAgUGxhdGVzOiBQbGF0ZXMsXG4gICAgaG9sb25pemU6IHt9XG4gIH07XG59IFxuIiwiLyo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6OlxuICBDT01NT05KUyBNT0RVTEUgRVhQT1JUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChWZXJzaW9uIDAuMC4wKVxuXG4gICAgQEpPQjogWUVPTUFOIG9yIE5HRU4gR0VORVJBVE9SIGZvciBDb21wb25lbnRzIHNjaHJlaWJlblxuICAgIEBKT0I6IGRyb3BpbiB2cyBjb25maWd1cmFibGVcbiAgICBASk9COiBNYWtlIFwiQ09NTUVOVFNcIiBjcmVhdGUgYSBuaWNlIHZpc3VhbCBzdHJ1Y3R1cmUgb2YgbW9kdWxlIGluIG1pbml2aWV3XG5cbjo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ki9cbihmdW5jdGlvbiBDT01NT05KU19FWFBPUlRFUiAoRkFDVE9SWSkge1xuICAndXNlIHN0cmljdCc7XG4gIC8vIElmIE1PRFVMRSBpcyBhIFwiRHJvcCBJblwiIHdoaWNoIGV4ZWN1dGVzIG9uY2UgYWZ0ZXIgbG9hZGluZzpcbiAgbW9kdWxlLmV4cG9ydHMgPSBGQUNUT1JZKC8qd2l0aCBwcmVkZWZpbmVkIHNldCBvZiBQQVJBTVMqLyk7IC8vIENvbW1vbkpTXG4gIC8vIC8vIEVMU0UgSUYgTU9EVUxFIGlzIE90aGVyd2lzZSBhIENPTkZJR1VSQUJMRTpcbiAgLy8gbW9kdWxlLmV4cG9ydHMgPSBGQUNUT1JZO1xufSkoXG4gIC8qOjo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6XG4gICAgTU9EVUxFTkFNRSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzIGxlZ28pXG4gIDo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6OiovXG4gIChmdW5jdGlvbiBNT0RVTEVfTU9EVUxFTkFNRSAoTUVUQSwgRU5USVRJRVMsIERFUHMsIHdpbmRvdywgZ2xvYmFsLCB1bmRlZmluZWQpXG4gIHsgLy8gdG8gc2hpZWxkIE1PRFVMRSBmcm9tIG92ZXJyaWRlbiAndW5kZWZpbmVkJyBhbmQgZ2xvYmFsIG9iamVjdCBwb2xsdXRpb25cbiAgICAndXNlIHN0cmljdCc7XG4gICAgZnVuY3Rpb24gTU9EVUxFTkFNRV9BUEkgKFxuICAgICAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBNT0RVTEUgQVBJXG4gICAgICBcbiAgICAgICAgICBVU0FHRTpcbiAgICAgICAgICAgIC4uLlxuICAgICAgXFwqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgICAgIC8vSU5KRUNURUQgREVQRU5ERU5DSUVTOlxuICAgICAgQ09OVEFJTkVSLCAgLy8gRE9NIEZvcm0gRWxlbWVudCB0byBhcHBseSBNT0RVTEVOQU1FIHRvXG4gICAgICAvL09QVElPTlM6XG4gICAgICBTRVRUSU5HUywgICAvLyBPUFRJT05BTCAtLSBuYW1lOnN0cmluZywgcmVxdWlyZWQ6Ym9vbGVhbiwgbWluUXVlcnlMZW5ndGg6bnVtYmVyXG4gICAgICBTVUdHRVNUSU9OUyAvLyBPcHRpb25hbCBBUlJBWSBmcm9tIHdoaWNoIHRvIGNob29zZSBhdXRvY29tcGxldGUgU1VHR0VTVElPTlNcbiAgICApIHtcbiAgICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgUEFSQU1FVEVSIFZBTElEQVRJT04gKyBTQU5JVElaQVRJT05cblxuICAgICAgICBASk9COiBSZWZpbmUgYmVoYXZpb3IgaW4gcmVsYXRpb24gdG8gZ2l2ZW4gaW5wdXRcbiAgICAgICAgQEpPQjogT25seSBkbyBpZiBub3Qgc2luZ2xldG9uIGFuZCBzaW5nbGUgaW5zdGFuY2UgYWxyZWFkeSBleGlzdHNcbiAgICAgICAgQEFTU0VSVDogYXQgbGVhc3Qgb25lICdiaWxsYm9hcmRzJyBpcyBnaXZlbiBpbiBTRVRUSU5HUy5iaWxsYm9hcmRzXG4gICAgICAgICAgZWxzZTogcmV0dXJuIHdpdGhvdXQgY3JlYXRpbmcgYW55dGhpbmcgbmV3IVxuICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICAgICAgU0VUVElOR1MgPSB0eXBlb2YgU0VUVElOR1MgPT09ICd1bmRlZmluZWQnID9cbiAgICAgICAgeyAvLyBERUZBVUxUIFNFVFRJTkdTXG4gICAgICAgICAgLy8gc2V0dGluZ3MgICAgICA6IHtwbGFjZWhvbGRlcjogJ1NlYXJjaCcsIHZhbHVlOiAnJywgbWluUXVlcnlMZW5ndGg6IDB9LFxuICAgICAgICAgIC8vIFNVR0dFU1RJT05TICAgOiBbXSxcbiAgICAgICAgICAvLyBzZWxlY3Rpb24gICAgIDogJycsXG4gICAgICAgICAgLy8gb25RdWVyeUNoYW5nZSA6IGZ1bmN0aW9uIG9uUXVlcnlDaGFuZ2UgKG9sZFF1ZXJ5LCBuZXdRdWVyeSkge1xuICAgICAgICAgIC8vICAgcmV0dXJuO1xuICAgICAgICAgIC8vIH1cbiAgICAgICAgfVxuICAgICAgICA6IFNFVFRJTkdTIC8vIEBKT0I6IEV4dGVuZCBub24tZ2l2ZW4gT1BUSU9OUyB3aXRoIERFRkFVTFRTLCBhbGxvdyBvdmVycmlkZSBkZWZ1YWx0cyB3aXRoIFwiTlVMTFwiXG4gICAgICA7XG4gICAgICAvKjo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6XG4gICAgICAgIE1PRFVMRSBDUkVBVElPTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChidWlsZCB0aGlzIGxlZ28pXG4gICAgICA6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6OiovXG4gICAgICB2YXIgTU9EVUxFID0gXG4gICAgICAgIEVOVElUSUVTLmxlbmd0aCA/IEVOVElUSUVTW0VOVElUSUVTLmxlbmd0aC0xXSA6IC8vIEBKT0I6IGlmIHNpbmdsZXRvbiB2cyBmYWN0b3J5XG4gICAgICAgIChmdW5jdGlvbiBNT0RVTEVOQU1FIChTVEFURSkge1xuICAgICAgICAgIHZhclxuICAgICAgICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgVEVNUExBVEUgLSBCVUlMRElOR1xuICAgICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICAgICAgICAgICAgLy8gbm9uZVxuICAgICAgICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgVEVNUExBVEUgLSBDVVNUT01JWkFUSU9OIChNYXJrdXAsIFByb3BlcnRpZXMsIFN0eWxpbmcpXG4gICAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4gICAgICAgICAgICAvLyBub25lXG4gICAgICAgICAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICBERUZJTkVcbiAgICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAgICAgICAgIFBMQVRFUyA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHZhciBhcGkgPSB7fTtcbiAgICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgICAgICAgICAvLyBHRU5FUkFMIEhFTFBFUlNcbiAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgLy8gQ2FjaGUgdmFyaWFibGVzIHRvIGluY3JlYXNlIGxvb2t1cCBzcGVlZC5cbiAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgdmFyIF90b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG4gICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgIC8vIFBvbHlmaWxsIHRoZSBBcnJheSNpbmRleE9mIG1ldGhvZCBmb3IgY3Jvc3MgYnJvd3NlciBjb21wYXRpYmlsaXR5LlxuICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICBbXS5pbmRleE9mIHx8IChBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIGluZGV4T2YoYSwgYiAsYyl7XG4gICAgICAgICAgICAgICAgZm9yIChcbiAgICAgICAgICAgICAgICAgIGMgPSB0aGlzLmxlbmd0aCAsIGIgPSAoYysgfn5iKSAlIGM7XG4gICAgICAgICAgICAgICAgICBiIDwgYyAmJiAoIShiIGluIHRoaXMpIHx8IHRoaXNbYl0gIT09YSApO1xuICAgICAgICAgICAgICAgICAgYisrXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBiXmMgPyBiIDogLTE7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAvLyBQb2x5ZmlsbCBBcnJheS5pc0FycmF5IGZvciBjcm9zcyBicm93c2VyIGNvbXBhdGliaWxpdHkuXG4gICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkgfHwgKEFycmF5LmlzQXJyYXkgPSBmdW5jdGlvbiBpc0FycmF5KGEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RvU3RyaW5nLmNhbGwoYSkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgIC8vICMjIyBmdW5jdGlvbiBNYXBwZXIoY29uZilcbiAgICAgICAgICAgICAgLy8gIyMjIyBAY29uZiB7T2JqZWN0fSBjb25maWd1cmF0aW9uIG9iamVjdFxuICAgICAgICAgICAgICAvLyBDb25zdHJ1Y3RvciBmdW5jdGlvbiBmb3IgdGhlIE1hcHBlciBpbnN0YW5jZSB0aGF0IGlzIHJlc3BvbnNpYmxlIGZvclxuICAgICAgICAgICAgICAvLyBwcm92aWRpbmcgdGhlIG1hcHBpbmcgZm9yIHRoZSBkYXRhIHN0cnVjdHVyZVxuICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICBmdW5jdGlvbiBNYXBwZXIoY29uZikge1xuICAgICAgICAgICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBNYXBwZXIpKSB7IHJldHVybiBuZXcgTWFwcGVyKGNvbmYpOyB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm1hcHBpbmdzID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5jb25mID0gY29uZiB8fCB7fTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBNQVBQRVIgSEVMUEVSU1xuICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAvLyAjIyMgZnVuY3Rpb24gbGFzdChuZXdpdGVtKVxuICAgICAgICAgICAgICAvLyAjIyMjIEBuZXdpdGVtIHtCb29sZWFufSBkbyB3ZSBuZWVkIHRvIGFkZCBhIG5ldyBpdGVtIHRvIHRoZSBtYXBwaW5nXG4gICAgICAgICAgICAgIC8vIEhlbHBlciBmdW5jdGlvbiBmb3IgYWRkaW5nIG5ldyBhdHRyaWJ1dGUgbWFwcyB0byBhIE1hcHBlciBpbnN0YW5jZVxuICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICBmdW5jdGlvbiBsYXN0KG5ld2l0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAobmV3aXRlbSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5tYXBwaW5ncy5wdXNoKHt9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgbSA9IHRoaXMubWFwcGluZ3NbdGhpcy5tYXBwaW5ncy5sZW5ndGggLSAxXTtcblxuICAgICAgICAgICAgICAgIGlmIChtICYmIG0uYXR0cmlidXRlICYmIG0udmFsdWUgJiYgbS5kYXRhS2V5ICYmIG0ucmVwbGFjZSkge1xuICAgICAgICAgICAgICAgICAgbS5yZSA9IG5ldyBSZWdFeHAobS5hdHRyaWJ1dGUgKyAnPShbXFwnXCJdPyknICsgbS52YWx1ZSArICdcXFxcMScpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobSkge1xuICAgICAgICAgICAgICAgICAgZGVsZXRlIG0ucmU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBhY3R1YWwgY2hhaW5hYmxlIG1ldGhvZHM6IHdoZXJlKCdjbGFzcycpLmlzKCdmb28nKS5pbnNlcnQoJ2JsYScpXG4gICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgIE1hcHBlci5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyAjIyMgZnVuY3Rpb24gYXBwZW5kKHBsYXRlcywgZGF0YSwgbWFwKVxuICAgICAgICAgICAgICAgIC8vICMjIyMgQHBsYXRlcyB7U3RyaW5nfSBUZW1wbGF0ZSBvciBwYXRoL2lkIG9mIHRoZSB0ZW1wbGF0ZVxuICAgICAgICAgICAgICAgIC8vICMjIyMgQGRhdGEge09iamVjdHxTdHJpbmd9IGRhdGEgZm9yIHRoZSBhcHBlbmRlZCB0ZW1wbGF0ZVxuICAgICAgICAgICAgICAgIC8vICMjIyMgQG1hcCB7UGxhdGVzLk1hcH0gbWFwcGluZyBmb3IgdGhlIGRhdGFcbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIGFwcGVuZDogZnVuY3Rpb24gYXBwZW5kKHBsYXRlcywgZGF0YSwgbWFwKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgbCA9IGxhc3QuY2FsbCh0aGlzKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBNYXBwZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFwID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGwucGxhdGVzID0gcGxhdGVzO1xuICAgICAgICAgICAgICAgICAgbC5kYXRhID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgIGwubWFwcGVyID0gbWFwO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gbGFzdC5jYWxsKHRoaXMsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyAjIyMgZnVuY3Rpb24gcmVtb3ZlKClcbiAgICAgICAgICAgICAgICAvLyBUaGlzIHdpbGwgcmVtb3ZlIHRoZSBlbGVtZW50IHRoYXQgd2FzIHNwZWNpZmllZCBpbiB0aGUgYHdoZXJlYCBjbGF1c2VcbiAgICAgICAgICAgICAgICAvLyBmcm9tIHRoZSB0ZW1wbGF0ZS5cbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgICAgICAgICAgICAgbGFzdC5jYWxsKHRoaXMpLnJlbW92ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbGFzdC5jYWxsKHRoaXMsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyAjIyMgZnVuY3Rpb24gYXModmFsKVxuICAgICAgICAgICAgICAgIC8vICMjIyMgQHZhbCB7U3RyaW5nfSBBIHN0cmluZyB0aGF0IHJlcHJlc2VudHMgYW4gYXR0cmlidXRlIGluIHRoZSB0YWcuXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gYXR0cmlidXRlIGJ5IHRoYXQgbmFtZSBuYW1lIGZvdW5kLCBvbmUgbWF5IGJlIGNyZWF0ZWRcbiAgICAgICAgICAgICAgICAvLyBkZXBlbmRpbmcgb24gdGhlIG9wdGlvbnMgdGhhdCB3aGVyZSBwYXNzZWQgaW4gdGhlIGBQbGF0ZXMuTWFwYFxuICAgICAgICAgICAgICAgIC8vIGNvbnN0cnVjdG9yLlxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgYXM6IGZ1bmN0aW9uIGFzKHZhbCkge1xuICAgICAgICAgICAgICAgICAgbGFzdC5jYWxsKHRoaXMpLnJlcGxhY2UgPSB2YWw7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbGFzdC5jYWxsKHRoaXMpICYmIHRoaXM7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIC8vICMjIyBmdW5jdGlvbiBpbnNlcnQodmFsKVxuICAgICAgICAgICAgICAgIC8vICMjIyMgQHZhbCB7U3RyaW5nfSBBIHN0cmluZyB0aGF0IHJlcHJlc2VudHMgYSBrZXkuIERhdGEgd2lsbCBiZSBpbnNlcnRlZFxuICAgICAgICAgICAgICAgIC8vIGluIHRvIHRoZSBhdHRyaWJ1dGUgdGhhdCB3YXMgc3BlY2lmaWVkIGluIHRoZSBgd2hlcmVgIGNsYXVzZS5cbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIGluc2VydDogZnVuY3Rpb24gaW5zZXJ0KHZhbCkge1xuICAgICAgICAgICAgICAgICAgdmFyIGwgPSBsYXN0LmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICBsLnJlcGxhY2UgPSBsLmF0dHJpYnV0ZTtcbiAgICAgICAgICAgICAgICAgIGwuZGF0YUtleSA9IHZhbDtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBsYXN0LmNhbGwodGhpcykgJiYgdGhpcztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gIyMjIGZ1bmN0aW9uIGhhcyh2YWwpXG4gICAgICAgICAgICAgICAgLy8gIyMjIyBAdmFsIHtTdHJpbmd8UmVnRXhwfSBUaGUgdmFsdWUgb2YgdGhlIGF0dHJpYnV0ZSB0aGF0IHdhcyBzcGVjaWZpZWRcbiAgICAgICAgICAgICAgICAvLyBpbiB0aGUgYHdoZXJlYCBjbGF1c2UuXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICBoYXM6IGZ1bmN0aW9uIGhhcyh2YWwpIHtcbiAgICAgICAgICAgICAgICAgIGxhc3QuY2FsbCh0aGlzKS52YWx1ZSA9IHZhbDtcbiAgICAgICAgICAgICAgICAgIHRoaXMucmVwbGFjZSh2YWwpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGxhc3QuY2FsbCh0aGlzKSAmJiB0aGlzO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyAjIyMgZnVuY3Rpb24gaXModmFsKVxuICAgICAgICAgICAgICAgIC8vICMjIyMgQHZhbCB7c3RyaW5nfSBUaGUgdmFsdWUgb2YgdGhlIGF0dHJpYnV0ZSB0aGF0IHdhcyBzcGVjaWZpZWQgaW4gdGhlXG4gICAgICAgICAgICAgICAgLy8gYHdoZXJlYCBjbGF1c2UuXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICBpczogZnVuY3Rpb24gaXModmFsKSB7XG4gICAgICAgICAgICAgICAgICBsYXN0LmNhbGwodGhpcykudmFsdWUgPSB2YWw7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbGFzdC5jYWxsKHRoaXMpICYmIHRoaXM7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIC8vICMjIyBmdW5jdGlvbiB0YWcodmFsKVxuICAgICAgICAgICAgICAgIC8vICMjIyMgQHZhbCB7U3RyaW5nfSB0aGUgbmFtZSBvZiB0aGUgdGFnIHNob3VsZCBiZSBmb3VuZFxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgdGFnOiBmdW5jdGlvbiB0YWcodmFsKSB7XG4gICAgICAgICAgICAgICAgICBsYXN0LmNhbGwodGhpcywgdHJ1ZSkudGFnID0gdmFsO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIC8vICMjIyBmdW5jdGlvbiBjbGFzcyh2YWwpXG4gICAgICAgICAgICAgICAgLy8gIyMjIyBAdmFsIHtTdHJpbmd9IGEgdmFsdWUgdGhhdCBtYXkgYmUgZm91bmQgaW4gdGhlIGBjbGFzc2AgYXR0cmlidXRlIG9mIGEgdGFnXG4gICAgICAgICAgICAgICAgLy8gdGhlIG1ldGhvZCBuYW1lIHNob3VsZCBiZSB3cmFwcGVkIGluIHF1b3RlcyBvciBpdCB3aWxsIHRocm93IGVycm9ycyBpbiBJRS5cbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICdjbGFzcyc6IGZ1bmN0aW9uIGNsYXNzTmFtZSh2YWwpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndoZXJlKCdjbGFzcycpLmlzKHZhbCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIC8vICMjIyBmdW5jdGlvbiB3aGVyZSh2YWwpXG4gICAgICAgICAgICAgICAgLy8gIyMjIyBAdmFsIHtTdHJpbmd9IGFuIGF0dHJpYnV0ZSB0aGF0IG1heSBiZSBmb3VuZCBpbiBhIHRhZ1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgbWV0aG9kIHdpbGwgaW5pdGlhdGUgYSBjbGF1c2UuIE9uY2UgYSBjbGF1c2UgaGFzIGJlZW4gZXN0YWJsaXNoZWRcbiAgICAgICAgICAgICAgICAvLyBvdGhlciBtZW1iZXIgbWV0aG9kcyB3aWxsIGJlIGNoYWluZWQgdG8gZWFjaCBvdGhlciBpbiBhbnkgb3JkZXIuXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICB3aGVyZTogZnVuY3Rpb24gd2hlcmUodmFsKSB7XG4gICAgICAgICAgICAgICAgICBsYXN0LmNhbGwodGhpcywgdHJ1ZSkuYXR0cmlidXRlID0gdmFsO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGxhc3QuY2FsbCh0aGlzKSAmJiB0aGlzO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyAjIyMgZnVuY3Rpb24gdXNlKHZhbClcbiAgICAgICAgICAgICAgICAvLyAjIyMjIEB2YWwge1N0cmluZ30gQSBzdHJpbmcgdGhhdCByZXByZXNlbnRzIGEga2V5LlxuICAgICAgICAgICAgICAgIC8vIERhdGEgd2lsbCBiZSBpbnNlcnRlZCBpbnRvIHRoZSBhdHRyaWJ1dGUgdGhhdCB3YXMgc3BlY2lmaWVkIGluIHRoZVxuICAgICAgICAgICAgICAgIC8vIGB3aGVyZWAgY2xhdXNlLlxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgdXNlOiBmdW5jdGlvbiB1c2UodmFsKSB7XG4gICAgICAgICAgICAgICAgICBsYXN0LmNhbGwodGhpcykuZGF0YUtleSA9IHZhbDtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBsYXN0LmNhbGwodGhpcykgJiYgdGhpcztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gIyMjIGZ1bmN0aW9uIHJlcGxhY2UodmFsMSwgdmFsMilcbiAgICAgICAgICAgICAgICAvLyAjIyMjIEB2YWwxIHtTdHJpbmd8UmVnRXhwfSBUaGUgcGFydCBvZiB0aGUgYXR0cmlidXRlIHRoYXQgbmVlZHMgdG8gYmUgcmVwbGFjZWRcbiAgICAgICAgICAgICAgICAvLyAjIyMjIEB2YWwyIHtTdHJpbmd9IFRoZSB2YWx1ZSBpdCBzaG91bGQgYmUgcmVwbGFjZWQgd2l0aFxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgcmVwbGFjZTogZnVuY3Rpb24gcmVwbGFjZSh2YWwxLCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgbCA9IGxhc3QuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgIGwucmVwbGFjZVBhcnRpYWwxID0gdmFsMTtcbiAgICAgICAgICAgICAgICAgIGwucmVwbGFjZVBhcnRpYWwyID0gdmFsMjtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgLy8gUHJvdmlkZSBoZWxwZnVsIGFsaWFzZXMgdGhhdCB3ZWxsIGhlbHAgd2l0aCBpbmNyZWFzZWQgY29tcGF0aWJpbGl0eSBhcyBub3RcbiAgICAgICAgICAgICAgLy8gYWxsIGJyb3dzZXJzIGFsbG93IHRoZSBNYXBwZXIjY2xhc3MgcHJvdG90eXBlIChJRSkuXG4gICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgIE1hcHBlci5wcm90b3R5cGUuY2xhc3NOYW1lID0gTWFwcGVyLnByb3RvdHlwZVsnY2xhc3MnXTtcbiAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgLy8gQWxpYXNlcyBvZiBkaWZmZXJlbnQgbWV0aG9kcy5cbiAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgTWFwcGVyLnByb3RvdHlwZS5wYXJ0aWFsID0gTWFwcGVyLnByb3RvdHlwZS5hcHBlbmQ7XG4gICAgICAgICAgICAgIE1hcHBlci5wcm90b3R5cGUudG8gPSBNYXBwZXIucHJvdG90eXBlLnVzZTtcbiAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgLy8gRXhwb3NlIHRoZSBNYXBwZXIuXG4gICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgIGFwaS5NYXAgPSBNYXBwZXI7XG4gICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAgICAgICAgICAgdmFyIE1lcmdlID0gZnVuY3Rpb24gTWVyZ2UoKSB7fTtcbiAgICAgICAgICAgICAgLy8vLy8gTUVSR0UgSEVMUEVSU1xuICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICBmdW5jdGlvbiBtYXRjaENsb3NpbmcoaW5wdXQsIHRhZ25hbWUsIGh0bWwpIHsgLy8gTWF0Y2hlcyBhIGNsb3NpbmcgdGFnIHRvIGEgb3BlbiB0YWdcbiAgICAgICAgICAgICAgICB2YXIgY2xvc2VUYWcgPSAnPC8nICsgdGFnbmFtZSArICc+JyxcbiAgICAgICAgICAgICAgICAgICAgb3BlblRhZyAgPSBuZXcgUmVnRXhwKCc8IConICsgdGFnbmFtZSArICcoICp8PiknLCAnZycpLFxuICAgICAgICAgICAgICAgICAgICBjbG9zZUNvdW50ID0gMCxcbiAgICAgICAgICAgICAgICAgICAgb3BlbkNvdW50ID0gLTEsXG4gICAgICAgICAgICAgICAgICAgIGZyb20sIHRvLCBjaHVua1xuICAgICAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgICAgICBmcm9tID0gaHRtbC5zZWFyY2goaW5wdXQpO1xuICAgICAgICAgICAgICAgIHRvID0gZnJvbTtcblxuICAgICAgICAgICAgICAgIHdoaWxlKHRvID4gLTEgJiYgY2xvc2VDb3VudCAhPT0gb3BlbkNvdW50KSB7XG4gICAgICAgICAgICAgICAgICB0byA9IGh0bWwuaW5kZXhPZihjbG9zZVRhZywgdG8pO1xuICAgICAgICAgICAgICAgICAgaWYgKHRvID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdG8gKz0gdGFnbmFtZS5sZW5ndGggKyAzO1xuICAgICAgICAgICAgICAgICAgICBjbG9zZUNvdW50ICsrO1xuICAgICAgICAgICAgICAgICAgICBjaHVuayA9IGh0bWwuc2xpY2UoZnJvbSwgdG8pO1xuICAgICAgICAgICAgICAgICAgICBvcGVuQ291bnQgPSBjaHVuay5tYXRjaChvcGVuVGFnKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0byA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5tYXRjaGVkIHRhZyAnICsgdGFnbmFtZSArICcgaW4gJyArIGh0bWwpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNodW5rO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgIC8vIGNvbXBpbGVNYXBwaW5nc1xuICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAvLyBzb3J0IHRoZSBtYXBwaW5ncyBzbyB0aGF0IG1hcHBpbmdzIGZvciB0aGUgc2FtZSBhdHRyaWJ1dGUgYW5kIHZhbHVlIGdvIGNvbnNlY3V0aXZlXG4gICAgICAgICAgICAgIC8vIGFuZCBpbnNpZGUgdGhvc2UsIHRob3NlIHRoYXQgY2hhbmdlIGF0dHJpYnV0ZXMgYXBwZWFyIGZpcnN0LlxuICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICBmdW5jdGlvbiBjb21waWxlTWFwcGluZ3Mob2xkTWFwcGluZ3MpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWFwcGluZ3MgPSBvbGRNYXBwaW5ncy5zbGljZSgwKTtcblxuICAgICAgICAgICAgICAgIG1hcHBpbmdzLnNvcnQoZnVuY3Rpb24obWFwMSwgbWFwMikge1xuICAgICAgICAgICAgICAgICAgaWYgKCFtYXAxLmF0dHJpYnV0ZSkgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgICBpZiAoIW1hcDIuYXR0cmlidXRlKSByZXR1cm4gLTE7XG5cbiAgICAgICAgICAgICAgICAgIGlmIChtYXAxLmF0dHJpYnV0ZSAhPT0gbWFwMi5hdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hcDEuYXR0cmlidXRlIDwgbWFwMi5hdHRyaWJ1dGUgPyAtMSA6IDE7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBpZiAobWFwMS52YWx1ZSAhPT0gbWFwMi52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWFwMS52YWx1ZSA8IG1hcDIudmFsdWUgPyAtMSA6IDE7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBpZiAoISAoJ3JlcGxhY2UnIGluIG1hcDEpICYmICEgKCdyZXBsYWNlJyBpbiBtYXAyKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbmZsaWN0aW5nIG1hcHBpbmdzIGZvciBhdHRyaWJ1dGUgJyArIG1hcDEuYXR0cmlidXRlICsgJyBhbmQgdmFsdWUgJyArIG1hcDEudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgaWYgKG1hcDEucmVwbGFjZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBtYXBwaW5ncztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAvLyAjIyMgZnVuY3Rpb24gZmV0Y2goZGF0YSwgbWFwcGluZywgdmFsdWUsIGtleSlcbiAgICAgICAgICAgICAgLy8gIyMjIyBAZGF0YSB7T2JqZWN0fSB0aGUgZGF0YSB0aGF0IHdlIG5lZWQgdG8gZmV0Y2ggYSB2YWx1ZSBmcm9tXG4gICAgICAgICAgICAgIC8vICMjIyMgQG1hcHBpbmcge09iamVjdH0gVGhlIGl0ZXJhdGVkIG1hcHBpbmcgc3RlcFxuICAgICAgICAgICAgICAvLyAjIyMjIEB0YWdib2R5IHtTdHJpbmd9IHRoZSB0YWdib2R5IHdlIG9wZXJhdGVkIGFnYWluc3RcbiAgICAgICAgICAgICAgLy8gIyMjIyBAa2V5IHtTdHJpbmd9IG9wdGlvbmFsIGtleSBpZiB0aGUgbWFwcGluZyBkb2Vzbid0IGhhdmUgYSBkYXRhS2V5XG4gICAgICAgICAgICAgIC8vIEZldGNoZXMgdGhlIGNvcnJlY3QgcGllY2Ugb2YgZGF0YVxuICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICBmdW5jdGlvbiBmZXRjaChkYXRhLCBtYXBwaW5nLCB2YWx1ZSwgdGFnYm9keSwga2V5KSB7XG4gICAgICAgICAgICAgICAga2V5ID0gbWFwcGluZy5kYXRhS2V5IHx8IGtleTtcblxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgd2UgaGF2ZSBkYXRhIG1hbmlwdWxhdGlvbiBvciBmaWx0ZXJpbmcgZnVuY3Rpb24uXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICBpZiAobWFwcGluZy5kYXRhS2V5ICYmIHR5cGVvZiBtYXBwaW5nLmRhdGFLZXkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBtYXBwaW5nLmRhdGFLZXkoZGF0YSwgdmFsdWUgfHwgJycsIHRhZ2JvZHkgfHwgJycsIGtleSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyBTZWUgaWYgd2UgYXJlIHVzaW5nIGRvdCBub3RhdGlvbiBzdHlsZVxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgaWYgKCF+a2V5LmluZGV4T2YoJy4nKSkgcmV0dXJuIGRhdGFba2V5XTtcblxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBrZXlcbiAgICAgICAgICAgICAgICAgICwgc3RydWN0dXJlID0gZGF0YTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIHBhdGhzID0ga2V5LnNwbGl0KCcuJyksIGkgPSAwLCBsZW5ndGggPSBwYXRocy5sZW5ndGg7IGkgPCBsZW5ndGggJiYgc3RydWN0dXJlOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHN0cnVjdHVyZVsrcGF0aHNbaV0gfHwgcGF0aHNbaV1dO1xuICAgICAgICAgICAgICAgICAgc3RydWN0dXJlID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQgIT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRhdGFba2V5XTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAgICAgICAgICAgTWVyZ2UucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgICAgIG5lc3Q6IFtdLFxuXG4gICAgICAgICAgICAgICAgdGFnOiBuZXcgUmVnRXhwKFtcbiAgICAgICAgICAgICAgICAgICc8JyxcbiAgICAgICAgICAgICAgICAgICcoLz8pJywgLy8gMiAtIGlzIGNsb3NpbmdcbiAgICAgICAgICAgICAgICAgICcoWy06XFxcXHddKyknLCAvLyAzIC0gbmFtZVxuICAgICAgICAgICAgICAgICAgJygoPzpbLVxcXFx3XSsoPzonLCAnPScsXG4gICAgICAgICAgICAgICAgICAnKD86XFxcXHcrfFtcInxcXCddKD86LiopW1wifFxcJ10pKT8pKiknLCAvLyA0IC0gYXR0cmlidXRlc1xuICAgICAgICAgICAgICAgICAgJygvPyknLCAvLyA1IC0gaXMgc2VsZi1jbG9zaW5nXG4gICAgICAgICAgICAgICAgICAnPidcbiAgICAgICAgICAgICAgICBdLmpvaW4oJ1xcXFxzKicpKSxcblxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gSFRNTCBhdHRyaWJ1dGUgcGFyc2VyLlxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgYXR0cjogLyhbXFwtXFx3XSopXFxzKj1cXHMqKD86KFtcIlxcJ10pKFtcXC1cXC5cXHdcXHNcXC86OyYjXSopXFwyKS9naSxcblxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gSW4gSFRNTDUgaXQncyBhbGxvd2VkIHRvIGhhdmUgdG8gdXNlIHNlbGYgY2xvc2luZyB0YWdzIHdpdGhvdXQgY2xvc2luZ1xuICAgICAgICAgICAgICAgIC8vIHNlcGFyYXRvcnMuIFNvIHdlIG5lZWQgdG8gZGV0ZWN0IHRoZXNlIGVsZW1lbnRzIGJhc2VkIG9uIHRoZSB0YWcgbmFtZS5cbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIHNlbGZDbG9zaW5nOiAvXihhcmVhfGJhc2V8YnJ8Y29sfGNvbW1hbmR8ZW1iZWR8aHJ8aW1nfGlucHV0fGtleWdlbnxsaW5rfG1ldGF8cGFyYW18c291cmNlfHRyYWNrfHdicikkLyxcblxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gIyMjIGZ1bmN0aW9uIGhhc0NsYXNzKHN0ciwgY2xhc3NOYW1lKVxuICAgICAgICAgICAgICAgIC8vICMjIyMgQHN0ciB7U3RyaW5nfSB0aGUgY2xhc3MgYXR0cmlidXRlXG4gICAgICAgICAgICAgICAgLy8gIyMjIyBAY2xhc3NOYW1lIHtTdHJpbmd9IHRoZSBjbGFzc05hbWUgdGhhdCB0aGUgY2xhc3NBdHRyaWJ1dGUgc2hvdWxkIGNvbnRhaW5cbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIC8vIEhlbHBlciBmdW5jdGlvbiBmb3IgZGV0ZWN0aW5nIGlmIGEgY2xhc3MgYXR0cmlidXRlIGNvbnRhaW5zIHRoZSBjbGFzc05hbWVcbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIGhhc0NsYXNzOiBmdW5jdGlvbiBoYXNDbGFzcyhzdHIsIGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIH5zdHIuc3BsaXQoJyAnKS5pbmRleE9mKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gIyMjIGZ1bmN0aW9uIGl0ZXJhdGUoaHRtbCwgdmFsdWUsIGNvbXBvbmVudHMsIHRhZ25hbWUsIGtleSlcbiAgICAgICAgICAgICAgICAvLyAjIyMjIEBodG1sIHtTdHJpbmd9IHBlaWNlIG9mIEhUTUxcbiAgICAgICAgICAgICAgICAvLyAjIyMjIEB2YWx1ZSB7TWl4ZWR9IGl0ZXJhdGVhYmxlIG9iamVjdCB3aXRoIGRhdGFcbiAgICAgICAgICAgICAgICAvLyAjIyMjIEBjb21wb25lbnRzIHtBcnJheX0gcmVzdWx0IG9mIHRoZSB0aGlzLnRhZyByZWdleHAgZXhlY3V0aW9uXG4gICAgICAgICAgICAgICAgLy8gIyMjIyBAdGFnbmFtZSB7U3RyaW5nfSB0aGUgbmFtZSBvZiB0aGUgdGFnIHRoYXQgd2UgaXRlcmF0ZSBvblxuICAgICAgICAgICAgICAgIC8vICMjIyMgQGtleSB7U3RyaW5nfSB0aGUga2V5IG9mIHRoZSBkYXRhIHRoYXQgd2UgbmVlZCB0byBleHRyYWN0IGZyb20gdGhlIHZhbHVlXG4gICAgICAgICAgICAgICAgLy8gIyMjIyBAbWFwIHtPYmplY3R9IGF0dHJpYnV0ZSBtYXBwaW5nc1xuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gSXRlcmF0ZSBvdmVyIG92ZXIgdGhlIHN1cHBsaWVkIEhUTUwuXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICBpdGVyYXRlOiBmdW5jdGlvbiBpdGVyYXRlKGh0bWwsIHZhbHVlLCBjb21wb25lbnRzLCB0YWduYW1lLCBrZXksIG1hcCkge1xuICAgICAgICAgICAgICAgICAgdmFyIG91dHB1dCAgPSAnJyxcbiAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50ID0gbWF0Y2hDbG9zaW5nKGNvbXBvbmVudHMuaW5wdXQsIHRhZ25hbWUsIGh0bWwpLFxuICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSB7fTtcblxuICAgICAgICAgICAgICAgICAgLy8gSXMgaXQgYW4gYXJyYXk/XG4gICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gWWVzOiBzZXQgdGhlIG91dHB1dCB0byB0aGUgcmVzdWx0IG9mIGl0ZXJhdGluZyB0aHJvdWdoIHRoZSBhcnJheVxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHZhbHVlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlIGlzIGEga2V5LCB0aGVuIHdlIGhhdmUgYSBzaW1wbGUgb2JqZWN0IGFuZFxuICAgICAgICAgICAgICAgICAgICAgIC8vIG11c3QgY29uc3RydWN0IGEgc2ltcGxlIG9iamVjdCB0byB1c2UgYXMgdGhlIGRhdGFcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2tleV0gPSB2YWx1ZVtpXTtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHZhbHVlW2ldO1xuICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSB0aGlzLmJpbmQoc2VnbWVudCwgZGF0YSwgbWFwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgbmVlZCB0byByZWZpbmUgdGhlIHNlbGVjdGlvbiBub3cgdGhhdCB3ZSBrbm93IHdlJ3JlIGRlYWxpbmcgd2l0aCBhXG4gICAgICAgICAgICAgICAgICAgIC8vIG5lc3RlZCBvYmplY3RcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudCA9IHNlZ21lbnQuc2xpY2UoY29tcG9uZW50cy5pbnB1dC5sZW5ndGgsIC0odGFnbmFtZS5sZW5ndGggKyAzKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvdXRwdXQgKz0gdGhpcy5iaW5kKHNlZ21lbnQsIHZhbHVlLCBtYXApO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gIyMjIGZ1bmN0aW9uIGJpbmQoaHRtbCwgZGF0YSwgbWFwKVxuICAgICAgICAgICAgICAgIC8vICMjIyMgQGh0bWwge1N0cmluZ30gdGhlIHRlbXBsYXRlIHRoYXQgd2UgbmVlZCB0byBtb2RpZnlcbiAgICAgICAgICAgICAgICAvLyAjIyMjIEBkYXRhIHtPYmplY3R9IGRhdGEgZm9yIHRoZSB0ZW1wbGF0ZVxuICAgICAgICAgICAgICAgIC8vICMjIyMgQG1hcCB7TWFwcGVyfSBpbnN0cnVjdGlvbnMgZm9yIHRoZSBkYXRhIHBsYWNlbWVudCBpbiB0aGUgdGVtcGxhdGVcbiAgICAgICAgICAgICAgICAvLyBQcm9jZXNzIHRoZSBhY3R1YWwgdGVtcGxhdGVcbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoaHRtbCwgZGF0YSwgbWFwKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb3V0cHV0ID0gJyc7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBkYXRhLmxlbmd0aDsgaTxsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gdGhpcy5iaW5kKGh0bWwsIGRhdGFbaV0sIG1hcCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBodG1sID0gKGh0bWwgfHwgJycpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICBkYXRhID0gZGF0YSB8fCB7fTtcblxuICAgICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgICB2YXIgb3BlbmVycyA9IDAsXG4gICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlID0gMCxcbiAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRzLFxuICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMsXG4gICAgICAgICAgICAgICAgICAgICAgbWFwcGluZ3MgPSBtYXAgJiYgY29tcGlsZU1hcHBpbmdzKG1hcC5tYXBwaW5ncyksXG4gICAgICAgICAgICAgICAgICAgICAgaW50YWcgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICB0YWduYW1lID0gJycsXG4gICAgICAgICAgICAgICAgICAgICAgaXNDbG9zaW5nID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgaXNTZWxmQ2xvc2luZyA9IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgIHNlbGZDbG9zaW5nID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgbWF0Y2htb2RlID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgY3JlYXRlQXR0cmlidXRlID0gbWFwICYmIG1hcC5jb25mICYmIG1hcC5jb25mLmNyZWF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICBjbG9zaW5nLFxuICAgICAgICAgICAgICAgICAgICAgIHRhZ2JvZHk7XG5cbiAgICAgICAgICAgICAgICAgIHZhciBjLFxuICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlciA9ICcnLFxuICAgICAgICAgICAgICAgICAgICAgIGxlZnQ7XG5cbiAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gaHRtbC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgYyA9IGh0bWwuY2hhckF0KGkpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vIEZpZ3VyZSBvdXQgd2hpY2ggcGFydCBvZiB0aGUgSFRNTCB3ZSBhcmUgY3VycmVudGx5IHByb2Nlc3NpbmcuIEFuZCBpZlxuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBoYXZlIHF1ZXVlZCB1cCBlbm91Z2ggSFRNTCB0byBwcm9jZXNzIGl0J3MgZGF0YS5cbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgaWYgKGMgPT09ICchJyAmJiBpbnRhZyAmJiAhbWF0Y2htb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgaW50YWcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICBidWZmZXIgKz0gaHRtbC5zbGljZShsZWZ0LCBpICsgMSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYyA9PT0gJzwnICYmICFpbnRhZykge1xuICAgICAgICAgICAgICAgICAgICAgIGNsb3NpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgIGludGFnID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjID09PSAnPicgJiYgaW50YWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICBpbnRhZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgIHRhZ2JvZHkgPSBodG1sLnNsaWNlKGxlZnQsIGkgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRzID0gdGhpcy50YWcuZXhlYyh0YWdib2R5KTtcblxuICAgICAgICAgICAgICAgICAgICAgIGlmKCFjb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnRhZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICBpc0Nsb3NpbmcgPSBjb21wb25lbnRzWzFdO1xuICAgICAgICAgICAgICAgICAgICAgIHRhZ25hbWUgPSBjb21wb25lbnRzWzJdO1xuICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMgPSBjb21wb25lbnRzWzNdO1xuICAgICAgICAgICAgICAgICAgICAgIHNlbGZDbG9zaW5nID0gY29tcG9uZW50c1s0XTtcbiAgICAgICAgICAgICAgICAgICAgICBpc1NlbGZDbG9zaW5nID0gdGhpcy5zZWxmQ2xvc2luZy50ZXN0KHRhZ25hbWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNobW9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFuZCBpdHMgYSBjbG9zaW5nLlxuICAgICAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIWlzQ2xvc2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlbmVycyA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2htb2RlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLS1vcGVuZXJzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFpc1NlbGZDbG9zaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFuZCBpdHMgbm90IGEgc2VsZi1jbG9zaW5nIHRhZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAgICAgICArK29wZW5lcnM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0Nsb3NpbmcgJiYgIW1hdGNobW9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGEgbWF0Y2ggaW4gcHJvZ3Jlc3MgYW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hcHBpbmdzICYmIG1hcHBpbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaWkgPSBtYXBwaW5ncy5sZW5ndGggLSAxOyBpaSA+PSAwOyBpaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNldEF0dHJpYnV0ZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG1hcHBpbmcgPSBtYXBwaW5nc1tpaV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc2hvdWxkU2V0QXR0cmlidXRlID0gbWFwcGluZy5yZSAmJiBhdHRyaWJ1dGVzLm1hdGNoKG1hcHBpbmcucmUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiB3ZSBhcmUgdGFyZ2V0dGluZyBhIGVsZW1lbnQgb25seSBvciBhdHRyaWJ1dGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJ3RhZycgaW4gbWFwcGluZyAmJiAhdGhpcy5hdHRyLnRlc3QodGFnYm9keSkgJiYgbWFwcGluZy50YWcgPT09IHRhZ25hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZ2JvZHkgPSB0YWdib2R5ICsgZmV0Y2goZGF0YSwgbWFwcGluZywgJycsIHRhZ2JvZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnYm9keSA9IHRhZ2JvZHkucmVwbGFjZSh0aGlzLmF0dHIsIGZ1bmN0aW9uKHN0ciwga2V5LCBxLCB2YWx1ZSwgYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld2RhdGE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaG91bGRTZXRBdHRyaWJ1dGUgJiYgbWFwcGluZy5yZXBsYWNlICE9PSBrZXkgfHwgcmVtb3ZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNob3VsZFNldEF0dHJpYnV0ZSB8fCB0eXBlb2YgbWFwcGluZy5yZXBsYWNlUGFydGlhbDEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEF0dHJpYnV0ZSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGV0ZXJtaW5lIGlmIHdlIHNob3VsZCB1c2UgdGhlIHJlcGxhY2UgYXJndW1lbnQgb3Igc29tZSB2YWx1ZSBmcm9tIHRoZSBkYXRhIG9iamVjdC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtYXBwaW5nLnJlcGxhY2VQYXJ0aWFsMiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdkYXRhID0gdmFsdWUucmVwbGFjZShtYXBwaW5nLnJlcGxhY2VQYXJ0aWFsMSwgbWFwcGluZy5yZXBsYWNlUGFydGlhbDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBtYXBwaW5nLnJlcGxhY2VQYXJ0aWFsMSAhPT0gJ3VuZGVmaW5lZCcgJiYgbWFwcGluZy5kYXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3ZGF0YSA9IHZhbHVlLnJlcGxhY2UobWFwcGluZy5yZXBsYWNlUGFydGlhbDEsIGZldGNoKGRhdGEsIG1hcHBpbmcsIHZhbHVlLCB0YWdib2R5LCBrZXkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdkYXRhID0gZmV0Y2goZGF0YSwgbWFwcGluZywgdmFsdWUsIHRhZ2JvZHksIGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5ICsgJz1cIicgKyAobmV3ZGF0YSB8fCAnJykgKyAnXCInO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghbWFwcGluZy5yZXBsYWNlICYmIG1hcHBpbmcuYXR0cmlidXRlID09PSBrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcHBpbmcudmFsdWUgPT09IHZhbHVlIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5oYXNDbGFzcyh2YWx1ZSwgbWFwcGluZy52YWx1ZSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcHBpbmdzLmNvbmYud2hlcmUgPT09IGtleSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoX3RvU3RyaW5nLmNhbGwobWFwcGluZy52YWx1ZSkgPT09ICdbb2JqZWN0IFJlZ0V4cF0nICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBwaW5nLnZhbHVlLmV4ZWModmFsdWUpICE9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWFwcGluZy5yZW1vdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvbmx5IGluY3JlYXNlIHRoZSByZW1vdmUgY291bnRlciBpZiBpdCdzIG5vdCBhIHNlbGZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNsb3NpbmcgZWxlbWVudC4gQXMgbWF0Y2htb2RlIGlzIHN1ZmZlY3RpZW50IHRvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgdG9zZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNTZWxmQ2xvc2luZykgcmVtb3ZlKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaG1vZGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWFwcGluZy5wbGF0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJ0aWFsID0gdGhhdC5iaW5kKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcHBpbmcucGxhdGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgdHlwZW9mIG1hcHBpbmcuZGF0YSA9PT0gJ3N0cmluZycgPyBmZXRjaChkYXRhLCB7IGRhdGFLZXk6IG1hcHBpbmcuZGF0YSB9KSA6IG1hcHBpbmcuZGF0YSB8fCBkYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbWFwcGluZy5tYXBwZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlciArPSB0YWdib2R5ICsgdGhhdC5pdGVyYXRlKGh0bWwsIHBhcnRpYWwsIGNvbXBvbmVudHMsIHRhZ25hbWUsIHVuZGVmaW5lZCwgbWFwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNobW9kZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2ID0gbmV3ZGF0YSA9IGZldGNoKGRhdGEsIG1hcHBpbmcsIHZhbHVlLCB0YWdib2R5LCBrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3ZGF0YSA9IHRhZ2JvZHkgKyBuZXdkYXRhO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdkYXRhID0gdGhhdC5pdGVyYXRlKGh0bWwsIHYsIGNvbXBvbmVudHMsIHRhZ25hbWUsIHZhbHVlLCBtYXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgaXRlbSBpcyBhbiBhcnJheSwgdGhlbiB3ZSBuZWVkIHRvIHRlbGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUGxhdGVzIHRoYXQgd2UncmUgZGVhbGluZyB3aXRoIG5lc3RzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmVzdC5wdXNoKHRhZ25hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdiA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3ZGF0YSA9IHRhZ2JvZHkgKyB0aGF0Lml0ZXJhdGUoaHRtbCwgdiwgY29tcG9uZW50cywgdGFnbmFtZSwgdmFsdWUsIG1hcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlciArPSBuZXdkYXRhIHx8ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2htb2RlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRG8gd2UgbmVlZCB0byBjcmVhdGUgdGhlIGF0dHJpYnV0ZXMgaWYgdGhleSBkb24ndCBleGlzdC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjcmVhdGVBdHRyaWJ1dGUgJiYgc2hvdWxkU2V0QXR0cmlidXRlICYmICFzZXRBdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzcGxpY2VkID0gc2VsZkNsb3NpbmcgPyAyIDogMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGNsb3NlID0gc2VsZkNsb3NpbmcgPyAnLz4nOiAnPidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBsZWZ0ID0gdGFnYm9keS5zdWJzdHIoMCwgdGFnYm9keS5sZW5ndGggLSBzcGxpY2VkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxlZnRbbGVmdC5sZW5ndGggLSAxXSA9PT0gJyAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgPSBsZWZ0LnN1YnN0cigwLCBsZWZ0Lmxlbmd0aCAtIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxmQ2xvc2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlID0gJyAnICsgY2xvc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnYm9keSA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBwaW5nLnJlcGxhY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc9XCInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZXRjaChkYXRhLCBtYXBwaW5nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1wiJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0uam9pbignJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBubyBtYXAsIHdlIGFyZSBqdXN0IGxvb2tpbmcgdG8gbWF0Y2hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIHNwZWNpZmllZCBpZCB0byBhIGRhdGEga2V5IGluIHRoZSBkYXRhIG9iamVjdC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnYm9keS5yZXBsYWNlKHRoaXMuYXR0ciwgZnVuY3Rpb24gKGF0dHIsIGtleSwgcSwgdmFsdWUsIGlkeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IG1hcCAmJiBtYXAuY29uZi53aGVyZSB8fCAnaWQnICYmIGRhdGFbdmFsdWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdiA9IGRhdGFbdmFsdWVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lc3QgPSBBcnJheS5pc0FycmF5KHYpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCA9IG5lc3QgfHwgdHlwZW9mIHYgPT09ICdvYmplY3QnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoYXQuaXRlcmF0ZShodG1sLnN1YnN0cihsZWZ0KSwgdiwgY29tcG9uZW50cywgdGFnbmFtZSwgdmFsdWUsIG1hcClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIGl0ZW0gaXMgYW4gYXJyYXksIHRoZW4gd2UgbmVlZCB0byB0ZWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQbGF0ZXMgdGhhdCB3ZSdyZSBkZWFsaW5nIHdpdGggbmVzdHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXN0KSB7IHRoYXQubmVzdC5wdXNoKHRhZ25hbWUpOyB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlciArPSBuZXN0ID8gb3V0cHV0IDogdGFnYm9keSArIG91dHB1dDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNobW9kZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGN1cnJlbnRseSBubyBtYXRjaCBpbiBwcm9ncmVzc1xuICAgICAgICAgICAgICAgICAgICAgIC8vIGp1c3Qgd3JpdGUgdGhlIHRhZ2JvZHkgdG8gdGhlIGJ1ZmZlci5cbiAgICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAgIGlmICghbWF0Y2htb2RlICYmIHRoYXQubmVzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVtb3ZlKSBidWZmZXIgKz0gdGFnYm9keTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlbW92ZSAmJiAhIWlzQ2xvc2luZykgLS1yZW1vdmU7XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghbWF0Y2htb2RlICYmIHRoYXQubmVzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXN0LnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghaW50YWcgJiYgIW1hdGNobW9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgICAgLy8gY3VycmVudGx5IG5vdCBpbnNpZGUgYSB0YWcgYW5kIHRoZXJlIGlzIG5vXG4gICAgICAgICAgICAgICAgICAgICAgLy8gbWF0Y2ggaW4gcHJvZ3Jlc3MsIHdlIGNhbiB3cml0ZSB0aGUgY2hhciB0b1xuICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBidWZmZXIuXG4gICAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlbW92ZSkgYnVmZmVyICs9IGM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiBidWZmZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAvLyBFeHBvc2UgdGhlIFBsYXRlcyNiaW5kIGludGVyZmFjZS5cbiAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgYXBpLmJpbmQgPSBmdW5jdGlvbiBiaW5kKGh0bWwsIGRhdGEsIG1hcCkge1xuICAgICAgICAgICAgICAgIHZhciBtZXJnZSA9IG5ldyBNZXJnZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXJnZS5iaW5kKGh0bWwsIGRhdGEsIG1hcCk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAgICAgICAgICAgcmV0dXJuIGFwaTtcbiAgICAgICAgICAgIH0pKCksXG4gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgVVNFUiBJTlRFUkFDVElPTiBFVkVOVFMgJiBIQU5ETEVSXG4gICAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4gICAgICAgICAgICAvLyBub25lXG4gICAgICAgICAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICBNT0RVTEUgU1BFQ0lGSUMgSEVMUEVSU1xuICAgICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICAgICAgICAgICAgLy8gbm9uZVxuICAgICAgICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgUFVCTElDIEVOVElUWSBBUEkgLSBTRVQgTU9EVUxFIEVOVElUWSBERUZBVUxUIElOVEVSRkFDRVxuICAgICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICAgICAgICAgICAgYXBpID0ge1xuICAgICAgICAgICAgICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgICAgIEJVSUxEIE1PRFVMRSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0aWFsaXplIChzZXR0aW5ncykge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBhcGkuaW5pdDtcbiAgICAgICAgICAgICAgICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgICAgICAgIENVU1RPTUlaRSAtIG1vZHVsZSBpbnRlcmZhY2UsIGludGVybmFscyAmIGluaXRpYWxpemF0aW9uXG4gICAgICAgICAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4gICAgICAgICAgICAgICAgLy8ganVzdCBpbml0aWFsaXplIHNvbWV0aGluZ1xuICAgICAgICAgICAgICAgIC8vIG9yIHNldCBvdGhlciBhcGkuYXR0cmlidXRlc1xuICAgICAgICAgICAgICAgIC8vIG9yIHJldHVybiBzb21ldGhpbmdcbiAgICAgICAgICAgICAgICAvLyBvciBzZXQgc29tZSBnbG9iYWwgc3R1ZmZcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIFBMQVRFUykge1xuICAgICAgICAgICAgICAgICAgYXBpW3Byb3BdID0gUExBVEVTW3Byb3BdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDtcbiAgICAgICAgICBhcGkuaWQgPSBFTlRJVElFUy5wdXNoKGFwaSk7XG4gICAgICAgICAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICBQVUJMSUMgQVBJIEVYUE9SVFxuXG4gICAgICAgICAgICAgIEBKT0I6IG1ha2UgSU5JVC9DT05GSUdVUkUgYW5kIFNUQVJUIG9uZSBtZXRob2Qgd2l0aCBtYW55IHBhcmFtc1xuICAgICAgICAgICAgICBASk9COiBtYWtlIG1vZHVsZSBpbml0aWFsaXphdGlvbiBhIGNvbnN0cnVjdG9yIG9wdGlvblxuICAgICAgICAgICAgICBcbiAgICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgICAgICAgICAvLyBbT3B0aW9uYWxdIGluaXRpYWxpemUgdGhpcyBtb2R1bGUgaW1tZWRpYXRlbHlcbiAgICAgICAgICBhcGkuaW5pdCh7fSk7IC8vIHByb3ZpZGUgb3B0aW9uYWwgc2V0dGluZ3MgYXJndW1lbnRcbiAgICAgICAgICByZXR1cm4gRU5USVRJRVNbYXBpLmlkLTFdO1xuICAgICAgICB9KSh7fSlcbiAgICAgIDtcbiAgICAgIE1PRFVMRS5NRVRBID0gTUVUQTtcbiAgICAgIHJldHVybiBNT0RVTEU7XG4gICAgfVxuICAgIE1PRFVMRU5BTUVfQVBJLk1FVEEgPSBNRVRBO1xuICAgIHJldHVybiBNT0RVTEVOQU1FX0FQSTtcbiAgfSkoXG4gIC8qOjo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6XG4gICAgTU9EVUxFIENPTlRFWFRcbiAgOjo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ki9cbiAgICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgIE1FVEFcblxuICAgICAgQEpPQiAtIGh0dHA6Ly93d3cuMmFsaXR5LmNvbS8yMDEyLzEwL2phdmFzY3JpcHQtcHJvcGVydGllcy5odG1sXG4gICAgICAgICh1c2UgdG8gY3JlYXRlIHRoZSBzdHVmZiBiZWxvdylcblxuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICAgIHtcbiAgICAgIE5BTUUgICAgOiByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKS5uYW1lLnRvVXBwZXJDYXNlKCksXG4gICAgICBWRVJTSU9OIDogJ3YnICsgcmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJykudmVyc2lvbixcbiAgICB9LFxuICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgU0VUIE9GIE1PRFVMRSBJTlNUQU5DRVMgLSBvbmx5IDEgaWYgc2luZ2xldG9uXG5cbiAgICAgIEBKT0I6IHNpbmdsZXRvbiB2cyBmYWN0b3J5XG4gICAgICBcbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgICBbXSxcbiAgICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgIERFUEVOREVOQ1kgVFJFRVxuXG4gICAgICAgIEBKT0IgLSBodHRwOi8vd3d3LjJhbGl0eS5jb20vMjAxMi8xMC9qYXZhc2NyaXB0LXByb3BlcnRpZXMuaHRtbFxuICAgICAgICAgICh1c2UgdG8gY3JlYXRlIHRoZSBzdHVmZiBiZWxvdylcblxuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICAgIChmdW5jdGlvbiBERVBFTkRFTkNJRVMgKCkge1xuICAgICAgJ3VzZSBzdHJpY3QnO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLyo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6OjpcbiAgICAgICAgICBFWFRFUk5BTCBERVBFTkRFTkNJRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG90aGVycyBsZWdvcylcbiAgICAgICAgOjo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ki9cbiAgICAgICAgICAvLyBub25lXG4gICAgICAgIC8qOjo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6XG4gICAgICAgICAgSU5URVJOQUwgREVQRU5ERU5DSUVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobXkgbGVnb3MpXG4gICAgICAgIDo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6OiovXG4gICAgICAgICAgLy8gbm9uZVxuICAgICAgICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgIGUuZy4gSU5URVJOQUwgTU9EVUxFIC0gbmFtZU9mSW50ZXJuYWxNb2R1bGUxXG4gICAgICAgICAgKGNvcHkgc3RydWN0dXJlIG9mIHRoaXMgZmlsZSlcbiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgICAgIH07XG4gICAgfSkoKVxuICApXG4gIC8qOjo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6OiovXG4pO1xuLyo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6OjoqL1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIm5hbWVcIjogXCJwbGF0ZXNcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC40LjExXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJVbm9idHJ1c2l2ZSB0ZW1wbGF0aW5nIGZvciB0aGUgZmxhdGlyb24gZnJhbWV3b3JrXCIsXG4gIFwia2V5d29yZHNcIjogW1xuICAgIFwidGVtcGxhdGVzXCIsXG4gICAgXCJ0ZW1wbGF0aW5nXCIsXG4gICAgXCJ1bm9idHJ1c2l2ZVwiXG4gIF0sXG4gIFwiYXV0aG9yXCI6IHtcbiAgICBcIm5hbWVcIjogXCJOb2Rlaml0c3UgSW5jLlwiLFxuICAgIFwiZW1haWxcIjogXCJpbmZvQG5vZGVqaXRzdS5jb21cIlxuICB9LFxuICBcImxpY2Vuc2VcIjogXCJNSVRcIixcbiAgXCJyZXBvc2l0b3J5XCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJnaXRcIixcbiAgICAgIFwidXJsXCI6IFwiZ2l0Oi8vZ2l0aHViLmNvbS9mbGF0aXJvbi9wbGF0ZXMuZ2l0XCJcbiAgICB9XG4gIF0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcInZvd3NcIjogXCIwLjcueFwiLFxuICAgIFwibXVzdGFjaGVcIjogXCIwLjQueFwiLFxuICAgIFwiYmVuY2htYXJrXCI6IFwiMC4yLnhcIlxuICB9LFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwidGVzdFwiOiBcInZvd3MgLS1zcGVjIHRlc3QvYXBpLXRlc3QuanNcIlxuICB9LFxuICBcImVuZ2luZXNcIjogW1xuICAgIFwibm9kZVwiXG4gIF0sXG4gIFwibWFpblwiOiBcIi4vbGliL3BsYXRlcy5qc1wiLFxuICBcInJlYWRtZVwiOiBcIiFbcGxhdGVzXShodHRwczovL2dpdGh1Yi5jb20vZmxhdGlyb24vcGxhdGVzL3Jhdy9tYXN0ZXIvcGxhdGVzLnBuZylcXG5cXG4jIFN5bm9wc2lzXFxuUGxhdGVzIChzaG9ydCBmb3IgdGVtcGxhdGVzKSBiaW5kcyBkYXRhIHRvIG1hcmt1cC4gUGxhdGVzIGhhcyBOTyBzcGVjaWFsIHN5bnRheC4gSXQgd29ya3MgaW4gdGhlIGJyb3dzZXIgYW5kIGluIFtOb2RlLmpzXShodHRwOi8vbm9kZWpzLm9yZy8pLlxcblxcbiMgTW90aXZhdGlvblxcbi0gRFNMcyAoRG9tYWluIFNwZWNpZmljIExhbmd1YWdlcykgc3VjaCBhcyA8JT1mb28lPiBvciB7e2Zvb319IHJlZHVjZSBwb3J0YWJpbGl0eS5cXG4tIERPTSB0ZW1wbGF0aW5nIGlzIFNMT1cuXFxuLSBQcm9tb3RlIHRoZSBzZXBhcmF0aW9uIG9mIGNvbmNlcm5zIHByaW5jaXBsZSBieSBkZWNvdXBsaW5nIGRlY2lzaW9uIG1ha2luZyBmcm9tIHByZXNlbnRhdGlvbi5cXG4tIE1ha2UgYm90aCB0aGUgY29kZSBhbmQgbWFya3VwIG1vcmUgcmVhZGFibGUgYW5kIG1haW50YWluYWJsZSBieSBhIHdpZGVyIGF1ZGllbmNlLlxcblxcbiMgU3RhdHVzXFxuXFxuWyFbQnVpbGQgU3RhdHVzXShodHRwczovL3NlY3VyZS50cmF2aXMtY2kub3JnL2ZsYXRpcm9uL3BsYXRlcy5wbmcpXShodHRwOi8vdHJhdmlzLWNpLm9yZy9mbGF0aXJvbi9wbGF0ZXMpXFxuXFxuIyBGZWF0dXJlc1xcbi0gQXV0b21hdGljYWxseSBiaW5kIGRhdGEgdG8gYSB0YWcncyBib2R5IGJ5IG1hdGNoaW5nIHVuaXF1ZSB0YWcgSURzIHRvIGRhdGEga2V5cy5cXG4tIEJpbmQgZGF0YSB0byBhIHRhZydzIGJvZHkgYmFzZWQgb24gYW55IGF0dHJpYnV0ZSdzIHZhbHVlcy5cXG4tIEJpbmQgZGF0YSB0byBhIHRhZydzIGF0dHJpYnV0ZSBiYXNlZCBvbiBhbnkgYXR0cmlidXRlJ3MgdmFsdWVzLlxcblxcbi0gVE9ETzogU3BlY2lmeSBvcHRpb24gdG8gY3JlYXRlIGF0dHJpYnV0ZSBpZiBpdCBkb2VzIG5vdCBleGlzdC5cXG5cXG4jIEluc3RhbGxhdGlvblxcblRoZXJlIGFyZSBhIGZldyB3YXlzIHRvIHVzZSBgcGxhdGVzYC4gSW5zdGFsbCB0aGUgbGlicmFyeSB1c2luZyBucG0uIFlvdSBjYW4gYWRkXFxuaXQgdG8geW91ciBgcGFja2FnZS5qc29uYCBmaWxlIGFzIGEgZGVwZW5kYW5jeSwgb3IgaW5jbHVkZSB0aGUgc2NyaXB0IGluIHlvdXJcXG5IVE1MIHBhZ2UuXFxuXFxuIyBVc2FnZVxcblxcbiMjIFNpbXBsZSBjYXNlXFxuQnkgZGVmYXVsdCwgYHBsYXRlc2Agd2lsbCB0cnkgdG8gbWF0Y2ggdGhlIGtleSBpbiB0aGUgZGF0YSB0byBhbiBgaWRgIGluIHRoZVxcbnRhZywgc2luY2UgYm90aCBzaG91bGQgYmUgdW5pcXVlLlxcblxcbmBgYGpzXFxudmFyIFBsYXRlcyA9IHJlcXVpcmUoJ3BsYXRlcycpO1xcblxcbnZhciBodG1sID0gJzxkaXYgaWQ9XFxcInRlc3RcXFwiPk9sZCBWYWx1ZTwvZGl2Pic7XFxudmFyIGRhdGEgPSB7IFxcXCJ0ZXN0XFxcIjogXFxcIk5ldyBWYWx1ZVxcXCIgfTtcXG5cXG52YXIgb3V0cHV0ID0gUGxhdGVzLmJpbmQoaHRtbCwgZGF0YSk7IFxcbmBgYFxcblxcbiMjIEV4cGxpY2l0IGluc3RydWN0aW9uc1xcbkEgY29tbW9uIHVzZSBjYXNlIGlzIHRvIGFwcGx5IHRoZSBuZXcgdmFsdWUgdG8gZWFjaCB0YWcncyBib2R5IGJhc2VkIG9uIHRoZVxcbmBjbGFzc2AgYXR0cmlidXRlLlxcblxcbmBgYGpzXFxudmFyIGh0bWwgPSAnPHNwYW4gY2xhc3M9XFxcIm5hbWVcXFwiPlVzZXI8L3NwYW4+Li4uPHNwYW4gY2xhc3M9XFxcIm5hbWVcXFwiPlVzZXI8L3NwYW4+JztcXG5cXG52YXIgZGF0YSA9IHsgXFxcInVzZXJuYW1lXFxcIjogXFxcIkpvaG4gU21pdGhcXFwiIH07XFxudmFyIG1hcCA9IFBsYXRlcy5NYXAoKTtcXG5cXG5tYXAuY2xhc3MoJ25hbWUnKS50bygndXNlcm5hbWUnKTtcXG5cXG5jb25zb2xlLmxvZyhQbGF0ZXMuYmluZChodG1sLCBkYXRhLCBtYXApKTtcXG5gYGBcXG5cXG4jIyBDb21wbGV4IGluc3RydWN0aW9uc1xcbkFub3RoZXIgY29tbW9uIGNhc2UgaXMgdG8gcmVwbGFjZSB0aGUgdmFsdWUgb2YgYW4gYXR0cmlidXRlIGlmIGl0IGlzIGEgbWF0Y2guXFxuXFxuYGBganNcXG52YXIgaHRtbCA9ICc8YSBocmVmPVxcXCIvXFxcIj48L2E+JztcXG5cXG52YXIgZGF0YSA9IHsgXFxcIm5ld3VybFxcXCI6IFxcXCJodHRwOi8vd3d3Lm5vZGVqaXRzdS5jb21cXFwiIH07XFxudmFyIG1hcCA9IFBsYXRlcy5NYXAoKTtcXG5cXG5tYXAud2hlcmUoJ2hyZWYnKS5pcygnLycpLmluc2VydCgnbmV3dXJsJyk7XFxuXFxuY29uc29sZS5sb2coUGxhdGVzLmJpbmQoaHRtbCwgZGF0YSwgbWFwKSk7XFxuYGBgXFxuXFxuUGFydGlhbCB2YWx1ZSByZXBsYWNlbWVudFxcblxcbmBgYGpzXFxudmFyIGh0bWwgPSAnPGEgaHJlZj1cXFwiL2Zvby9iYXJcXFwiPjwvYT4nO1xcblxcbnZhciBkYXRhID0geyBcXFwibmV3dXJsXFxcIjogXFxcImJhenpcXFwiIH07XFxudmFyIG1hcCA9IFBsYXRlcy5NYXAoKTtcXG5cXG5tYXAud2hlcmUoJ2hyZWYnKS5oYXMoL2Jhci8pLmluc2VydCgnbmV3dXJsJyk7IC8vIGBoYXNgIGNhbiB0YWtlIGEgcmVndWxhciBleHByZXNzaW9uLlxcblxcbmNvbnNvbGUubG9nKFBsYXRlcy5iaW5kKGh0bWwsIGRhdGEsIG1hcCkpO1xcbmBgYFxcblxcbkluIGV2ZW4gbW9yZSBjb21wbGV4IGNhc2VzLCBhbiBhcmJpdHJhcnkgYXR0cmlidXRlIGNhbiBiZSBzcGVjaWZpZWQuIElmIGEgdmFsdWVcXG5pcyBtYXRjaGVkLCBhIHNwZWNpZmljIHZhbHVlIGNhbiBiZSB1c2VkIGFuZCB0aGVuIHVzZWQgYXMgYW5vdGhlciBhdHRyaWJ1dGUnc1xcbnZhbHVlLlxcblxcbmBgYGpzXFxudmFyIGh0bWwgPSAnPGltZyBkYXRhLWZvbz1cXFwiYmFyXFxcIiBzcmM9XFxcIlxcXCI+PC9pbWc+JztcXG5cXG52YXIgZGF0YSA9IHsgXFxcImltYWdldXJsXFxcIjogXFxcImh0dHA6Ly93d3cubm9kZWppdHN1LmNvbVxcXCIgfTtcXG52YXIgbWFwID0gUGxhdGVzLk1hcCgpO1xcblxcbm1hcC53aGVyZSgnZGF0YS1mb28nKS5pcygnYmFyJykudXNlKCdpbWFnZXVybCcpLmFzKCdzcmMnKTtcXG5cXG5jb25zb2xlLmxvZyhQbGF0ZXMuYmluZChodG1sLCBkYXRhLCBtYXApKTtcXG5gYGBcXG5cXG4jIyBDb2xsZWN0aW9uc1xcblxcblBsYXRlcyBjYW4gYWxzbyBpdGVyYXRlIHRocm91Z2ggY29sbGVjdGlvbnM6XFxuXFxuYGBganNcXG52YXIgaHRtbCA9ICc8ZGl2IGNsYXNzPVxcXCJuYW1lXFxcIj48L2Rpdj4nO1xcbnZhciBjb2xsZWN0aW9uID0gW1xcbiAgeyduYW1lJzogJ0xvdWlzIENLJ30sXFxuICB7J25hbWUnOiAnQW5keSBLaW5kbGVyJ30sXFxuICB7J25hbWUnOiAnR3JlZyBHaXJhbGRvJ31cXG5dO1xcblxcbmNvbnNvbGUubG9nKFBsYXRlcy5iaW5kKGh0bWwsIGNvbGxlY3Rpb24pKTtcXG5gYGBcXG5cXG4jIyBQYXJ0aWFsc1xcblxcblBsYXRlcyBhbHNvIHN1cHBvcnRzIHBhcnRpYWxzOlxcblxcbmBgYGpzXFxudmFyIHBhcnRpYWwgPSAnPGxpIGNsYXNzPVxcXCJwYXJ0aWFsXFxcIj48L2xpPic7XFxudmFyIGJhc2UgPSAnPGRpdj48aDEgY2xhc3M9XFxcImZvb1xcXCI+PC9oMT48dWwgY2xhc3M9XFxcIm1lbnVcXFwiPjwvdWw+PC9kaXY+JztcXG5cXG52YXIgYmFzZURhdGEgPSB7IGZvbzogJ2JhcicgfTtcXG52YXIgbWFwcGluZyA9IFBsYXRlcy5NYXAoKTtcXG5cXG5tYXBwaW5nLmNsYXNzKCdtZW51JykuYXBwZW5kKHBhcnRpYWwpO1xcbmNvbnNvbGUubG9nKFBsYXRlcy5iaW5kKGJhc2UsIGJhc2VEYXRhLCBtYXBwaW5nKSk7XFxuYGBgXFxuXFxuIyBBUElcXG5cXG4jIyBQbGF0ZXMgU3RhdGljIE1ldGhvZHNcXG5cXG5gYGBcXG5mdW5jdGlvbiBQbGF0ZXMuYmluZChodG1sLCBkYXRhLCBtYXApXFxuQHBhcmFtIGh0bWwge1N0cmluZ30gQSBzdHJpbmcgb2Ygd2VsbC1mb3JtZWQgSFRNTC5cXG5AcGFyYW0gZGF0YSB7T2JqZWN0fSBBIEpTT04gb2JqZWN0LlxcbkBwYXJhbSBtYXAge09iamVjdH0gQW4gaW5zdGFuY2Ugb2YgYFBsYXRlcy5NYXAoKWAuXFxuXFxuQHJldHVybiB7U3RyaW5nfSBUaGUgcmVzdWx0IG9mIG1lcmdpbmcgdGhlIGRhdGEgYW5kIGh0bWwuXFxuYGBgXFxuXFxuIyMgTWFwIENvbnN0cnVjdG9yXFxuXFxuYGBgXFxuZnVuY3Rpb24gUGxhdGVzLk1hcChvcHRpb25zKVxcbkBvcHRpb25zIHtPYmplY3R9IEFuIG9iamVjdCBsaXRlcmFsIHRoYXQgY29udGFpbnMgY29uZmlndXJhdGlvbiBvcHRpb25zLlxcbiAgLSBAb3B0aW9uIHdoZXJlIHtTdHJpbmd9IFRoZSBkZWZhdWx0IGF0dHJpYnV0ZSB0byBtYXRjaCBvbiBpbnN0ZWFkIG9mIElELlxcbiAgLSBAb3B0aW9uIGFzIHtTdHJpbmd9IFRoZSBkZWZhdWx0IGF0dHJpYnV0ZSB0byByZXBsYWNlIGludG8uXFxuQHJldHVybiB7T2JqZWN0fSBBbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIGEgcmV1c2FibGUgbWFwLCBoYXMgbWFwcGluZyBtZXRob2RzLlxcbmBgYFxcblxcbiMjIE1hcCBJbnN0YW5jZSBNZXRob2RzXFxuXFxuIyMjIHdoZXJlKClcXG5cXG5gYGBcXG5mdW5jdGlvbiBNYXAjd2hlcmUoYXR0cmlidXRlKVxcbkBwYXJhbSBhdHRyaWJ1dGUge1N0cmluZ30gQW4gYXR0cmlidXRlIHRoYXQgbWF5IGJlIGZvdW5kIGluIGEgdGFnLlxcblxcblRoaXMgbWV0aG9kIHdpbGwgaW5pdGlhdGUgYSBjbGF1c2UuIE9uY2UgYSBjbGF1c2UgaGFzIGJlZW4gZXN0YWJsaXNoZWQsXFxub3RoZXIgbWVtYmVyIG1ldGhvZHMgbWF5IGJlIGNoYWluZWQgdG8gZWFjaCBvdGhlciBpbiBhbnkgb3JkZXIuXFxuYGBgXFxuXFxuIyMjIGNsYXNzKCksIGNsYXNzTmFtZSgpXFxuXFxuYGBgXFxuZnVuY3Rpb24gTWFwI2NsYXNzKGF0dHJpYnV0ZSlcXG5AcGFyYW0gYXR0cmlidXRlIHtTdHJpbmd9IEEgdmFsdWUgdGhhdCBtYXkgYmUgZm91bmQgaW4gdGhlIGBjbGFzc2AgYXR0cmlidXRlIG9mIGEgdGFnLlxcbmBgYFxcblxcbiMjIyBpcygpXFxuXFxuYGBgXFxuZnVuY3Rpb24gTWFwI2lzKHZhbHVlKVxcbkBwYXJhbSB2YWx1ZSB7U3RyaW5nfSBUaGUgdmFsdWUgb2YgdGhlIGF0dHJpYnV0ZSBzcGVjaWZpZWQgaW4gdGhlIGB3aGVyZWAgY2xhdXNlLlxcbmBgYFxcblxcbiMjIyBoYXMoKVxcblxcbmBgYFxcbmZ1bmN0aW9uIE1hcCNoYXModmFsdWUpXFxuQHBhcmFtIHZhbHVlIHtTdHJpbmd8UmVnRXhwfSBUaGUgdmFsdWUgb2YgdGhlIGF0dHJpYnV0ZSBzcGVjaWZpZWQgaW4gdGhlIGB3aGVyZWAgY2xhdXNlLlxcbmBgYFxcblxcbiMjIyBpbnNlcnQoKVxcblxcbmBgYFxcbmZ1bmN0aW9uIE1hcCNpbnNlcnQoYXR0cmlidXRlKVxcbkBwYXJhbSBhdHRyaWJ1dGUge1N0cmluZ30gQSBzdHJpbmcgdGhhdCByZXByZXNlbnRzIGEga2V5LiBEYXRhIHdpbGwgYmUgaW5zZXJ0ZWQgaW50byBcXG50aGUgYXR0cmlidXRlIHRoYXQgd2FzIHNwZWNpZmllZCBpbiB0aGUgYHdoZXJlYCBjbGF1c2UuXFxuYGBgXFxuXFxuIyMjIHVzZSgpXFxuXFxuYGBgXFxuZnVuY3Rpb24gTWFwI3VzZShrZXkpXFxuQHBhcmFtIGtleSB7U3RyaW5nfEZ1bmN0aW9ufSBBIHN0cmluZyB0aGF0IHJlcHJlc2VudHMgYSBrZXkgaW4gdGhlIGRhdGEgb2JqZWN0IHRoYXQgd2FzIHByb3ZpZGVkIG9yIGEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhIHN0cmluZyB2YWx1ZSB0byB1c2UuXFxuXFxuSWYgYSBmdW5jdGlvbiBpcyBwcm92aWRlZCwgaXQgd2lsbCBiZSBwYXNzZWQgZGF0YSwgdmFsdWUgYW5kIHRhZ2JvZHkgcGFyYW1ldGVycy5cXG5gYGBcXG5cXG4jIyMgdG8oKVxcblxcbmBgYFxcbmZ1bmN0aW9uIE1hcCN0byhrZXkpXFxuQHBhcmFtIGtleSB7U3RyaW5nfEZ1bmN0aW9ufSBBIHN0cmluZyB0aGF0IHJlcHJlc2VudHMgYSBrZXkgaW4gdGhlIGRhdGEgb2JqZWN0IHRoYXQgd2FzIHByb3ZpZGVkIG9yIGEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhIHN0cmluZyB2YWx1ZSB0byB1c2UuXFxuXFxuSWYgYSBmdW5jdGlvbiBpcyBwcm92aWRlZCwgaXQgd2lsbCBiZSBwYXNzZWQgZGF0YSwgdmFsdWUgYW5kIHRhZ2JvZHkgcGFyYW1ldGVycy5cXG5cXG5TYW1lIGFzIGB1c2VgIG1ldGhvZC5cXG5gYGBcXG5cXG4jIyMgYXMoKVxcblxcbmBgYFxcbmZ1bmN0aW9uIE1hcCNhcyhhdHRyaWJ1dGUpXFxuQHBhcmFtIGF0dHJpYnV0ZSB7U3RyaW5nfSBBIHN0cmluZyB0aGF0IHJlcHJlc2VudHMgYW4gYXR0cmlidXRlIGluIHRoZSB0YWcuXFxuXFxuSWYgdGhlcmUgaXMgbm8gYXR0cmlidXRlIGJ5IHRoYXQgbmFtZSBmb3VuZCwgb25lIG1heSBiZSBjcmVhdGVkIGRlcGVuZGluZyBvbiB0aGUgb3B0aW9uc1xcbnRoYXQgd2VyZSBwYXNzZWQgdG8gdGhlIGBNYXBgIGNvbnN0cnVjdG9yLlxcbmBgYFxcblxcbiMjIyByZW1vdmUoKVxcblxcbmBgYFxcbmZ1bmN0aW9uIE1hcCNyZW1vdmUoKVxcblxcblJlbW92ZXMgdGhlIG1hdGNoaW5nIGVsZW1lbnRzIGZyb20gdGhlIHRlbXBsYXRlLlxcbmBgYFxcblxcbiMjIyBhcHBlbmQoKSwgcGFydGlhbCgpXFxuXFxuYGBgXFxuZnVuY3Rpb24gTWFwI2FwcGVuZChodG1sLCBkYXRhLCBtYXApXFxuQHBhcmFtIGh0bWwge1N0cmluZ30gQSBzdHJpbmcgdGhhdCByZXByZXNlbnRzIHRoZSBuZXcgdGVtcGxhdGUgdGhhdCBuZWVkcyB0byBiZVxcbmFkZGVkLlxcbkBwYXJhbSBkYXRhIHtNaXhlZH0gZGF0YSBmb3IgdGhlIHBhcnRpYWwsIGlmIGl0J3MgYSBzdHJpbmcgaXQncyBhIHJlZmVyZW5jZSB0byBhXFxua2V5IGluIHRoZSBkYXRhIHN0cnVjdHVyZSB0aGF0IHdhcyBzdXBwbGllZCB0byB0aGUgbWFpbiB0ZW1wbGF0ZS5cXG5AcGFyYW0gbWFwIHtQbGF0ZXMuTWFwfSBkYXRhIG1hcHBpbmcgZm9yIHRoZSBwYXJ0aWFsLlxcblxcbklmIHRoZSBzdXBwbGllZCBIVE1MIHN0cmluZyBkb2Vzbid0IGNvbnRhaW4gYW55IEhUTUwgbWFya3VwIHdlIGFzc3VtZSB0aGF0IHdlXFxudGhlIGdpdmVuIHN0cmluZyBpcyB0aGUgbG9jYXRpb24gb2YgdGhlIHRlbXBsYXRlLiBXaGVuIHlvdSBhcmUgdXNpbmcgUGxhdGVzIG9uXFxudGhlIGJyb3dzZXIgaXMgYXNzdW1lcyB0aGF0IHlvdSBzdXBwbGllZCBpdCB3aXRoIGFuIGlkIHNlbGVjdG9yIGFuZCB3aWxsIGZldGNoXFxudGhlIGlubmVySFRNTCBmcm9tIHRoZSBlbGVtZW50LiBJZiB5b3UgYXJlIHVzaW5nIFBsYXRlcyBpbiBOb2RlLmpzIGl0IGFzc3VtZXNcXG50aGF0IHlvdSBnYXZlIGl0IGEgZmlsZSBwYXRoIHRoYXQgaXMgcmVsYXRpdmUgdG8gdGhlIGN1cnJlbnQgd29ya2luZyBkaXJlY3RvcnkuXFxuYGBgXFxuXFxuIyBMaWNlbnNlXFxuXFxuKFRoZSBNSVQgTGljZW5zZSlcXG5cXG5Db3B5cmlnaHQgKGMpIDIwMTEgTm9kZWppdHN1IEluYy4gaHR0cDovL3d3dy50d2l0dGVyLmNvbS9ub2Rlaml0c3VcXG5cXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXFxudGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgJ1NvZnR3YXJlJyksIHRvIGRlYWwgaW5cXG50aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXFxudXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2ZcXG50aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXFxuc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XFxuXFxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXFxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cXG5cXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgJ0FTIElTJywgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXFxuRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXFxuQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXFxuSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cXG5DT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxcblwiLFxuICBcInJlYWRtZUZpbGVuYW1lXCI6IFwiUkVBRE1FLm1kXCIsXG4gIFwiX2lkXCI6IFwicGxhdGVzQDAuNC4xMVwiLFxuICBcIl9zaGFzdW1cIjogXCJhZmE4MmNjZDQ5Zjc5N2I0OTBlOTBmMGRmZDhiNTllNDIxN2U0MDk5XCIsXG4gIFwiX3Jlc29sdmVkXCI6IFwiZ2l0Oi8vZ2l0aHViLmNvbS9jb2RpbmctYW1pZ29zL3BsYXRlcyM0NDBjMDk2MTBkMjJkMDRhODE1MmFmY2Q2ZWFkYjRiZWFhOGM2N2IzXCIsXG4gIFwiX2Zyb21cIjogXCJwbGF0ZXNAZ2l0Oi8vZ2l0aHViLmNvbS9jb2RpbmctYW1pZ29zL3BsYXRlcyN2MC40LjExXCJcbn1cbiJdfQ==
(1)
});
