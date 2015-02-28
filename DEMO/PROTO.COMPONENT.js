// var LikeButton = React.createClass({
//   getInitialState: function() {
//     return {liked: false};
//   },
//   handleClick: function(event) {
//     this.setState({liked: !this.state.liked});
//   },
//   render: function() {
//     var text = this.state.liked ? 'like' : 'unlike';
//     return (
//       <p onClick={this.handleClick}>
//         You {text} this. Click to toggle.
//       </p>
//     );
//   }
// });
function require() { return '<p>You <span>text</span> this. Click to toggle.</p>'; }
// wub chibbi chibbi chib chib chow
function LikeButton (CONTAINER, DATA) { // COLLECTION, SCHEMA
  function transform (STATE) { return STATE ? 'liked' : 'unliked'; }
  // DEPs = SDK = ...all needed require(...)'s
  var
    x         = document.createDocumentFragment(),
    // CONTAINER - maybe for event delegation
    // POTENTIALS - context in which to move around (it's options visible to user)
    COMPONENT = (x.innerHTML=require('./index.template.html'),x.childNodes[0]),
    __liked   = COMPONENT.querySelector('span')
  ;
  // INIT State
  __liked.innerHTML = transform(DATA.liked || false); }

  // ON System Input -> ACT as needed
  //  - ....
  DATA.on('change', function (key, STATE) {
    if (key === 'like') {
      __liked.innerHTML = transform(STATE); }
  });

  // ON User Input -> DISPATCH EVENTs as needed
  //  - dispatching events 'notifies', so that 'hooks' (calling components api) ca be done if needed
  COMPONENT.addEventListener('click', function(e) { // events + handlers
    e.preventDefault(); e.cancelBubbeling(); e.stopPropagation();
    DATA.emit('__liked', transform(!STATE)); // dont change component, instead emit change and wait for DATA.on...
    // var eventAdd = new CustomEvent('ADD', SDK.EVENTS['ADD'](max_length + 1));
    // COMPONENT.dispatchEvent(eventAdd);
  });

  // Initial Render
  CONTAINER.appendChild(x);

  // return API;
};
///////////////////
// USAGE
// React.renderComponent(<LikeButton />,document.getElementById('example'));
LikeButton(document.getElementById('example'), {});




////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
var
  USER        = params.USERAUTH,
  CONTAINER   = params.CONTAINER,
  DATA        = params.SET.DATA,
  COLLECTION  = params.SET.COLLECTION,
  SCHEMA      = params.SET.SCHEMA,
  MISC        = params.MISC
;
// IMPORTS: SOFTWARE DEVELOPER KIT = DEPENDENCIES = DEPs
      var SDK = {
        EVENTS: {
          'CANCEL'    : function () {
            return new CustomEvent('CANCEL', { detail: {
              description: COMPONENT.API.EVENTS['CANCEL']
            }}); // @TODO: test - new event gets copy of message
          },
          'SAVE'      : function (DATA) {
            return new CustomEvent('SAVE', { detail: {
              description: COMPONENT.API.EVENTS['SAVE'],
              data: DATA
            }}); // @TODO: test - new event gets copy of message
          }
        }
      }

// EXPORTS: APPLICATION PROGRAMMING INTERFACE
      COMPONENT.API = {
        // INPUT INTERFACE
        INTERFACE: {
          'USER_SET'  : function (DATA) { // @TODO: test this methods intensively
            TEMP_ID   = DATA.id;
            fillForm(DATA);
          },
          'USER_ADD'  : function (ID) { // @TODO: test this methods intensively
            TEMP_ID   = ID;
            TEMP_DATA = undefined;
            fillForm({});
          }
        },
        // OUTPUT INTERFACE
        EVENTS  : {
          'CANCEL'  : 'DESCRIPTION: user did not provide any input and aborted',
          'SAVE'    : 'DESCRIPTION: user provided data which should be made persistent'
        }
      };


      ////////////////////////////////////////////////////////////////////////////////////////
      module.exports = {
        VERSION                   : 'v0.0.19', // 'v' + require('package.json').version
        NAME                      : 'RainbowUnicorn',
        VALIDATE					: function VALIDATE (params) { return true; },
        INIT  					: INIT
      };

      ////////////////////////////////////////////////////////////////////////////////////////

      // INTERFACE STORAGE
      COMPONENT.API = {
        // INPUT INTERFACE
        INTERFACE     : { // add, set, get, end
          add: function (item) {
            if (!item) return;
            // @TODO: check SCHEMA !!!!
            // => 1. every field has to be STRING
            // => 2. empty/undefined fields have to be 'empty string'
            max_length++;
            item.id = max_length;
            dynaRecords.push(item);
            dynatable.process();
            return item;
          },
          set: function (id, updates) {
            // @TODO: check SCHEMA !!!!
            // => 1. every field has to be STRING
            // => 2. empty/undefined fields have to be 'empty string'
            if (!updates) return;
            var item = _findByID(id);
            if (!item) { COMPONENT.API.INTERFACE.add(updates); } // @TODO: test this intensively
            _updateItem(item, updates);
            dynatable.process();
            return item;
          },
          get:    function (id) {
            return _findByID(id);
          },
          end: function (id) {
            var item = _findByID(id);
            if (item) {
              var position = dynaRecords.indexOf(item);
              // http://stackoverflow.com/questions/18347033/how-to-shorten-my-conditional-statements/18347047#answer-18347047
              if ( ~position ) { dynaRecords.splice(position, 1); }
              dynatable.process();
              return item;
            }
          }
        },
        // OUTPUT INTERFACE
        EVENTS  : {
          'ADD' : 'DESCRIPTION: Get User Data and call "ADD" API of Dynatable',
          'SET' : 'DESCRIPTION: Get Update Data from user and call "SET" API of Dynatable',
          'GET' : 'DESCRIPTION: Call "GET" API of Dynatable and show data to user',
          'END' : 'DESCRIPTION: Call "END" API of Dynatable with id specified by user to delete'
        }
      };
      // SOFTWARE DEVELOPER KIT
      var SDK = {
        EVENTS: {
          'ADD'    : function (ID) {
            return new CustomEvent('ADD', { detail: {
              description: COMPONENT.API.EVENTS['ADD'],
              data: { id: ID}
            }}); // @TODO: test - new event gets copy of message
          },
          'SET'      : function (DATA) {
            return new CustomEvent('SET', { detail: {
              description: COMPONENT.API.EVENTS['SET'],
              data: DATA
            }}); // @TODO: test - new event gets copy of message
          },
          'GET'    : function (DATA) {
            return new CustomEvent('GET', { detail: {
              description: COMPONENT.API.EVENTS['GET'],
              data: DATA
            }}); // @TODO: test - new event gets copy of message
          },
          'END'    : function (DATA) {
            return new CustomEvent('END', { detail: {
              description: COMPONENT.API.EVENTS['END'],
              data: DATA
            }}); // @TODO: test - new event gets copy of message
          }
        }
      }

      (function ($config) {
        "use strict";
        var x     = 5
        ,   y     = 7
        ,   z     = 8
        ,   init  = function ($config) {
            // Put my code here
              var local1 = $config.local1
              ,   local2 = $config.local2
              ,   local3 = $config.local3
              ;
              x = 9;
              y = 10 + local3;
              z = 11;
              $config.local4 = x + y + z;
            }
        ;
        init($config);
      })(module.exports = { local1 : 5, local2 : 6, loca3 : 3 });
      ///////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////
      (function ($config) {
        "use strict";
        var x     = 5
          , y     = 7
          , z     = 8
          , init  = function ($config) {
            // Put my code here
              var local1 = $config.local1
                , local2 = $config.local2
                , local3 = $config.local3
              ;
              x = 9;
              y = 10 + local3;
              z = 11;
              $config.local4 = x + y + z;
            }
         ;
        init($config);
      })(module.exports = { local1 : 5, local2 : 6, loca3 : 3 });
      ///////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////
      (function ($config) {
        "use strict";
        var x     = 5,
            y     = 7,
            z     = 8,
            init  = function ($config) {
            // Put my code here
              var local1 = $config.local1,
                  local2 = $config.local2,
                  local3 = $config.local3;
              x = 9;
              y = 10 + local3;
              z = 11;
              $config.local4 = x + y + z;
            };
        init($config);
      })(module.exports = { local1 : 5, local2 : 6, loca3 : 3 });
