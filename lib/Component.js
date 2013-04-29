(function(){
  var concentric, Component, toString$ = {}.toString;
  concentric = require('./');
  module.exports = Component = (function(){
    Component.displayName = 'Component';
    var prototype = Component.prototype, constructor = Component;
    function Component(config){
      config == null && (config = {});
      this.set(config);
    }
    prototype.set = function(keys, value){
      var type, i$, ref$, len$, key, results$ = [];
      value == null && (value = null);
      type = toString$.call(keys).slice(8, -1);
      switch (false) {
      case !(type === 'Object' && value === null):
        for (i$ = 0, len$ = (ref$ = Object.keys(keys)).length; i$ < len$; ++i$) {
          key = ref$[i$];
          results$.push(this.set(key, keys[key]));
        }
        return results$;
        break;
      case type != 'Number' && type != 'String':
        return this[keys] = value;
      default:
        throw new Error("Invalid key for property '" + keys + "'. The key must be a Number or a String.");
      }
    };
    prototype.get = function(key){
      return this[key];
    };
    prototype.merge = function(source){
      source == null && (source = {});
      return concentric.merge(this, source);
    };
    prototype['implements'] = function(itf, ensure){
      ensure == null && (ensure = true);
      return constructor['implements'](itf, ensure);
    };
    Component['implements'] = function(itf, ensure){
      ensure == null && (ensure = true);
      return concentric['implements'](this, itf, ensure);
    };
    Component.implement = function(itf){
      importAll$(this, itf);
      if (typeof itf === 'function') {
        return importAll$(this.prototype, itf.prototype);
      }
    };
    return Component;
  }());
  function importAll$(obj, src){
    for (var key in src) obj[key] = src[key];
    return obj;
  }
}).call(this);
