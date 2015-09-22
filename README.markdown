table of content
=======
* [introduction](#holon)
* [demo](#demo)
* [usage](#usage)
* [api](#api)
* [authors](#authors)
* [jobs](#jobs)
* [contribute](#contribute)
* [repository description](#repository)
* [license](#license)


**This is WORK IN PROGRESS, do not use**

holon
=====
[[back to top](#table-of-content)]

[ ![Codeship Status for coding-amigos/holon](https://www.codeship.io/projects/5e83d670-3d10-0132-4da6-622d80cfe64c/status)](https://www.codeship.io/projects/43168)

Leight-weight DSL-free dual-side composable reactive components
![holon](https://raw.github.com/coding-amigos/holon/master/holon.png)

If you want to find __holons__, search [npmjs.org](http://www.npmjs.org) for
`ecosystem:holon` or browse [holons](https://www.npmjs.com/browse/keyword/holon)


demo
=======
[[back to top](#table-of-content)]

__☠☠☠ section is under construction ☠☠☠__




usage
=======
[[back to top](#table-of-content)]

```js
var componentName = require('componentName'); // encapsulates best practice boilerplate for certain kinds of projects
var componentAPI = componentName({
  container      : `domNodeOrSelector`, // maybe it should always be a dom node
  options        : {/* configuration options */}, /* some configuration depending on the project that should be built*/
  data           : `modelOrStreamOrEventEmitter`, // to initialize or update stuff /* some webpage specific data or e.g. RESTful endpoints to fetch the data */
  children       : [ // this is optional, because maybe the component can use defaults if not provided /* inject some components to be used to render page in detail - if not provided might fallback to default components */
    { '__title'  : titleComponent   },
    { '__list'   : listComponent    },
    { '__sidebar': sidebarComponent }
  ]
});
```
__☠☠☠ section is under construction ☠☠☠__

install with [npm](http://npmjs.org) do:

```
npm install holon
```

install with [git](http://git-scm.com/) do:

```
git clone https://github.com/coding-amigos/holon.git
```




api
=======
[[back to top](#table-of-content)]

__☠☠☠ section is under construction ☠☠☠__




authors
=======
[[back to top](#table-of-content)]

* [serapath](https://github.com/serapath "Alexander Praetorius")




jobs
=======
[[back to top](#table-of-content)]

There is more jobs in the source code marked with `// @TODO: <job description>` and eventually some jobs might be listed under the [holon issues](https://github.com/coding-amigos/holon/issues "holon - open issues") page, which can also be accessed through [waffle.io](https://waffle.io/coding-amigos/holon "holon - open issues").
* __@TODO:__ Publish it as a component
  * http://modernweb.com/2014/02/17/introduction-to-the-component-javascript-package-manager/
  * https://github.com/component/component/wiki/Components
* __@TODO:__ Create a Github Page
  * https://github.com/jekyll/jekyll
  * https://help.github.com/categories/20/articles
* __@TODO:__ Include Testing via "Specification Driven Development" using gherkin dsl & TESTEM
  * https://github.com/cucumber/cucumber/wiki/Gherkin
  * https://github.com/airportyh/testem
* __@TODO:__ Add 'Leight-weight DSL-free dual-side composable "BEMified" reactive components' + more verbose description to README.markdown
* __@TODO:__ Edit all 'under construction sections' in README.markdown (at least add "@TODO's" for them to the "Jobs Section")
* __@TODO:__ Add CHANGELOG File
* __@TODO:__ This section should instead list all the TODO-Branches currently available + a link to the "TODO Description file in that branch"
  * The README.markdown in that branch could list the description under the "jobs section"
* __@TODO:__ add workflow description
  * http://www.wolfe.id.au/2014/02/01/getting-a-new-node-project-started-with-npm/
  * http://quickleft.com/blog/creating-and-publishing-a-node-js-module
  * http://www.devthought.com/2012/02/17/npm-tricks/
* __@TODO:__ find convention for branch names, e.g. {CA-1}{SPIKE}{jeet.gs} and COMMIT NAMES

__☠☠☠ section is under construction ☠☠☠__


contribute
=======
[[back to top](#table-of-content)]

### PREPARE SYSTEM
  * install [git](http://git-scm.com "git") if it is not yet installed on your system
  * install [node](http://nodejs.org "nodejs") if it is not yet installed on your system
  * open a terminal on your system and navigate to your favourite workspace folder
    * _(you might need to prefix some of the following commands with `sudo` to make them work)_

### START PREPARING HOLON PROJECT
* `git clone https://github.com/coding-amigos/holon.git`
* `npm install`
* `npm update`
* `stylus -u jeet -u nib -rupture -w holon.styl`
* load main HTML project file by opening and pointing your browser to:
  * a server that serves the `./DEMO/dev.html` file _(e.g. localhost:3000/DEMO/dev.html)_
  * or doubleclick `./DEMO/dev.html` file to open it directly in your browser
    * __HINT:__ this only works with CORS disabled. In order to do so:
      * mac osx `open -a Google\ Chrome --args --disable-web-security`
      * linux `google-chrome --disable-web-security`
      * windows `chrome.exe --disable-web-security`

__... HAPPY CODING :-)__




repository
==========
[[back to top](#table-of-content)]

1. __`./`__
  * Contains meta data about this component
2. __`./DEMO`__
  * Contains a file that demonstrate how to use this component in your project
3. __`./DEPENDENCIES`__
  * Contains all internal dependencies used by this component, but not yet published to their own repositories
4. __`./RELEASE`__
  * Contains production ready versions of this component which are used by examples in `./DEMO`
  * __CDNs/REGISTRYs:__ `v0.0.3@git`, `v0.0.2@npm`
5. __`./SOURCE`__
  * Contains all the source files for this component
6. __`./SOURCE/media`__
  * Contains fonts, images, videos, music and the like, used by this component
7. __`./SPECIFICATION`__
  * Contains the vision, roadmap, open jobs and tests for completed jobs regarding this component
8. __`./@TODO/`__ (currently private)
  * Contains some experimental stuff for inspiration to "spike" the use of certain technologies to develop this component further




license
=======
[[back to top](#table-of-content)]

<p xmlns:dct="http://purl.org/dc/terms/" xmlns:vcard="http://www.w3.org/2001/vcard-rdf/3.0#">
  <a rel="license"
     href="http://creativecommons.org/publicdomain/zero/1.0/">
    <img src="https://raw.github.com/coding-amigos/holon/master/cc0.png" style="border-style: none;" alt="CC0 1.0 Universal" />
  </a>
  <br />
  To the extent possible under law,
  <a rel="dct:publisher"
     href="http://www.serapath.de">
    <span property="dct:title">Alexander Praetorius</span></a>
  has waived all copyright and related or neighboring rights to
  <span property="dct:title">holon</span>.
This work is published from:
<span property="vcard:Country" datatype="dct:ISO3166"
      content="DE" about="http://www.serapath.de">
  Germany</span>.
</p>

[...more information](https://raw.github.com/coding-amigos/holon/master/LICENSE "CC0 1.0 Universal")
