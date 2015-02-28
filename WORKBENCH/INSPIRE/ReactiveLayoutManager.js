<head>
 <title> bla </title>
</head>

<body>
  {{ myComponent }}
</body>

<template name='myComponent'>
  <h1> hello </h1>
  {{ greeting }}
</template>

<script>
  Template.myComponent(
    { greeting: function () {
        return "welcome to this and that";
      }
    });
</script>
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
(function() {
    document.registerElement('my-element', {
        prototype: element
    });
    // VS.
    COMPONENT.register('my-element', {
        lifecycle: {
            // Fires when an instance of the element is created
            created: function() {
              // Creates an object based in the HTML Element prototype
              var element = Object.create(HTMLElement.prototype);
              // Fires when an instance of the element is created
              element.createdCallback = function() {};
            },
            // Fires when the elementâs initial set of children and siblings are guaranteed to exist
            domReady: function() {},
            // Fires when the "<polymer-element>" has been fully prepared
            ready: function() {},
            // Fires when an instance was inserted into the document
            inserted: function() {
              // Fires when an instance was inserted into the document
              element.attachedCallback = function() {};
            }, //attached
            // Fires when an instance was removed from the document
            removed: function() {
              // Fires when an instance was removed from the document
              element.detachedCallback = function() {};
            }, // detached
            // Fires when an attribute was added, removed, or updated
            attributeChanged: function(attr, oldVal, newVal) {
              // Fires when an attribute was added, removed, or updated
              element.attributeChangedCallback = function(attr, oldVal, newVal) {};
            }
        },
        events: {},
        accessors: {},
        methods: {}
    });
}());
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
define([
    // CORE LIBRARY DEPENDENCIES
    'underscore'
], function (
    // CORE LIBRARY DEPENDENCIES
    _ // underscore
) {
    'use strict';
    return function (
    /* * * * * * * *
     * HOW TO USE:
     * * * * * * * */
        WIDGET_NAME,
        /*******************************
            => String
            Gives the WIDGET its name
            (e.g. 'MyButton')
         *******************************/
        INITIAL_UI_STATE,
        /*******************************
            => String
            Gives the WIDGET initial UI State a name
            (e.g. 'unpressed' or '' [if initial UI state has no relevant name])
         *******************************/
        TEMPLATE,
        /*******************************
            => TPL (Underscore Template)
            an underscore template
            (e.g. <button><%= actionName %></button>)
         *******************************/
        SETUP_SUBWIDGETS, // @deprecated - probably unnecessary method
        /*******************************
            => function (o) -> function() -> void
            a function which will be executed in Backbone's "initialize" function to setup things as you wish
            (e.g function() { o.PRIVATE_SCOPE.X = 5; })
         *******************************/
        EVENTS, // 1. INBOUND - Communication: User -> WIDGET
        /*******************************
            => function("HANDLERS(o)") { 'EVENT_1' : o.HandlerA , ... , 'EVENT_M' : o.HandlerZ }
            an object which defines Backbone Events and the Handlers which will be called if they occur
            (e.g. { 'click' : o.HANDLERS.onClick })
         *******************************/
        HANDLERS,
        /*******************************
            => { 'Handler1' : function(o) -> function(event) -> void , ... , 'HandlerN' : function(o) -> function(event) -> void }
            all the Handlers you use for handling events as defined in (5.)
            (e.g. { onClick : function { o.PRIVATE_SCOPE.X = o.PRIVATE_SCOPE.X + 2; } })
         *******************************/
        CUSTOM_SERIALIZER,
        /*******************************
            => function (o) -> function() -> void
            the method, which returns an object which contains all the properties used in its template
            (e.g. function () { return { actionName : 'Increase Counter'}; })
         *******************************/
        REFRESH_HOOK, // 2. INBOUND - Communication: System -> WIDGET
        /*******************************
            => function (o) -> function() -> void
            the method in which you can specify what should happen if the system sends an update to the widgets model
            (e.g. function (property) { if(property === 'X') o.PRIVATE_SCOPE.myAlert('Counter has been increased ' + o.PRIVATE_SCOPE.X + ' times.'); })
         *******************************/
        SET_UI_STATE_HOOK, // useful to communicate with child widgets
        /*******************************
            => function (o) -> function() -> void
            the method in which you can specify what should happen if the UI State of the widget was changed
            (e.g. function (newState) { if(newState === 'pressed') PRIVATE_SCOPE.consoleLog('someone pressed me'); })
         *******************************/
        INTERNALS
        /******************************* // PRIVATE_CONSTANT_VALUES
            => { 'prop1' : function(o) -> function(...) -> void , ... , 'propN' : function(o) -> function(...) -> void }
            an object which contains all the private properties (functions and variables) a widget instance has access to
            (e.g. { Y: 0, X: 0, consoleLog: function (x) { console.log(x); }, myAlert: function (x) { alert(x); } })
         *******************************/
        /******************************* // PRIVATE_MODEL_BOUND_VALUES
            => { 'prop1' : function(o) -> function(...) -> void , ... , 'propN' : function(o) -> function(...) -> void }
            an object which contains all the private properties (functions and variables) a widget instance has access to
            (e.g. { Y: 0, X: 0, consoleLog: function (x) { console.log(x); }, myAlert: function (x) { alert(x); } })
         *******************************/
    ) {
        /* * * * * * * * * * * * * * * * * * * * *
         * WIDGET INTERNAL API
         *
         * Structure of function parameter "o" (FROM ABOVE),
         * which is in closure scope of returned "function() -> void"
         *
         * Contains:
         *  HANDLERS, HELPERS & HOOKS which were passed into WIDGET(...)
         *
         * * * * * * * * * * * * * * * * * * * * */

        var privateScopes = { };

        function getPrivateScope(id) {
            if (privateScopes[id]) {
                return privateScopes[id];
            }
            var _api = { };
            // C1. WIDGET INTERNAL INTERFACE
            _api.ID         = id;
            _api.GIVEN_MODEL= { };  // "= this.options.model;" set in Backbones "this.attributes" @ creation time , should be _parameters _currentState
            _api.TEMPLATE   = TEMPLATE;
            _api.VIEW       = { };  // "= this;"         set in Backbones "this.attributes" @ creation time
            _api.DOM        = { };  // "= this.$el;"     set in Backbones "this.initialize" @ creation time
            _api.DATA_STATE = { };  // "= this.options;" set in Backbones "this.attributes" @ creation time , should be _parameters _currentState
            _api.UI_STATE   = INITIAL_UI_STATE;
            _api.SUBWIDGETS;        // "= { ... }"       set in Backbones "this.attributes" @ creation time , should be many functions to communicate with subWidgets
            // C2. WIDGET INTERNALS CUSTOM
            _api.NAME       = WIDGET_NAME;
            _api.INTERNALS  = INTERNALS(_api); // PRIVATE_CONSTANT_VALUES and PRIVATE_MODEL_BOUND_VALUES, HELPERS, ...


            // A1. INBOUND - Communication: User -> WIDGET
            _api.userHandlers  = HANDLERS(_api);


            // A2. INBOUND - Communication: System -> WIDGET
            _api._systemHandler = (function(_customizedSystemHandler) {
                return function (updatedProperty, model, newValue) {
                            // CUSTOM WIDGET METHODS
                            // @TODO - This method could be used by parent widgets (e.g. EditableText)
                            //         in order to indicate whether text/field is in edit mode or not.
                            //         BUT: A more 'decoupled' mechanism would be nice
                            //         -> Maybe: A 'Backbone Model' for UI State would be cool,
                            //            thus widgets could listen for changes, but still,
                            //            a global UI State Model isnt necessary.

                            // BBapi.selectField      = // will be in ClosureScope and accessible through "UI state model parent-widget"
                    if (newValue) {
                        _api.DATA_STATE[updatedProperty].now = newValue;                // _parameters[property].now = newValue;
                        _api.VIEW.render();
                    }
                    var postBox    = 'info:'+_api.ID+':(.+)';
                    var info = new RegExp(postBox).exec(updatedProperty);
                    if(info) {
                        _customizedSystemHandler(info);
                    }
                };
            })((REFRESH_HOOK) ? REFRESH_HOOK(_api) : function() { });


            // B1. OUTBOUND - Communication: WIDGET -> System
            _api._informSystem  = function(key, value) {
                // Remove if/else comments if the function doesnt trigger an infinite loop:
                // (Could a "Change Model" go into an 'infinite loop', because the widget will receive the update itself ???)
                if(value) {
                    if (_api.GIVEN_MODEL.get(key) !== value) {
                        _api.GIVEN_MODEL.set(key, value);
                    } else {
                        _api.GIVEN_MODEL.trigger('change:'+key, _api.GIVEN_MODEL, value)
                        console.log('nonchanged valued triggers modelchange and goes into infinite loop. Do something about it!!!');
                        // _parameters.model.trigger('change:'+_parameters.text.update, _parameters.model.now, value);
                    }
                } else {
                    _api.GIVEN_MODEL.trigger('info:'+_api.ID+':'+key, _api.GIVEN_MODEL); // uses BackBones View ID's
                }
                console.log(_api.ID + ' triggered change to model ' + _api.GIVEN_MODEL.cid);
            };


            // B2. OUTBOUND - Communication: WIDGET -> User
            _api._informUser    = (function(_customizedInformUser) {
                return function (newState) {
                    if (_api.UI_STATE !== newState) {
                        _api.DOM
                        .removeClass(WIDGET_NAME+'--STATUS='+_api.UI_STATE)
                        .addClass(WIDGET_NAME+'--STATUS='+newState);
                        _api.UI_STATE = newState;
                        _customizedInformUser(newState); // widget internal, should be _setUIstate, _setState, changeUIstate
                    }
                };
            })((SET_UI_STATE_HOOK) ? SET_UI_STATE_HOOK(_api) : function() { });

            // COMPLETELY DESTROY A VIEW // @TODO: If necessary, _api[id] should be deleted too
            // destroy_view: function() {
            //     // var id = this.cid;
            //     // _api[id] = undefined;
            //     // ... ??? ...
            //     //COMPLETELY UNBIND THE VIEW
            //     this.undelegateEvents();
            //     this.$el.removeData().unbind();
            //     //Remove view from DOM
            //     this.remove();
            //     Backbone.View.prototype.remove.call(this);
            // }
            privateScopes[id] = _api;
            return _api;
        }

        /* * * * * * * * * * * * * * * * * * * * *
         * WIDGET DEFINITION - WIDGET EXTERNAL API
         * * * * * * * * * * * * * * * * * * * * */
        var API              = { };
        // C. WIDGET EXTERNAL INTERFACE
        API.attributes       = function () { // Configure Widget Style and State
            var _api = getPrivateScope(this.cid);
            _api.GIVEN_MODEL                 = this.options.model;
            _api.VIEW                  = this;                   // set @ creation time
            _api.DATA_STATE            = this.options;           // @TODO - exclude MODEL property
            _api.SUBWIDGETS            = SETUP_SUBWIDGETS(_api.GIVEN_MODEL, _api.DATA_STATE); // communicate with "subwidgets" through "mediatormodel.trigger('info:widgetAdress:message');

        // A1. INBOUND - Communication: User -> WIDGET
            API.events                 = EVENTS(_api.userHandlers);      // uses "events" -> "userHandlers"
            // SETUP INBOUND - Communication: System -> WIDGET
            for (var field in _api.DATA_STATE) { // <= DEFAULT
                if(_api.DATA_STATE.hasOwnProperty(field) && _api.DATA_STATE[field].update) {
                    var updateSource  = _api.DATA_STATE[field].update;
                    _api.GIVEN_MODEL.on('change:'+updateSource, _api._systemHandler.bind(this, field)); // RECEIVE UPDATES
                }
            }
            // if(_parameters.model.get(key) !== value) {
            //     _parameters.model.set(key, value);
            // } else {
            //     _parameters.model.trigger('change:'+_parameters.text.update, _parameters.model.now, value);
            // }
            var widgetName  = 'widget_'+ WIDGET_NAME;
            var initialStateName = (INITIAL_UI_STATE) ? '  '+widgetName+'--STATUS='+INITIAL_UI_STATE : '';
            var basicName = widgetName+initialStateName;
            return {
                class : _.reduce(_api.DATA_STATE.variants.now, function (classes, variant) {
                    return classes+'  '+widgetName+'--VARIANT='+variant;
                }, basicName /*, this*/)
            };
        };
        API.render             = function () {
            var _api = getPrivateScope(this.cid);
            _api.DOM.html(_.template(_api.TEMPLATE, _api.VIEW.serialize() ));
            var subwidgetContainer, subwidgetDOM;
            for (var parentElementSelector in _api.SUBWIDGETS) {
                if(_api.SUBWIDGETS.hasOwnProperty(parentElementSelector)) {
                    subwidgetContainer = _api.DOM.find(parentElementSelector);
                    subwidgetDOM       = _api.SUBWIDGETS[parentElementSelector].render();
                    subwidgetContainer.html(subwidgetDOM);
                }
            }
            return _api.DOM;
        };
        API.initialize       = function () {
            var _api = getPrivateScope(this.cid);
            _api.DOM = this.$el;
        };
        // B2. OUTBOUND - Communication: WIDGET -> User
        API.serialize        = function () {           // used by "informUser" -> "render" -> "serialize"
            var _api = getPrivateScope(this.cid);
            var temp;
            if(CUSTOM_SERIALIZER && typeof CUSTOM_SERIALIZER === 'function') {
                temp = CUSTOM_SERIALIZER(_api.DATA_STATE);
                if (typeof temp === 'function') {
                    temp = temp();
                    if (temp !== undefined) {
                        return temp;
                    }
                }
            }
            return _api.GIVEN_MODEL.toJSON();
        };
        return API;
    }
});

/////////////////////// EXAMPLE WIDGET TEMPLATE //////////////////////////
/*
define([
    // WIDGET TEMPLATE
    'text!./myWidget.tpl',
    // SUBWIDGETS
    // - no subwidget dependencies
    // WIDGET CREATOR
    '../BaseWidget'
], function (
    // WIDGET TEMPLATE
    myWidgetTemplate,
    // SUBWIDGETS
    // - no subwidget dependencies
    // WIDGET CREATOR
    WIDGET
) {
    'use strict';
    // WIDGET DEFINITION
    return Backbone.View.extend(
        WIDGET(
            /* WIDGET_NAME      / 'myWidgetName',
            /* INITIAL_UI_STATE / '',  // e.g. 'readOnly'
            /* TEMPLATE         / myWidgetTemplate,
            function SETUP_SUBWIDGETS (CustomForm) {

            },
            function EVENTS (CustomPlanHANDLERS) {
                return { };
            },
            function HANDLERS (CustomPlan) {
                return {
                    _onClickHandler: function(event) {
                    },
                    _myOtherHandler: function(event) {
                    }
                };
            },
            function CUSTOM_SERIALIZER(CustomPlan) {
                return function () { };
            },
            function REFRESH_HOOK(CustomPlan) {
                return function (updatedProperty) { };
            },
            function SET_UI_STATE_HOOK(CustomPlan) {
                return function (newUIstate) { };
            },
            function INTERNALS(CustomPlan) {
                return {
                    _myHelper: function() { },
                    CONSTANT : 'myConstant'
                }
            }
        ); // => Returns an Object to feed into "Backbone.View.extend(...)"
    );
});
*/
