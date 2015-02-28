// EVENT
// http://www.2ality.com/2013/06/triggering-events.html
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent


// add an appropriate event listener
obj.addEventListener("cat", function(e) { process(e.detail) });

// create and dispatch the event
var event = new CustomEvent("cat", {"detail":{"hazcheeseburger":true}});
obj.dispatchEvent(event);


// click="player:move"
// player: category (subject/noun) ... or maybe "COMPONENT" ?
// Any app-wide 'move' listener can read it from the event.category property.

// OBJECT.METHOD
// COMPONENT.BEHAVIOR

/// POLYFILL
(function () {
  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   };

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();


// <events
//   data-test="function1"
//   data-test-params="param1 param2 param3"
//   data-print="function2"
//   data-print-params="param1 param2"
// >
// </events>

  EVENT BUS = MESSAGE BROKER
  http://en.wikipedia.org/wiki/Data_distribution_service
  // Most Data Distribution Service (DDS) do not use a broker in the middle. Instead, each publisher and subscriber in the pub/sub system shares meta-data about each other. The publisher and the subscribers cache this information locally and route messages based on the discovery of each other in the shared cognizance.

  /////////////////////////////////////////
  https://gist.github.com/addyosmani/1837327
  http://tech.pro/blog/1402/five-patterns-to-help-you-tame-asynchronous-javascript
    // look @ EventEmitter EventEmitter2 monologue.js
  events = {
    'data-test'        : 'function1',
    'data-test-params' : "param1 param2 param3",
    'data-print'       : 'function2',
    'data-test-params' : "param1 param2",
  };

  events.on('test',     function function1 (param1, param2, param3) {});
  events.on('print',    function function2 (param1, param2) {});
  events.emit('test',   { param1:'',param2:'',param3:''});
  events.emit('print',  { param1:'',param2:''});

  events.off('test');
  events.off('print');

    // Look @ Mediator Event_Aggregator Client_Side_Message_Broker

  // COMMANDS and other things through OBSERVERS
  http://patterns.instantinterfaces.nl/current/Refactoring-and-Design-Patterns-PAT-OBS.html
  http://patterns.instantinterfaces.nl/current/Refactoring-and-Design-Patterns-PAT-EVTS-BAS.html






// http://tech.pro/blog/1402/five-patterns-to-help-you-tame-asynchronous-javascript
//1. What if we don't want to keep passing a callback each time we invoke the target method?
//2. What if we wanted our own callback to be invoked if another piece of calling code also invoked the target method?
// http://en.wikipedia.org/wiki/Observer_pattern


// - Observers must have a direct reference to the subject.
// - Subjects are responsible for maintaining the internal state of subscriber callbacks
// - JavaScript implementations of this pattern usually involve subscriber callback method signatures
//    of 0-n arguments (in other words, every event could have a different signature).


///////////////////////////////////////////////
// PUSH - OPT OUT
broadcast -> received by all
groupSend -> received by adresslist
send      -> received by adress

contracted* -> received by (see above) // OPT OUT only when contract is nil

// PUSH - OPT IN
emit          -> received by followers
emitRestrict  -> received by acceptedFollowers



//// OBSERVER PATTERN - PUBLISH/SUBSCRIBE
// Observed Objects do not know that they are observed

Or, if it is implemented using the observer pattern the button would say "Hey, observers (which would include the mediator), my state changed (someone clicked me)."

The Observer pattern is used when an action taken on one class (the observed class) needs to produce a reaction in another class (the observing class) but it is undesirable for the observed class to be coupled to the observing class.


//// MEDIATOR PATTERN
// Bus System Like Communication

The Mediator pattern is an encapsulation of a pattern of usage of a set of objects. Client code is only coupled to the mediator, instead of being coupled to multiple other classes.

// Why don’t we call an event aggregator a mediator?
// The answer largely comes down to where the application logic and workflow is coded.

// EVENT AGGREGATOR
An event aggregator has no logic, other than forwarding events from a publisher to a subscriber.
The event aggregator itself is a third-party to the event publisher and the event subscriber.
It acts as a central hub for events to pass through


  events: {
    "click .thatThing": "clickedIt"
  },



In this example, when the MenuItem with the right model is clicked, the “menu:click:foo” event will be triggered. An instance of the “MyWorkflow” object, assuming one is already instantiated, will handle this specific event and will coordinate all of the objects that it knows about, to create the desired user experience and workflow.



///////// EXAMPLES
$("#mainArticle").on("click", function(e){

  // handle the event that any element underneath of our #mainArticle element

});

//////
var View1 = Backbone.View.extend({
  // ...

  events: {
    "click .foo": "doIt"
  },

  doIt: function(){
    // trigger an event through the event aggregator
    Backbone.trigger("some:event");
  }
});

var View2 = Backbone.View.extend({
  // ...

  initialize: function(){
    // subscribe to the event aggregator's event
    Backbone.on("some:event", this.doStuff, this);
  },

  doStuff: function(){
    // ...
  }
})


/////////

For example, let objects B and C observe object A. When object A fires event X, then object B should execute method Y() and object C should execute method Z(). If methods B.Y() and C.Z() are totally independent and require no coordination, then go ahead and use the observer pattern.

On the other hand, if B.Y() must be executed before C.Z() then you will want to use the Mediator pattern where the mediator encapsulates this coordination. In this scenario, mediator M would observe object A and would have references to objects B and C. When A fires event X, M will handle the event and call B.Y() and C.Z() in the prescribed order.


OBSERVER vs FACADE vs MEDIATOR
Observer: Use when one objects wants to be informed of state changes in another (strictly speaking, using events is Observer)

In order to understand mediator, I find it easier when you consider Facade first: Facade aggregates the functionality of separate classes (entire subsystems sometimes) and provides that functionality in a single interface.

Mediator: Same as Facade, except that it combines the functionality of all of the aggregate classes to produce new functionality. (Good explanation here)


////
</script>
