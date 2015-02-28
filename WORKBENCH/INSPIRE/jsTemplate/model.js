///////////////////////////// DATA
var DATA = [{ name: 'hij1nx',  title : 'code slayer' },
            { name: 'tmpvar', title : 'code pimp' }];


///////////////////////////// CONTAINER
var CONTAINER = document.querySelector('.Teaserbox') || '.Teaserbox';
var div = document.getElementById('div-item-data');

// HTML5 Convention
div.dataset = {
  name: div.getAttribute("data-item-name"),
  cost: div.getAttribute("data-item-cost"),
  id  : div.getAttribute("data-item-id")
};


///////////////////////////// TEMPLATE AJAX UPDATE
// And then, from a JS function, doing something like:
// article is an object probably from a JSON
var thing = getFromAjax('/thing');
requestcontainer.querySelector('.data-title').textContent=thing.title;
container.querySelector('.data-content').textContent=thing.content;
var tags = container.querySelector('.data-tags');
tags.innerHTML="";
thing.tags.forEach(function (tag) {
  tags.appendChild(document.createElement("li")).textContent=tag.name;
});


//// SUB COMPONENTS -->
// <!-- Partial included via {{>tags}} -->

// [path/to/Thing.html]
// <div class="Thing">
//   <div class="Thing__title"><!-- article.title --></div>
//   <div class="Thing__content"><!-- article.content --></div>
//   <div class="Thing__tags:Tag">
//     <!-- article.tags.each { |tag| -->
//       // ... <%= tag.name %>
//     <!-- } -->
//   </div>
// </div>
