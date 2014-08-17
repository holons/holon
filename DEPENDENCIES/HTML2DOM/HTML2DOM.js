function HTML2DOM (htmlString) {
  return Test()(htmlString); // https://github.com/component/domify
}
// https://github.com/component/domify/blob/master/index.js

function Test () { // alternative zu NPMs 'domify' module

  /**
   * Expose `parse`.
   */

  /**
   * Tests for browser support.
   */

  var div = document.createElement('div');
  // Setup
  div.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
  // Make sure that link elements get serialized correctly by innerHTML
  // This requires a wrapper element in IE
  var innerHTMLBug = !div.getElementsByTagName('link').length;
  div = undefined;

  /**
   * Wrap map from jquery.
   */

  var map = {
    legend: [1, '<fieldset>', '</fieldset>'],
    tr: [2, '<table><tbody>', '</tbody></table>'],
    col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
    // for script/link/style tags to work in IE6-8, you have to wrap
    // in a div with a non-whitespace character in front, ha!
    _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
  };

  map.td =
  map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

  map.option =
  map.optgroup = [1, '<select multiple="multiple">', '</select>'];

  map.thead =
  map.tbody =
  map.colgroup =
  map.caption =
  map.tfoot = [1, '<table>', '</table>'];

  map.text =
  map.circle =
  map.ellipse =
  map.line =
  map.path =
  map.polygon =
  map.polyline =
  map.rect = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];

  /**
   * Parse `html` and return a DOM Node instance, which could be a TextNode,
   * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
   * instance, depending on the contents of the `html` string.
   *
   * @param {String} html - HTML string to "domify"
   * @param {Document} doc - The `document` instance to create the Node for
   * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
   * @api private
   */

  function parse(html, doc) {
    if ('string' != typeof html) throw new TypeError('String expected');

    // default to the global `document` object
    if (!doc) doc = document;

    // tag name
    var m = /<([\w:]+)/.exec(html);
    if (!m) return doc.createTextNode(html);

    html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace

    var tag = m[1];

    // body support
    if (tag == 'body') {
      var el = doc.createElement('html');
      el.innerHTML = html;
      return el.removeChild(el.lastChild);
    }

    // wrap map
    var wrap = map[tag] || map._default;
    var depth = wrap[0];
    var prefix = wrap[1];
    var suffix = wrap[2];
    var el = doc.createElement('div');
    el.innerHTML = prefix + html + suffix;
    while (depth--) el = el.lastChild;

    // one element
    if (el.firstChild == el.lastChild) {
      return el.removeChild(el.firstChild);
    }

    // several elements
    var fragment = doc.createDocumentFragment();
    while (el.firstChild) {
      fragment.appendChild(el.removeChild(el.firstChild));
    }

    return fragment;
  }

  var module = { exports: { parse: parse } };
  return module.exports.parse;
}
// function String2DOM (htmlString) { // alternative zu NPMs 'domify' module
//   // http://krasimirtsonev.com/blog/article/Revealing-the-magic-how-to-properly-convert-HTML-string-to-a-DOM-element
//   var wrapMap = {
//     option: [ 1, "<select multiple='multiple'>", "</select>" ],
//     legend: [ 1, "<fieldset>", "</fieldset>" ],
//     area: [ 1, "<map>", "</map>" ],
//     param: [ 1, "<object>", "</object>" ],
//     thead: [ 1, "<table>", "</table>" ],
//     tr: [ 2, "<table><tbody>", "</tbody></table>" ],
//     col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
//     td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
//     body: [0, "", ""],
//     _default: [ 1, "<div>", "</div>"  ]
//   };
//   wrapMap.optgroup = wrapMap.option;
//   wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
//   wrapMap.th = wrapMap.td;
//   var match = /<\s*\w.*?>/g.exec(htmlString);
//   var element = document.createElement('div');
//   if(match != null) {
//     var tag = match[0].replace(/</g, '').replace(/>/g, '').split(' ')[0];
//     if(tag.toLowerCase() === 'body') {
//       var dom = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
//       var body = document.createElement("body");
//       // keeping the attributes
//       element.innerHTML = htmlString.replace(/<body/g, '<div').replace(/<\/body>/g, '</div>');
//       var attrs = element.firstChild.attributes;
//       body.innerHTML = htmlString;
//       for(var i=0; i<attrs.length; i++) {
//         body.setAttribute(attrs[i].name, attrs[i].value);
//       }
//       return body;
//     } else {
//       var map = wrapMap[tag] || wrapMap._default, element;
//       htmlString = map[1] + htmlString + map[2];
//       element.innerHTML = htmlString;
//       // Descend through wrappers to the right content
//       var j = map[0]+1;
//       while(j--) {
//         element = element.lastChild;
//       }
//     }
//   } else {
//     element.innerHTML = htmlString;
//     element = element.lastChild;
//   }
//   return element;
// }
