(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = require('plates');

},{"plates":5}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":4}],4:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],5:[function(require,module,exports){
(function (process){
var Plates = (typeof module !== 'undefined' && 'id' in module && typeof exports !== 'undefined') ? exports : {};

!function(exports, env, undefined) {
  "use strict";

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
// Matches a closing tag to a open tag
//
function matchClosing(input, tagname, html) {
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

  var Merge = function Merge() {};
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
    // ### function replace(val1, val2)
    // #### @val1 {String|RegExp} The part of the attribute that needs to be replaced
    // #### @val2 {String} The value it should be replaced with
    //
    replace: function replace(val1, val2) {
      var l = last.call(this);
      l.replacePartial1 = val1;
      l.replacePartial2 = val2;
      return this;
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
    // ### function class(val)
    // #### @val {String} a value that may be found in the `class` attribute of a tag
    // the method name should be wrapped in quotes or it will throw errors in IE.
    //
    'class': function className(val) {
      return this.where('class').is(val);
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
    // ### function is(val)
    // #### @val {string} The value of the attribute that was specified in the
    // `where` clause.
    //
    is: function is(val) {
      last.call(this).value = val;
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
    // ### function remove()
    // This will remove the element that was specified in the `where` clause
    // from the template.
    //
    remove: function remove() {
      last.call(this).remove = true;
      return last.call(this, true);
    },

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

      // If the supplied plates template doesn't contain any HTML it's most
      // likely that we need to import it. To improve performance we will cache
      // the result of the file system.
      if (!/<[^<]+?>/.test(plates) && !exports.cache[plates]) {
        // figure out if we are running in Node.js or a browser
        if ('document' in env && 'getElementById' in env.document) {
          exports.cache[plates] = document.getElementById(plates).innerHTML;
        } else {
          exports.cache[plates] = require('fs').readFileSync(
            require('path').join(process.cwd(), plates),
            'utf8'
          );
        }
      }

      l.plates = exports.cache[plates] || plates;
      l.data = data;
      l.mapper = map;

      return last.call(this, true);
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
  // Expose a simple cache object so people can clear the cached partials if
  // they want to.
  //
  exports.cache = {};

  //
  // Expose the Plates#bind interface.
  //
  exports.bind = function bind(html, data, map) {
    var merge = new Merge();
    return merge.bind(html, data, map);
  };

  //
  // Expose the Mapper.
  //
  exports.Map = Mapper;
}(Plates, this);

}).call(this,require('_process'))
},{"_process":4,"fs":2,"path":3}]},{},[1]);
