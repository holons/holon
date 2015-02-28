# COMPONENTS
## JS side
- NAME
- defaults
- constructor/initialize
- public API (attributes & methods)
- private SDK (vars & functions)
- check drivn ReactiveComponent Backbone
### reactive model
  - file:///home/serapath/workspace/ikusei/WIDGETS/yoWidgetTemplate/DOMmutation.html
  -
  - https://www.new-bamboo.co.uk/blog/2014/01/21/experiments-with-javascript-es6/
  - http://us6.campaign-archive1.com/?u=2cc20705b76fa66ab84a6634f&id=aa9b71565f&e=38bad216c4
  - http://arqex.com/967/javascript-properties-enumerable-writable-configurable
  - http://adripofjavascript.com/blog/drips/immutable-objects-with-object-freeze.html
  - http://www.sellarafaeli.com/blog/native_javascript_data_binding
  - object.observe
  - http://www.html5rocks.com/en/tutorials/es7/observe/
  - http://addyosmani.com/blog/the-future-of-data-binding-is-object-observe/
  - http://www.nekman.se/object-observe/
  - https://curiosity-driven.org/object-observe-data-binding
  - http://updates.html5rocks.com/2012/11/Respond-to-change-with-Object-observe
  - http://blog.mdnbar.com/binding-data-with-objectobserve
  - https://gist.github.com/eligrey/384583
  - https://gist.github.com/XoseLluis/4750176
  - https://gist.github.com/adriengibrat/b0ee333dc1b058a22b66
  - https://github.com/melanke/Watch.JS/blob/master/src/watch.js
  - https://github.com/Polymer/observe-js/blob/master/src/observe.js
  - https://github.com/jdarling/Object.observe/blob/master/Object.observe.poly.js
  - https://github.com/KapIT/observe-shim/blob/master/lib/observe-shim.js
  - https://github.com/KapIT/observe-shim/blob/master/lib/observe-shim.js
  - https://github.com/jdarling/Object.observe/blob/master/Object.observe.poly.js
  - /////
  - https://github.com/mquan/cortex + http://mquan.github.io/cortex/examples/skyline/
  - https://github.com/attodorov/blast.js
  - https://github.com/james2doyle/simplebinder
  - https://github.com/flams/data-binding-plugin
  - https://github.com/flams/seam
  - http://rivetsjs.com/
  - http://jsfiddle.net/adamsanderson/8E7Dv/
  - http://www.lucaongaro.eu/blog/2012/12/02/easy-two-way-data-binding-in-javascript/
  - https://github.com/grnadav/databind
  - https://github.com/melanke/Watch.JS
  - http://dailyjs.com/2012/11/12/code-review-watch-js/
  - https://gist.github.com/eligrey/384583
  - http://stackoverflow.com/questions/11904039/plain-javascript-bidirectional-data-binding
  - https://github.com/foo123/modelview.js#performance
  - https://github.com/chrismichaelscott/iugo
  - http://www.javascriptoo.com/iugo-js/author
### events
  - https://github.com/component/events
  - https://github.com/WebReflection/eddy/tree/master/build
### template
  - https://github.com/mojo-js/paperclip.js
  - https://github.com/flatiron/plates
  - https://github.com/medikoo/domjs
  - https://github.com/substack/hyperglue
  - https://github.com/krisselden/simple-dom
### update logic (rendering vs data-binding) + computedValues/transforms
## CSS side
### styling (best practices)
  - http://www.paulirish.com/2012/box-sizing-border-box-ftw/
  - http://www.html5rocks.com/en/tutorials/flexbox/quick/
  - http://css-tricks.com/using-flexbox/
  - https://serapath.piratenpad.de/3
  - http://osvaldas.info/keeping-css-short-with-currentcolor
  - http://red-team-design.com/form-controls-currentcolor-pseudo-elements/
  -
  - http://adamschwartz.co/magic-of-css/
  - http://alistapart.com/article/axiomatic-css-and-lobotomized-owls
  - http://mrmrs.io/
  - https://titanpad.com/CSS
  - http://cssguidelin.es/
  -
  - needs to inject styling based on "theme params", thus: CSS file is defaults
    but arguments can override - the whole thing is then overwritten in the
    bundle.css object (alternative: inject into style tag on page)
    => bundle.css via <link> tag vs <script> injected browserify inlined
    (params for: http://brettjankord.com/projects/style-guide-boilerplate/)
## HTML side
  - [@see componentCSSconventions.md](*)

###############################################################################
###############################################################################
###############################################################################
###############################################################################

# PERFORMANCE
  1. use inline string template, because faster then DOM template
  2. use js events because faster than DOM events + cross browser
  3. use requestAnimationFrame + fastDOM for better performance
  4. think about: http://robertleeplummerjr.github.io/thaw.js/


# DOM
  - DOM ready: https://github.com/dsrdakota/onDomReady
  - DOM interaction:
    - remove node: parent.removeChild(child);
    - ...
  - https://demosthenes.info/blog/949/Merging-Responsive-Page-Elements-with-JavaScript
  - http://ejohn.org/blog/dom-insertadjacenthtml/
  - https://github.com/necolas/dom-insert-html/blob/master/index.js

# USER INTERACTION
  - https://github.com/gajus/orientationchangeend
  - keyboard: https://www.npmjs.com/package/hidstream
  - http://interactjs.io/
  - http://tympanus.net/Development/DragDropInteractions/


# ARIA (Accessibility)
- ???


# POLYFILLING
- querySelector,querySelectorAll https://github.com/barberboy/dom-elements
- http://www.zell-weekeat.com/support-for-older-browsers

# TESTING
  http://substack.net/how_I_write_tests_for_node_and_the_browser
  http://www.macwright.org/2014/03/11/tape-is-cool.html
  http://tomsik.cz/2014/06/28/testing-javascript-using-tape/


# LOGGING
  - https://shellycloud.com/blog/2014/11/five-functions-of-the-console-object-you-didnt-know
  - function x () { } x.displayName = 'function x'; // will make chrome dev tools print 'function x' in stack trace
    => So be creative and maybe even document what a function call is supposed to solve in context of current point in running code
      Adding this information costs bytes on the wire and execution time at runtime
      But every build system should have a way to get rid of these assignments in
      optimized/minified builds just like asserts and other debug-only code, so I
      consider it a non problem

# PRESENTATION (teach others)
- DOCS
  - http://dailyjs.com/2011/01/20/framework-part-47/
  - https://github.com/tj/dox + http://cbou.github.io/markdox/
  - http://documentup.com/
  - https://github.com/jdeal/doctor
  - http://usejsdoc.org/
  - http://smartcomments.github.io/
  - https://github.com/cancerberoSgx/short-jsdoc
  - https://github.com/nevir/groc
- CLI:
  - https://github.com/substack/terminal-menu
- TEACH:
  - https://github.com/substack/adventure
- LIVE STYLEGUIDE
  - http://styleguides.io/
  - `KSS` and `kaleistyleguide` deprecated by their maintainers
  - AWESOME: http://ianfeather.co.uk/a-maintainable-style-guide/
    http://ianfeather.co.uk/images/rizzo-output.jpg
    http://rizzo.lonelyplanet.com/styleguide/ui-components/cards
    http://registry.origami.ft.com/components
- ROADMAP
  - http://touchstonejs.io/
  - https://github.com/jedwatson/touchstonejs

###############################################################################
###############################################################################
###############################################################################
###############################################################################

# INSPIRATION - compare this standards to:
- http://patternlab.io/
- http://demo.patternlab.io/?p=organisms-article-body
- http://bradfrost.com/blog/post/atomic-web-design/
- https://github.com/yyx990803/vue
- http://www.ractivejs.org/
  - http://docs.ractivejs.org/latest/ractive-observe
- https://github.com/component/reactive
- https://github.com/ripplejs/ripple + https://github.com/ripplejs/ripple/wiki/Creating-Plugins
- http://absurdjs.com/#superpowers + http://krasimirtsonev.com/blog/article/ToDoMVC-with-AbsurdJS + http://absurdjs.com/todomvc/
- http://absurdjs.com/pages/api/build-in-components/#get-request-with-parameters
- http://code.tutsplus.com/tutorials/absurdjs-or-why-i-wrote-my-own-css-preprocessor--net-36003

- ////
- http://facebook.github.io/react/
- https://github.com/aurajs/aura + http://aurajs.com/
- https://flightjs.github.io/
-

/////////
# REFINE with
- http://bradfrost.github.io/this-is-responsive/resources.html





////////////////
# CREATE COMPONENT (have in mind + draw inspiration from)
- http://ixdchecklist.com/
- http://responsiveemailpatterns.com/
- http://cssdb.co/

/////
CSS
- decoupling structure from theming


@TODO
- check for html minification, concatenation, etc...
- px2em and other em converters



///////////////


// SSR - FastBoot Feature = pre-render server-side, then continue from there clientside
//
// REACT - Virtual DOM
// EMBER - Routing
// custom components (pioneer: Angular)
// routing (pioneer: Ember)
// fast diffing render (pioneer: React)



# PLATES
[PlatesJS](https://github.com/flatiron/plates)
```
  var partial = '<li class="partial"></li>';
  var base = '<div><h1 class="foo"></h1><ul class="menu"></ul></div>';
  var collection = [{'partial':'test1'},{'partial':'test2'},{'partial':'test3'}];
  var multiPartial = Plates.bind(partial, collection);
  var mapping = Plates.Map();
  mapping.class('menu').append(multiPartial);
  var baseData = { foo: 'bar' };
  console.log(Plates.bind(base, baseData, mapping));
```
riot.route(function(){}) // listens to URL change events
riot.route(string) // navigates to a route


window.location.pathname
vs.
req.path


ISOMORPHIC (is a spectrum) USE CASES:
- Templating
- Routing
- I18n
- Date & currency formatting
- Model Validation
- API interaction
- ...?

polyglot.js?
moment.js?

gains:
=> performance initial page load
=> SEO
=> reduce code duplication
=> run code everywhere


////////////////////////////////////////////
var timer;
function give (msg, val) {
  clearTimeout(timer);
  timer = setTimeout(function () { console.log(msg); }, 0);
  return val;
}
var x = {
  a: {
    b: 5
  }
};

var y = {
  get a() {
    return give('y.a', {
      get b()  { return give('y.a.b', x.a.b); },
      set b(_) { return x.a.b; }
    });
  },
  set a(_) {
    return x.a = _;
  }
};
y.a.b;



var jill = smokesignals.convert({})
  .on('event one', function() { ... })
  .on('event two', function() { ... })
  .emit('event one')
  .once('event three', function() { ... })
  .off ('event one')
  ;




var x = {
  "id": "1",
  "title": "Rails is Omakase",
  "links": {
    "author": "9",
    "comments": [ "5", "12", "17", "20" ]
  }
};

function update (path, oldValue, newValue) {
  console.log('change: ' + path + ' from: ' + oldValue + ' to: ' + newValue);
}
function makeModel(obj) {
    var model = function convert (obj);
    return model;
}

function convert (obj) {
    debugger;
}

var model = makeModel(x);
