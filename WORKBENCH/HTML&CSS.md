# HOLON
## VISION, BENEFITS & GOALS + INSPIRATION
Design Systems, not pages!
=> Create Responsive deliverables for every client
  Responsive deliverables should look a lot like fully-functioning tiny Twitter-Bootstrap-style systems custom tailored to your clients needs.

VISION: http://pointnorth.io/
VISION: http://bradfrost.com/blog/post/atomic-web-design/

INSPIRE: https://www.futurelearn.com/pattern-library/form-elements
INSPIRE: https://ux.mailchimp.com/patterns/forms

Benefits
  Modularity
  Blocks styles should not have dependencies on other elements on a page, therefore you will never get problems from cascading.
  This also gives you ability to transfer blocks from ready project to new one.

  Reusablility
  Composing independent blocks in a different way and reusing them reduces amount of CSS code, that you will maintain.
  If you have design guidelines, then it is super effective to have ready Blocks library.

- Component can sit inside a layout
- Component can sit inside another Component
- Component can exist stand-alone
- Components can be moved around without breaking different parts of the layout

GOAL1: break css cascade by using namespacing to simulate local scope
GOAL2: enable targeted insertion of data into specific places inside a component template
GOAL3: enable nested components to manage themselves, thus give them container space
GOAL4: components should reset/normalize for cross-browser themselves
  Base Component
    Each project should contain a base component which contains base styling for raw tags (h2, blockquote, p, etcâ¦).
    The base component's elements should be named after the tag they style, so basic styling for h2 would provide both
    an extendable and full class .base--h2. To apply these styles, create a styled aspect, providing a .base--STYLED class.
    This aspect should have raw elements styled without classes, allowing it to be dropped into any section of a site
    and provide basic styling. Additional aspects can be created to create different base stylings,
    such as form for base form styling.
    => https://github.com/north
GOAL5: most text editors have autocomplete, and gzip will negate any differences in filesize - otherwise: CSSO + similar tools

* Use only single classes for css selectors for max performance
* Never nest selectors unless essential
* Complete avoidance of IDs as STYLING HOOKS, because of no re-usability, but re-use is the purpose of components
* use only class selectors for everything
  - performance:
    http://roytomeij.com/blog/2012/follow-up-don-t-use-class-names-to-find-html-elements-with-js.html
    http://jsperf.com/finding-data-attributes-with-jquery
    It turns out that switching to simple selectors and eliminating CSS cascades wherever possible enabled the CSS rules
    to be applied much faster. Selectors based on a single class name were quick, and browsers handled them with ease.
    We already had a solution that could use such selectors, the so-called âcompletely independent blocksâ (CIB).
    http://clubs.ya.ru/bem/replies.xml?item_no=338
    ==> BEM for SPEED
* ultimately I like a 1:1 parity between the HTML classes in templates/markup and CSS selectors in  style sheets
* needs "pattern validator" [e.g. /\.(\w*)+\-+(([A-Z][a-z]+)+$)/g]

## STILL HAS A
"Normalize Base" - an anchor tag would just be part of the reset/normalize/base file
... includes https://github.com/necolas/normalize.css ?

## IMPORTED CSS LIBS
* Finally, if a class is lowercase, all by itself then it is a utility class e.g. w50, blk
* can be used/re-used an in project building unused stuff is removed and stuff is component-prefixed
  (because it should be able to change @ runtime without necessarily changing other components who use the same mixin)
* prefixes to break cascading and simulate local scope should be done through auto generated prefixes! (component hashes)

## PROCESSING
http://csscomb.com/
https://github.com/postcss/autoprefixer

## TECHNICALLY
==> no mixins! (only if copied and component-prefixed or not at all?)
==> Dont put markup samples in CSS comments
==> the template stub that sits alongside the style sheet should provide all the markup
* versioning for easy removal of old code and components
* breaking cascading and giving local scope by making it name clashes more unlikely
* ==> autoprefix CSS containing components version, so that multiple versions of the component can be used!
* ==> autoprefix in html and css !!!

## RESPONSIVENESS
  => Modules generally don’t have a width specified.
  They’re designed to contain content and sit within a layout,
  which provides constraints to the modules.”

## STYLING
  This means to define repeating visual features (like background and border styles) as separate âskinsâ
  that you can mix-and-match with your various objects to achieve a large amount of visual variety without much code
  => IDEA: create & maintain mixins to use in components which only add the CSS used in that component!
  => PreProcessor should/could be javascript in order to make things "themeable"
  ==> Components CSS File is a "Styling Function", which takes PARAMS, which by default are provided by the package.json (ARGUMENTS),
    which can be potentially overriden by USAGE of that component and the constructor call with a given UI MODEL!
  ==> COMPONENT should always pass on UI VARs for all its children components!
  ==> think about initialization deciding which CSS to include!

## FUN is an acronym for:
* Flat hierarchy
* Utility styles
* Namespaced components

## CODEPEN
* http://codepen.io/serapath/pen/zxzwWj


## LIFECYCLE
  // - init
  // - update
  //// PROCESS
  // 1. Get Template Source
  // 2. Evaluate all bindings with ViewModel Data
  // 3. Turn Template into DOM fragment
  // 4. Execute each binding with values to modify DOM
  // 5. Output HTML


https://www.youtube.com/watch?v=XNoX1FRZ8kE
a very simple API in which to fetch them from the Component Layer
=>  to maintain the mapping between the latest version of the the component and the application,
    and not have developers copy and paste component code
```
e.g.
  // Input
  = ui_component("forms/search", {label: "Search"})
  // Output
  <form class="search--primary" action="//www.lonelyplanet.com/search">
    <label class="accessibility" for="search-q">Search</label>
    <input class="search__input" id="search-q" name="q" tabindex="1" type="search" value="" />
    <button class="search__button" id="search-q-submit" name="search-q-submit" type="submit">Search</button>
  </form>


  // Input
  = ui_component("forms/search", {
    label: "Search",
    autocomplete: true
  })
  // Output
  <form class="search--primary js-autocomplete" action="//www.lonelyplanet.com/search">
    <label class="accessibility" for="search-q">Search</label>
    <input class="js-autocomplete-input search__input" id="search-q" name="q" tabindex="1" type="search" value="" />
    <button class="search__button" id="search-q-submit" name="search-q-submit" type="submit">Search</button>
    <div class="js-autocomplete-container"></div>
  </form>
```
## JS side
- NAME
- defaults
- constructor/initialize
- public API (attributes & methods)
- private SDK (vars & functions)

# reactive model + update logic (rendering vs data-binding) + computedValues/transforms
# events
# templating
# CSS styling
# PERFORMANCE
# DOM
# USER INTERACTION
# ARIA
# POLYFILLING
# TESTING
# LOGGING
# # PRESENTATION (DOCS, CLI, CLI_MENU, TUTORIAL, LIVE_STYLEGUIDE, ROADMAP)

## SPECIFICATION
* __ComponentName__
  * EXAMPLE - [ComponentName]
    * `ProductRating`
    * `SomeModule`
    * `GreenButtonType`
  * [REQUIRED]
  * uses first letter uppercase CamelCase (=PascalCase) (=CamelCaps)
  * __PURPOSE:__
    - name
    - event delegation target for the component
    - It usually doesnt exist on its own (unless the component has no individual sections)
    - not for styling, but for style reset + attr params setting if necessary
    - this Component or node has the current scope injected via JavaScript
    - is used as javascript hook and not meant for styling purposes other than reset
    - should not be changed without checking javascript impact
  * __COMPILES TO:__
    - `holon-ComponentNameX-Y-Z`
    - where `holon-` is __namespace__ to signify used component framework
    - where `X-Y-Z` is current __version__ of component
* __ComponentName--MODIFIERKEY__
  * EXAMPLE - [--MODIFIERKEY]
    * `--STATE_x`
    * `--HIDDEN`
    * `--FEATURED`
    * `--LABEL`
    * `--HIDDEN`
    * `--COLLAPSED`
    * `--EXPANDED`
    * `--SELECTED`
    * `--WARNING`
    * `--STATUS`
    * `--ERROR`
    * `--DANGER`
    * `--DISABLED`
    * `--VARIANT_A`
    * `--STATE_type`
    * `Room--kitchen`
    * `Room--bedroom`
    * `Room--bathroom`
    * `Reviews--albums`
    * `Reviews--movies`
    * `Reviews--books`
  * [OPTIONAL]
  * uses double dashes followed by all uppercase letters
  * __PURPOSE:__
    - its an adjuster, variant label, etc...
    - boolean modifiers (presence===true) (absence===false)
    - are normally used to signify UI STATE (e.g. `.has-MiniCartActive` or `.is-ShowingValue`)
    - only root will be hook to receive bubbled events, but sections or elements
      can be user interaction event emitters that are listend for and which can
      be marked as such (--EMITS_actionSubmit--EMIT_actionSave)
* ComponentName--MODIFIERKEY ... [--MODIFIERKEY] [--MODIFIERKEY_modifierValue]
* __ComponentName--MODIFIERKEY_modifierValue__
  * EXAMPLE - [--MODIFIERKEY_modifierValue]
    * `--COLOR_blue`
  * [OPTIONAL]
  * uses double dashes followed by all uppercase letters
  * followed by single underscore followed by an alphanumeric string
  * __PURPOSE:__
    - key/value modifiers
* ComponentName--MODIFIERKEY_modifierValue ... [--MODIFIERKEY] [--MODIFIERKEY_modifierValue]
* __ComponentName__sectionName__
  * EXAMPLE - [ComponentName__sectionName]
    * `ProductRating__productName`
    * `ProductRating__userRating`
    * `ProductRating__userName`
  * [OPTIONAL]
  * uses double underscore followed by first letter lower case camelCase
  * __PURPOSE:__
    - is a component part and/or element(s) of component
    - an atomic section, styled and managed by the specified Component
* ComponentName__sectionName--MODIFIERKEY
* ComponentName__sectionName--MODIFIERKEY ... [--MODIFIERKEY] [--MODIFIERKEY_modifierValue]
* ComponentName__sectionName--MODIFIERKEY_modifierValue
* ComponentName__sectionName--MODIFIERKEY_modifierValue ... [--MODIFIERKEY] [--MODIFIERKEY_modifierValue]
* __ComponentName__SubComponentName__
  * EXAMPLE - [ComponentName__SubComponentName]
    * `MenuBar__LinkItem`
  * [OPTIONAL]
  * __PURPOSE:__
    - the container element managed by the specified SubComponent
  * __COMPILES TO:__
    - `__SubComponentNameX-Y-Z`
    - where `X-Y-Z` is current __version__ of sub component
* ComponentName__SubComponentName--MODIFIERKEY
* ComponentName__SubComponentName--MODIFIERKEY ... [--MODIFIERKEY] [--MODIFIERKEY_modifierValue]
* ComponentName__SubComponentName--MODIFIERKEY_modifierValue
* ComponentName__SubComponentName--MODIFIERKEY_modifierValue ... [--MODIFIERKEY] [--MODIFIERKEY_modifierValue]
* ComponentName-bind-to-path-in-mode-object
  * EXAMPLE [ComponentName-bind-to-path-in-model-object]
    * `NavigationBar-main-title`
  * [OPTIONAL]
  * __PURPOSE:__
    - reactive binding for { main : { title: "value to be inserted"}}
  * __COMPILES TO:__
    - `holon-ComponentNameX-Y-Z-main-title`
    - where `X-Y-Z` is current __version__ of component
  * __ComponentName__COMPONENTPARAMETER__
    * EXAMPLE - [ComponentName__COMPONENTPARAMETER]
      * `MenuBar__ITEM`
    * [OPTIONAL]
    * __PURPOSE:__
      - the container element managed by the component passed into it
      - Just because something happens to live inside a block it doesnt always mean is
        is actually a BEM element. In the case of our site logo it lives in the .header
        purely coincidentally; it could just as easily be in our sidebar or footer.
    * __COMPILES TO:__
      - `__SubComponentNameX-Y-Z`
      - where `X-Y-Z` is current __version__ of sub component
      - where `SubComponentName` is the name of injected component

### USAGE - HTML
```
  <!-- SOURCE ::::::::::::::::::::::::::::::::::::::::::::::::::::: -->
  <div class="NavigationBar  NavigationBar--LANDSCAPE_true  NavigationBar--MAIN_false">
    <div class="NavigationBar__title"> My Example Component </div>
    <div class="NavigationBar__Logo"></div>
    <div class="NavigationBar__menu"></div>
  </div>
  <div class="NavigationBar  NavigationBar--LANDSCAPE_true  NavigationBar--MAIN_false">
    <div class="NavigationBar__title">
      <h1>My Example Component</h1>
      <span class="NavigationBar-title"> This is a subtitle</span>
      <a href="#">Go</a>
    </div>
    <div class="NavigationBar__Logo"></div>
    <div class="NavigationBar__menu"></div>
  </div>
```
```
  <!-- COMPILED ::::::::::::::::::::::::::::::::::::::::::::::::::::: -->
  <div class="holon-NavigationBar0-0-1  holon-NavigationBar0-0-1--LANDSCAPE_true  holon-NavigationBar0-0-1--MAIN_false">
    <div class="holon-NavigationBar0-0-1__title">
      <h1>My Example Component</h1>
      <span class="holon-NavigationBar0-0-1-title"><!-- "this['title']" --></span>
      <a href="#">Go</a>
    </div>
    <div class="holon-NavigationBar0-0-1__Logo0-1-0"><!-- Logo Component Container --></div>
    <div class="holon-NavigationBar0-0-1__menu"></div>
  </div>
```
### USAGE - CSS
Indentation according to HTML Template structure!
Check: https://titanpad.com/CSS
```
  /* SOURCE ::::::::::::::::::::::::::::::::::::::::::::::::::::: */
  .NavigationBar { /* ... */ }
    .NavigationBar__title { font-size: 3em; }
    .NavigationBar__Logo { width: 100% }
    .NavigationBar__menu { color: blue; }
  .NavigationBar--LANDSCAPE_true { width: 100% }
    .NavigationBar--LANDSCAPE_true .NavigationBar__title {
      font-size: 5em;
    }
    .NavigationBar--LANDSCAPE_true .NavigationBar__Logo {
      width: 100%;
    }
    .NavigationBar--LANDSCAPE_true .NavigationBar__menu {
      width: 100%;
    }
  .NavigationBar--MAIN_false { background-color: grey; }
    .NavigationBar--MAIN_false .NavigationBar__title {
      color: green;
    }
    .NavigationBar--MAIN_false .NavigationBar__Logo {
      width: 100%;
    }
    .NavigationBar--MAIN_false .NavigationBar__menu {
      width: 100%;
    }
```
```
  /* COMPILED ::::::::::::::::::::::::::::::::::::::::::::::::::::: */
  .holon-NavigationBar0-0-1 { /* ... */ }
    .holon-NavigationBar0-0-1__title { font-size: 3em; }
    .holon-NavigationBar0-0-1__Logo { width: 100% }
    .holon-NavigationBar0-0-1__menu { color: blue; }
  .holon-NavigationBar0-0-1--LANDSCAPE_true { width: 100% }
    .holon-NavigationBar0-0-1--LANDSCAPE_true .holon-NavigationBar0-0-1__title {
      font-size: 5em;
    }
    .holon-NavigationBar0-0-1--LANDSCAPE_true .holon-NavigationBar0-0-1__Logo0-1-0 {
      width: 100%;
    }
    .holon-NavigationBar0-0-1--LANDSCAPE_true .holon-NavigationBar0-0-1__menu {
      width: 100%;
    }
  .holon-NavigationBar0-0-1--MAIN_false { background-color: grey; }
    .holon-NavigationBar0-0-1--MAIN_false .holon-NavigationBar0-0-1__title {
      color: green;
    }
    .holon-NavigationBar0-0-1--MAIN_false .holon-NavigationBar0-0-1__Logo0-1-0 {
      width: 100%;
    }
    .holon-NavigationBar0-0-1--MAIN_false .holon-NavigationBar0-0-1__menu {
      width: 100%;
    }
```
### USAGE - JS
```
  $('Menu__item').click( ... );
  $('Menu__item').addClass('Menu__item--state_current');
  $('Menu').toggle('Menu--size_big').toggle('Menu--size_small');

  block('Menu').elem('item').click( ... );
  block('Menu').elem('item').setMod('state', 'current');
  block('Menu').toggleMod('size', 'big', 'small');
```

///////////////////////////////////////////////////////////////////////////////


# COMPONENT in COMPONENT




<div class="content">
    <h1 class="content__headline">Lorem ipsum dolor...</h1>
</div>
Here we might be able to just call the second class .headline; it depends on if it
is styled that way because itâs in .content, or whether it just happens to live in
.content. If it is the latter then we do not need BEM.


NEOCLAS VERSION - provide structural templates
  t-template-name
  t-template-name--modifier-name
  t-template-name__subcomponent-name--subcomponent-modifier-name
EXAMPLES
  t-icon
  t-icon--large

  t-btn
  t-btn--large

  t-media
  t-media__img
  t-media__img--large
  t-media__opt
  t-media__body

Pattern - indicate the state of a component
  is-state-type
Examples
  is-hidden
  is-collapsed
  is-expanded
  is-selected


Pattern - to provide JS-only hooks for a componen
  js-action-name
Examples
  js-submit
  js-action-save
  js-ui-collapsible
  js-ui-dropdown
  js-ui-dropdown--control
  js-ui-dropdown--menu
  js-ui-carousel

Pattern - theming
  specific-name
  specific-name--modifier-name
  specific-name__subcomponent-name
  specific-name__subcomponent-name--subcomponent-modifier-name

<!--
What if we used more white-space around class values?
Does it make the code more readable and surface/separate the components
among the rest of the info in the HTML?
-->

<div class=" t-unit  t-media ">
    <div class=" t-media__img ">
        <a href="#">
            <img class=" product-img " src="http://example.com" alt="">
        </a>
    </div>
    <form class=" t-media__opt  js-action-rate ">
        <button class=" product-rating " type="submit">
            <div class=" product-rating__panel ">
                <span class=" product-rating__points ">
                    5
                </span>
                <span class=" product-rating__label ">
                    upvotes
                </span>
            </div>
            <strong class=" product-rating__action  t-btn  btn-normal ">
                Upvote
            </strong>
        </button>
    </form>
    <div class=" t-media__body ">
        <h2 class=" h2 ">
            <a href="#">Product title</a>
        </h2>
        <p>[content]</p>
        <ul class=" t-uilist--hz ">
            <li><a class=" tag " href="#">tag name</a></li>
            <li><a class=" tag " href="#">tag name</a></li>
            <li><a class=" tag " href="#">tag name</a></li>
        </ul>
    </div>
</div>


ARGUMENTS
Something that is a little unfortunate: Double-clicking the names to just edit
parts of them doesn't work well since underscores are selected together, but dashes not.
So for example with this t-template-name__subcomponent-name, if you wanna select
"subcomponent-name" by double-clicking, name__subcomponent gets selected or only name.

An option would be the other way around: t_template_name--subcomponent_name.
But I also don't like it that much since underscores visually separate the
parts more than dashes.

.product-rating {}
.product-rating__panel {}
VS.
.product-rating {}
.product-rating .product-rating__panel {}

Andrew, I believe the logic is that name spacing your selectors allows devs that
come along behind you to understand that .product-rating__panel is meant to be
a sub-component of .product-rating. Thus, it should always be used inside that
DOM node. It isn't meant to stand alone or outside that node.

.product-rating {}
    .product-rating__panel {}
    .product-rating__panel--foo {}

Performance Penalty - http://jsperf.com/class-vs-data-attribute-selector-performance
You could use data attributes, but does that make more semantic sense than using
a class? My weakly held position is that they are roughly equal. If there isn't
a clear benefit to using data attributes then it's worth noting that they carry
a querying performance penalty.
Looking at the jsperf tests for querying class selectors vs. data attribute selectors,
I lean towards keep JS hooks as classes. It would be nice if querying performance
was the same or at least not as big of a diff between the two. It would be nice
to keep JS hooks separate from CSS hooks in the HTML markup.



.module {...}
.module--modifier {...}
.module__component {...}
.module__component--modifier {...}

I've seen Jonathan Snook talk about using a syntax like:

.module {...}
.module-submodule {...} /* Module Modifier */
.module--subcomponent{...}

.product-rating {...}
.product-rating-modifier {...}
.product-rating--label {...}


.module {...}
.module--modifier {...}
.module-component {...} /* Single dash instead of underscores */
.module-component--modifier {...}

.product-rating {...}
.product-rating--modifier {...}
.product-rating-label {...}
but
product-rating {...} /* Module */
product-rating-label /* Component with single dash. Harder to understand label is component of product rating. */
product-rating__label /* Component with double underscores. Easier to understand */
or
.productRating {...}
.productRating-label {...}
.productRating--modifier {...}


GOAL:  add clarity for developers


.componentName {...}
.componentName_Element {...}
.componentName_Element.componentName_Element--modifier {...}

camelCase is used for names that a single word can't depict (ex: displaySwitcher)
A single underscore is used to separate Blocks and Elements (Perhaps we'll get back to __ if we realize that some coders in our team use the _ wrongfully, but for now _ seems enough)
We separate modifiers with two dashes to make it stick out and make its role obvious. Also text editors will usually stop the selection on the hyphen when double-clicking, so it makes sense to use it there and not in any other separator.
We prefix all modifier classes with the non modified class to ensure the specificity will always be a bit higher, as we've had issues with that (due to modernizr classes iirc).


@TODO
- Rewriting selector names in HTML and CSS to "minify" them


<!--
What if we used more white-space around class values?
Does it make the code more readable and surface/separate the components
among the rest of the info in the HTML?
-->

<div class=" t-unit  t-media ">
    <div class=" t-media__img ">
        <a href="#">
            <img class=" product-img " src="http://example.com" alt="">
        </a>
    </div>
    <form class=" t-media__opt  js-action-rate ">
        <button class=" product-rating " type="submit">
            <div class=" product-rating__panel ">
                <span class=" product-rating__points ">
                    5
                </span>
                <span class=" product-rating__label ">
                    upvotes
                </span>
            </div>
            <strong class=" product-rating__action  t-btn  btn-normal ">
                Upvote
            </strong>
        </button>
    </form>
    <div class=" t-media__body ">
        <h2 class=" h2 ">
            <a href="#">Product title</a>
        </h2>
        <p>[content]</p>
        <ul class=" t-uilist--hz ">
            <li><a class=" tag " href="#">tag name</a></li>
            <li><a class=" tag " href="#">tag name</a></li>
            <li><a class=" tag " href="#">tag name</a></li>
        </ul>
    </div>
</div>

@TODO - check for naming inspiration of modifies: https://github.com/bjankord/CSS-Components-Modifiers-And-Subcomponents-Collection


<!--:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::::  @TODO: EVOLVE this into LIVE STYLEGUIDE
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-->
https://github.com/bjankord/CSS-Components-Modifiers-And-Subcomponents-Collection
<!--:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    TEMPLATES

            +data-template
            +data-style
            +data-script

            +data-bind

            data-url
            data-json
            data-schema
            data-collection

            data-if-x

            data-clone
            data-model
            data-source
            data-attribute
            data-field
            data-property
            data-param
            data-argument
            data-event
            data-trigger
            data-emit
            data-listen
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-->

<!-- //// BEM COMPONENT MODEL ////

REQUIREMENTS:
- SHIMMED PER ENVIRONMENT
- Performance
- Component Model
    - Templating
    - i18n // e.g. <script src="#{local}.js"> + i18n with JSON data
    - Transforms (e.g. Date & Currency Formatting)
    - App Logic
    - Routing
    - Model Validation
    - API Interaction
    - ...?
- Data Binding  // Declarative Bindings: Tempaltes === Pure HTML
  // => No more messy RENDER METHODS
  // => Dont think about updating
- Standards Support
- Internationalization (i18n)
- SEO
- Long Term
- DRY
- Faster Development
- Flexibility
- "Quality Features"

-->

// [path/to/Teaserbox.html]
  // <ul class='contacts'>
  //   <li class='contact'>
  //     <span class='name'>My Name</span>
  //     <p class='title'>Leet Developer</p>
  //   </li>
  // </ul>
//// CONVENTION IDEAS:
"div-item-data"
"data-type-Teaserbox"
"data-use-Cloud/Place/Event/..."
"data-item-name"
"data-item-id"
"data-item-cost"
"data-item-price"
"data-transformchain" = ['sum', 'currency'] // pipes value through transform

<!--
<div data-hello.you.0='test' data-0='asdf'>
</div>

$('div')[1]
<div data-hello.you.0=​"test" data-0=​"asdf">​
  ​</div>​
$('div')[1].dataset
DOMStringMap {hello.you.0: "test", 0: "asdf"}
var x = { hello.you.0: "test", 0: "asdf"};
SyntaxError: Unexpected token .
var x = { hello.you.0: "test", "0": "asdf"};
SyntaxError: Unexpected token .
var x = { "hello.you.0": "test", "0": "asdf"};
undefined
x
Object {0: "asdf", hello.you.0: "test"}
x.0
SyntaxError: Unexpected number
x[0]
"asdf"
for (a in x) console.log(a)
0 VM1226:2
hello.you.0 VM1226:2
undefined
for (a in x) console.log(x[a])
asdf VM1227:2
test VM1227:2
undefined
-->


      <div
        data-template       ='/v0.0.1/api/components/Dynatable.template.html'
        data-style          ='/v0.0.1/api/components/Dynatable.css'
        data-script         ='/v0.0.1/api/components/Dynatable.js'

        class='
          Dynatable
          Dynatable--CONTEXT_none
          Dynatable--STATE_normal
          Dynatable--VARIANT_default
        '


        data-url        ='/v0.0.1/api/components/dynatable'
        data-json       =''
        data-schema     =''
        data-collection ='' // (=data-context) === "to which data to transition to?"

        data-brainstorm-event-receive='object:predicate:subject'
        data-brainstorm-event-trigger='object:predicate:subject'

        // event.target contains ORIGIN
        // listen only to broadcastet events which are registered for
        //    COMPONENTS have only an attribute for all: TRIGGERED EVENTS
        //    = Wiring up different Components then happens in the "config" of an APP
        //      by "Listening" for those "Events" + checking eventual "Target" & "Target.id" and then
        //      invoking the API of the component that wants to REACT on an event


        data-js-api-methods     ='create-read-update-delete'
        data-events=['CREATE', 'READ', 'UPDATE', 'DELETE']

        data-event-api          ='response:item'
        data-channel-item-event ='response:item'
        data-channel-item-value ='{name:"hans"}'

        data-api-interface  ='FAVOURITE'
        data-api-events     ='FAVOURITE'

        data-api ='
          response:item
          followMe
          follow:target
          ignoreMe
          ignore:target
          register:target
          unregister:target
        '
        data-events ='
          request:data
          followMe
          follow:target
          ignoreMe
          ignore:target
          register:target
          unregister:target
        '
      >
        <!--::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-->
        <div
          class="Dynatable__actionbar"
        >

        </div>
        <div
          class="Dynatable__headerbar"
        >

        </div>
        <div
          class="Dynatable__content"
        >

        </div>
        <!--::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-->
        <div class='Dynatable__menu'>
          <button class='Dynatable__createItem'> New Item </button>
          <div class='Dynatable__search'></div>
          <div class='Dynatable__paginator'></div>
        </div>
        <table>
          <thead>
            <tr
              class='
                Dynatable__header
              '
            >
              <th
                class='
                  Dynatable__titleCell
                '
                data-template='Dynatable__titleCell'
              ></th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
        <!--::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-->
      </div>

<script>


<!--:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::::  CONTENT - OLD
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-->
<h1> Live Styleguide </h1>
<hr><hr>
<h1> Server Side Rendering </h1>
<div id="main" style="display:inline-block; width:25%;">
      <ul id="tiles">
        <!--:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        ::::  SCOPE
        ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-->
        <% if @list_of_articles %><% @list_of_articles.each_with_index do |article, index|
          data_title      = article.try(:title).blank? ? '' : article.title
          data_category   = article.try(:parent).try(:title).blank? ? '' : article.parent.title
          data_tags       = article.try(:place).try(:categories).any? ? article.place.categories.map(&:title) : ['']
          data_public_url = article.try(:public_url).blank? ? '' : article.public_url
          data_image      = article.try(:image, "standard", "big").blank? ? '/system/images/77/original/Diener_fb_blurred_cover_01.jpg' : article.image("standard", "big")
        %>
        <!--:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        ::::  PLACE TEASERBOXES
        ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-->
        <li
          data-id="<%= index %>"
          data-sort-image="<%= data_image.blank? ? false : true %>"
          data-sort-name="<%= data_title %>"
          data-filter-class="<%= data_tags.map{|tag| tag.downcase} %>">
          <div class="Teaserbox  Teaserbox--STATE=pending
          Teaserbox--VARIANT=<%= article.article_type.split(' ')[0].downcase %>"
          data-json="{
            'title'       : <%= data_title %>,
            'category'    : <%= data_category %>,
            'public_url'  : <%= data_public_url %>,
            'image'       : <%= data_image %>,
          }"
          onclick="(function () {
            location.href='<%= data_public_url %>';
          })();">
            <div class="Teaserbox__ribbon"></div>
            <img class="Teaserbox__image" src="<%= data_image %>" alt="<%= data_title %>">
            <div class="Teaserbox__info">---</div>
            <div class="Teaserbox__title"><%= data_title %></div>
            <div class="Teaserbox__description"><%= data_category %></div>
          </div>
        </li>
        <!--::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-->
        <!--::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-->
        <% end end %>
      </ul>
</div>
<xmp style="display:inline-block; width:25%;">
<div id="main">
      <ul id="tiles">
        <!--:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        ::::  SCOPE
        ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-->
        <% if @list_of_articles %><% @list_of_articles.each_with_index do |article, index|
          data_title      = article.try(:title).blank? ? '' : article.title
          data_category   = article.try(:parent).try(:title).blank? ? '' : article.parent.title
          data_tags       = article.try(:place).try(:categories).any? ? article.place.categories.map(&:title) : ['']
          data_public_url = article.try(:public_url).blank? ? '' : article.public_url
          data_image      = article.try(:image, "standard", "big").blank? ? '/system/images/77/original/Diener_fb_blurred_cover_01.jpg' : article.image("standard", "big")
        %>
        <!--:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        ::::  PLACE TEASERBOXES
        ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-->
        <li
          data-id="<%= index %>"
          data-sort-image="<%= data_image.blank? ? false : true %>"
          data-sort-name="<%= data_title %>"
          data-filter-class="<%= data_tags.map{|tag| tag.downcase} %>">
          <div class="Teaserbox  Teaserbox--STATE=pending
          Teaserbox--VARIANT=<%= article.article_type.split(' ')[0].downcase %>"
          data-json="{
            'title'       : <%= data_title %>,
            'category'    : <%= data_category %>,
            'public_url'  : <%= data_public_url %>,
            'image'       : <%= data_image %>,
          }"
          onclick="(function () {
            location.href='<%= data_public_url %>';
          })();">
            <div class="Teaserbox__ribbon"></div>
            <img class="Teaserbox__image" src="<%= data_image %>" alt="<%= data_title %>">
            <div class="Teaserbox__info">---</div>
            <div class="Teaserbox__title"><%= data_title %></div>
            <div class="Teaserbox__description"><%= data_category %></div>
          </div>
        </li>
        <!--::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-->
        <!--::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-->
        <% end end %>
      </ul>
</div>
</xmp>




<hr><hr>
<h1> Client Side Rendering + Updating </h1>
<div id="main" style="display:inline-block; width:25%;">
      <ul id="tiles">
        <!--:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        ::::  SCOPE
        ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-->
        <% if @list_of_articles %><% @list_of_articles.each_with_index do |article, index|
          data_title      = article.try(:title).blank? ? '' : article.title
          data_category   = article.try(:parent).try(:title).blank? ? '' : article.parent.title
          data_tags       = article.try(:place).try(:categories).any? ? article.place.categories.map(&:title) : ['']
          data_public_url = article.try(:public_url).blank? ? '' : article.public_url
          data_image      = article.try(:image, "standard", "big").blank? ? '/system/images/77/original/Diener_fb_blurred_cover_01.jpg' : article.image("standard", "big")
        %>
        <!--:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        ::::  PLACE TEASERBOXES
        ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-->
        <li
          data-id="<%= index %>"
          data-sort-image="<%= data_image.blank? ? false : true %>"
          data-sort-name="<%= data_title %>"
          data-filter-class="<%= data_tags.map{|tag| tag.downcase} %>">
          <div class="Teaserbox  Teaserbox--STATE=pending
          Teaserbox--VARIANT=<%= article.article_type.split(' ')[0].downcase %>"
          data-json="{
            'title'       : <%= data_title %>,
            'category'    : <%= data_category %>,
            'public_url'  : <%= data_public_url %>,
            'image'       : <%= data_image %>,
          }"
          onclick="(function () {
            location.href='<%= data_public_url %>';
          })();">
            <div class="Teaserbox__ribbon"></div>
            <img class="Teaserbox__image" src="<%= data_image %>" alt="<%= data_title %>">
            <div class="Teaserbox__info">---</div>
            <div class="Teaserbox__title"><%= data_title %></div>
            <div class="Teaserbox__description"><%= data_category %></div>
          </div>
        </li>
        <!--::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-->
        <!--::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-->
        <% end end %>
      </ul>
</div>
<xmp style="display:inline-block; width:25%;">
<div id="main" role="main">
      <ul id="tiles">
        <!--:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        ::::  SCOPE
        ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-->
        <% if @list_of_articles %><% @list_of_articles.each_with_index do |article, index|
          data_title      = article.try(:title).blank? ? '' : article.title
          data_category   = article.try(:parent).try(:title).blank? ? '' : article.parent.title
          data_tags       = article.try(:place).try(:categories).any? ? article.place.categories.map(&:title) : ['']
          data_public_url = article.try(:public_url).blank? ? '' : article.public_url
          data_image      = article.try(:image, "standard", "big").blank? ? '/system/images/77/original/Diener_fb_blurred_cover_01.jpg' : article.image("standard", "big")
        %>
        <!--:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        ::::  PLACE TEASERBOXES
        ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-->
        <li
          data-id="<%= index %>"
          data-sort-image="<%= data_image.blank? ? false : true %>"
          data-sort-name="<%= data_title %>"
          data-filter-class="<%= data_tags.map{|tag| tag.downcase} %>">
          <div class="Teaserbox  Teaserbox--STATE=pending
          Teaserbox--VARIANT=<%= article.article_type.split(' ')[0].downcase %>"
          data-json="{
            'title'       : <%= data_title %>,
            'category'    : <%= data_category %>,
            'public_url'  : <%= data_public_url %>,
            'image'       : <%= data_image %>,
          }"
          onclick="(function () {
            location.href='<%= data_public_url %>';
          })();">
            <div class="Teaserbox__ribbon"></div>
            <img class="Teaserbox__image" src="<%= data_image %>" alt="<%= data_title %>">
            <div class="Teaserbox__info">---</div>
            <div class="Teaserbox__title"><%= data_title %></div>
            <div class="Teaserbox__description"><%= data_category %></div>
          </div>
        </li>
        <!--::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-->
        <!--::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-->
        <% end end %>
      </ul>
</div>
</xmp>

<hr><hr>
<h1> IDEAL VERSION </h1>
<!--:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::::  CONTENT - IDEAL
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-->



<div id="main">
      <ul id="tiles">
        <!--:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        ::::  SCOPE
        ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-->
        <% if @list_of_articles %><% @list_of_articles.each_with_index do |article, index|
          data_title      = article.try(:title).blank? ? '' : article.title
          data_category   = article.try(:parent).try(:title).blank? ? '' : article.parent.title
          data_tags       = article.try(:place).try(:categories).any? ? article.place.categories.map(&:title) : ['']
          data_public_url = article.try(:public_url).blank? ? '' : article.public_url
          data_image      = article.try(:image, "standard", "big").blank? ? '/system/images/77/original/Diener_fb_blurred_cover_01.jpg' : article.image("standard", "big")
        %>
        <!--:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        ::::  PLACE TEASERBOXES
        ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-->
        <li
          data-id="<%= index %>"
          data-sort-image="<%= data_image.blank? ? false : true %>"
          data-sort-name="<%= data_title %>"
          data-filter-class="<%= data_tags.map{|tag| tag.downcase} %>">
          <div class="Teaserbox  Teaserbox--STATE=pending
          Teaserbox--VARIANT=<%= article.article_type.split(' ')[0].downcase %>"
          data-json="{
            'title'       : <%= data_title %>,
            'category'    : <%= data_category %>,
            'public_url'  : <%= data_public_url %>,
            'image'       : <%= data_image %>,
          }"
          onclick="(function () {
            location.href='<%= data_public_url %>';
          })();">
            <div class="Teaserbox__ribbon"></div>
            <img class="Teaserbox__image" src="<%= data_image %>" alt="<%= data_title %>">
            <div class="Teaserbox__info">---</div>
            <div class="Teaserbox__title"><%= data_title %></div>
            <div class="Teaserbox__description"><%= data_category %></div>
          </div>
        </li>
        <!--::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-->
        <!--::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-->
        <% end end %>
      </ul>
</div>


<div id='person' data-json='{text: name, value: name'}></div>

<div
  id="person1"
  class="Person Person--STATE=default"
  data-url="/v0.0.1/de/api/model/person/1"    <!-- Models Collections + Persistance + Updated -->
  data-i18n="de"                              <!-- i18n / locales -->
  data-transformchain="['fn1','fn2','fn3']"   <!-- e.g. currency formatting, date formatting, ... -->

  data-onclick="pushState('/person/1')"                 <!-- routing -->
  data-handlers="{onclick: 'test1', onswipe: 'test2'}"  <!-- user interaction -->

  data-json=""                                <!-- initial server rendered data from data-url -->
>
  <div class="Person__hand"   data-bind="name" >
    <!-- server can initialize content here -->
  </div>
  <div class="Person__finger" data-bind='text:name' >
    <!-- server can initialize content here -->
  </div>
  <div class="Person__feet"   data-bind='value'>
    <!-- server can initialize content here -->
  </div>
</div>



<!-- BIG EXAMPLE -->

  <div class="page">
    <div class="head">
      <div class="menu  menu_size_big  menu_type_buttons  menu_theme_xmas  menu_simple">
        <style>
          .menu_size_big {
            <!-- // CSS code to specify height -->
          }
          .menu_type_buttons .menu__item {
            <!-- // CSS code to change item look -->
          }
        </style>
        <!--
          // MODIFIERS:
          //  ComponentName_key_value
          //  modifiers are properties of an entity that describes a block or an element
        -->
        <ul class="menu__navigation">
          <li class="menu__layoutUnit  menu__layoutUnit_state_current">
            <div class="menu_item">
              Home
            </div>
          </li>
          <li class="menu__layoutUnit">
            <div class="menu_item">
              About
            </div>
          </li>
          <li class="menu__layoutUnit">
            <div class="menu_item">
              Products
            </div>
          </li>
          <li class="menu__layoutUnit">
            <div class="menu_item">
              Contact
            </div>
          </li>
        </ul>
        <button class="menu__login  menu__state_disabled"></button>
      </div>
      <div class="head__column">
        <div class="logo">
          <!-- ... -->
        </div>
      </div>
      <div class="head__column">
        <div class="search">
          <div class="search__input"></div>
          <div class="search__button"></div>
        </div>
      </div>
      <div class="head__column">
        <div class="auth">
          <!-- ... -->
        </div>
      </div>
    </div>
  </div>

  <!-- Article layout with Big Media aspect -->
  <div class="_article--BIG-MEDIA">
    <!-- Main element of Article layout -->
    <article class="_article--main">
      <!-- Heading element of Article layout -->
      <div class="_article--heading">
        <!-- PRIMARY Heading aspect of Typography component -->
        <h1 class="typography--PRIMARY-HEADING">Article Title</h1>
      </div>
      <!-- Media element of Article layout -->
      <figure class="_article--media">
        <!-- Video components, Full HD aspect -->
        <div class="video--FULL-HD">
          <!-- Video element of Video component -->
          <video class="video--video" />
        </div>
      </figure>
      <!-- Body element of Article layout, Area aspect of Typography component  -->
      <div class="_article--body typography--AREA">
        <h2>Some user entered copy goes here</h2>
        <p>Yay Copy!</p>
      </div>
    </article>
    <!-- Secondary element of Article layout  -->
    <aside class="_article--secondary">
      <!-- Popular aspect of Related component -->
      <div class="related--POPULAR">
        <!-- Heading element of Related component -->
        <div class="related--heading">
          <!-- Tertiary Heading aspect of Typography component -->
         <h2 class="typography--TERTIARY-HEADING">Block Title</h2>
       </div>
       <!-- Body element of Related component -->
       <div class="related--body">
         <p>Yay Copy!</p>
       </div>
     </div>
    <aside>
  </div>

  <button class="button button_state_danger">
    Danger button
  </button>

  <style>
    .button {
      display: inline-block;
      border-radius: 3px;
      padding: 7px 12px;
      border: 1px solid #D5D5D5;
      background-image: linear-gradient(#EEE, #DDD);
      font: 700 13px/18px Helvetica, arial;
    }

    .button_state_success {
      color: #FFF;
      background: #569E3D linear-gradient(#79D858, #569E3D) repeat-x;
      border-color: #4A993E;
    }

    .button_state_danger {
      color: #900;
    }

    .person {}
    .person__hand {}
    .person--female {}
    .person--female__hand {}
    .person__hand--left {}
  </style>

  <form class="site-search  site-search--full">
      <input type="text" class="site-search__field">
      <input type="Submit" value ="Search" class="site-search__button">
  </form>

  <style>
    .media {}
    .media__img {}
    .media__img--rev {}
    .media__body {}
  </style>

  <div class="media">
      <img src="logo.png" alt="Foo Corp logo" class="media__img--rev">
      <div class="media__body">
          <h3 class="alpha">Welcome to Foo Corp</h3>
          <p class="lede">Foo Corp is the best, seriously!</p>
      </div>
  </div>

  <div class="my-module">

    <div class="my-module__child-component">
      <div class="child-component">

        <div class="child-component__grandchild-component">
          <div class="grandchild-component--modifier"></div>
        </div>

      </div>
    </div>

  </div>



<!--::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-->
<!--
  SYNTAX INSPIRATION - PURE
-->
<body>
  <!-- HTML template -->
  <ul>
    <li></li>
  </ul>

  <script>
    var data = {
      animals:[
        {name:'bird'},
        {name:'cat'},
        {name:'dog'},
        {name:'mouse'}
      ]
    };

    //declaration of the actions PURE has to do
    var directive5 = {
      // SELECTOR-TEMPLATE (document...x)
      'li':{
        // SELECTOR-DATA (data.x)
        'animal<-animals':{
          // MAPPING
          '.':'animal.name'
        }
      }
    };

    // note the use of render instead of autoRender
    $('ul').render(data, directive5);
</script>
</body>




<body>

  <!-- HTML template4 -->
  <div class="template">
    Hello <a></a>
  </div>

  <script>
    var
      data4 = {
        'who':'BeeBole!',
        site:'http://beebole.com'
      },
      directive4 = {
        // MAPPING
        // SELECTOR-TEMPLATE (document...x) : SELECTOR-DATA (data.x)
        'a':'who', //look for the tag 'a' and place the value of the property 'who' in its node value

        // MAPPING
        // SELECTOR-TEMPLATE (document...x@y) : SELECTOR-DATA (data.x)
        'a@href':'site' //look for the tag a, and set its attribute 'href' to the value of the property 'site'
      }
    ;
    //note the use of render instead of autoRender and the 2nd parameter with directive
    $('div.template').render(data4, directive4);
  </script>
</body>




<head>
  <style>
    .even td { background : #DDD }
    .odd  td { background : #FFF }
  </style>
</head>
<body>
  <!-- HTML templateA -->
  <ul>
    <li></li>
  </ul>

  <!-- HTML templateB -->
  <ol>
    <!-- Explanation of the classes of the LI:
      *   "animals" points to an array and will trigger an iteration

      *   "name" points to the property within the array and will set
        the node value of the LI
     -->
    <li class="animals name"></li>
  </ol>
  <!--
    same example as before but with an attribute assignment
    note the property@attribute notation
    'who@value' means place the value of the property who in the value attribute
  -->
  Hello <a class="who site@href"></a>

  <!-- HTML templateD -->
  <table>
    <tr>
      <td></td>
    </tr>
  </table>

  <script>
    var directive = {
    'tr' : { //trigger a loop
      'animal<-animals' : { // loop on the property animals in the JSON
       '@class+':function(arg){ // add(+) the return value of the function to the class
        var oddEven, firstLast;
        oddEven = (arg.pos % 2 == 0) ? ' even' : ' odd';
        firstLast = (arg.pos == 0) ?
         ' first' :
         (arg.pos == arg.animal.items.length - 1) ?
          ' last' :
          '';
        return oddEven + firstLast;
       },
       'td':'animal.name'
       }
     }
    };

    // animals is an array and will trigger an iteration
    var data = {
      animals:[
        {name:'bird'},
        {name:'cat'},
        {name:'dog'},
        {name:'mouse'}
      ]
    };
    //example with mootools
    $(document).getElement('ol').autoRender(data);
    $('table').render(data, directive);

    // the JSON data we want to render
    var data2 = {'who':'BeeBole!', site:'http://beebole.com'};
    $('a').autoRender(data2);


    var data3 = {
      legs:4,
      animals:[
        {name:'dog', legs:4},
        {name:'cat', legs:4},
        {name:'bird', legs:2},
        {name:'mouse', legs:4}
      ]
    };

    //declaration of the actions PURE has to do
    var directive3 = {
      'li':{
        'animal<-animals':{
          '.':'animal.name'
        },
        sort:function(a, b){
          return a.name > b.name ? 1 : -1;
        },
        filter:function(a){
          return a.context.legs === a.item.legs;
        }
      }
    };

    // note the use of render instead of autoRender, and the 2nd argument
    $('ul').render(data3, directive3);
  </script>
</body>

<!--::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-->
