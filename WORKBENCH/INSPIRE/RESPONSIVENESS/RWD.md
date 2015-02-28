# var messages = merge(twitter, fb, gplus, github)
messages.map(normalize) // convert to single message format
  .filter(selectHashtag) // cherry pick messages that use the tag
  .pipe(process.stdout) // stream output to stdout


  The only real element query polyfill is the first from https://github.com/marcj/css-e....

# ...
All other libraries only listen on window.onresize event which is terrible slow because it has to check _all_ elements that have a rule,
instead of only the actual resized element. Also when you listen only on window.onresize you won't check dimension changes inside the
application where the actual window has not changed. marcj/css-element-queries instead sets up a resize sensor on each element that
needs to be styled based on it dimensions thus checks only resized elements instead of everything. Also other polyfills work only
when you change browser's window. If a element inside it has changed (imagine a resizeable sidebar with buttons inside that have rules)
no rule will applied since only window.onsize is listened in to.


USE RESET (but components reset themselves!) - so they can be included in projects that use: (nothing/cssReset/cssNormalize/custom)
http://cssresetr.com/
https://github.com/necolas/normalize.css


BOILERPLATE
https://github.com/corysimmons/boy
https://github.com/simurai/oak
https://github.com/corysimmons/switch/tree/master/switch
http://mn-ml.cc/ - https://github.com/mrmrs/mnml
https://github.com/mrmrs/html/blob/master/index.html
http://mrmrs.io/ (lots of nice css things)
print:
  https://www.nccgroup.com/en/blog/2014/10/does-a-print-css-file-slow-your-site-down/
  http://demosthenes.info/blog/946/CSS-last-line-Controlling-Widows-&-Orphans


# CONDITIONAL LOADING
- http://bradfrost.github.io/this-is-responsive/resources.html#conditional-loading
- http://24ways.org/2011/conditional-loading-for-responsive-designs/
-

Conditional loading just might be one of the best tools we have in our responsive toolbox.
Conditional loading involves chunking out secondary content into their own HTML fragments,
then loading them in only when the user requests them or the conditions are right.
Conditional loading creates more performant, scannable experiences while still providing
access to the full content or functionality.
For more information about conditional loading - check out these resources

http://bradfrost.com/blog/post/responsive-strategy/
