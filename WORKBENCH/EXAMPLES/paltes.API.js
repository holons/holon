// PLATES BASE API #

//   # BASE API
//     # bind(html:HTMLstring|String|Filename, data:JSON|String, map)
//       # => result of <html> merged with <data>
//       # => inserts all values of data[key] into tag with an attribute value of key
//         # html - string of well-formel HTML
//         # data - JSON
//         # map  - data mapping for the partial (instance of Plates.Map())

//     # where(attribute:String)
//       # => TAG <attribute> to match on (omit: defaults to "id")
//     # has(value:String|RegExp)
//       # => TAG attribute contains <value> to match on
//     # as(attribute:String)
//       # => TAG <attribute> to replace into
//     # use(key:String|Function)
//       # => JSON <key> whichs value the TAGs innerHTML is set to
//       #    (typeof key ==='function') ? key(data, value, tagbody)
//     # insert(key:String)
//       # => JSON <key> whichs value the TAG attribute is set to

//     # remove()
//       # => Matched TAG is removed from template
//     # partial(html:HTMLstring|String|Filename, data:JSON|String, map)
//       # => ???
//         # html - new template to be added | id of DOM node whichs innerHTML is the template
//         #         | in nodejs a relative path to file containing the template
//         # data - JSON | key for JSON of main template
//         # map  - data mapping for the partial (instance of Plates.Map())

//   # SYNTACTIC SUGAR
//     # is(attribute:String)
//       # === has(/^attribute$/)
//     # class(classname:String),
//     # className(classname:String)
//       # === where('class').is(classname)
//       # === where('class').has(/^classname$/)
//     # to(key:String)
//       # === use(key)
//     # append(html:HTMLstring|String|Filename, data:JSON|String, map)
//       # === partial(html, data, map)
