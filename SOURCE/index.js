module.exports = MODULE_holon;

var Plates = require('plates');

MODULE_holon.NAME    = require('../package.json').name.toUpperCase();
MODULE_holon.VERSION = 'v' + require('../package.json').version;

function MODULE_holon () {
  return {
    Plates: Plates,
    holonize: {}
  };
} 
