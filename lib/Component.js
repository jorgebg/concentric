(function(){
  var Component, toString$ = {}.toString;
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
    prototype.merge = function(source, target){
      var i$, ref$, len$, key, oldValue, newValue, isObject, ref1$, setter, results$ = [];
      source == null && (source = {});
      target == null && (target = this);
      for (i$ = 0, len$ = (ref$ = Object.keys(source)).length; i$ < len$; ++i$) {
        key = ref$[i$];
        oldValue = target[key];
        newValue = source[key];
        isObject = typeof newValue === (ref1$ = typeof oldValue) && ref1$ === 'object';
        if (isObject) {
          results$.push(this.merge(newValue, oldValue));
        } else {
          setter = target.set != null
            ? bind$(target, 'set')
            : fn$;
          results$.push(setter(key, newValue));
        }
      }
      return results$;
      function fn$(k, v){
        return target[k] = v;
      }
    };
    prototype['implements'] = function(itf, ensure){
      ensure == null && (ensure = true);
      return constructor['implements'](itf, ensure);
    };
    Component.implement = function(itf){
      importAll$(this, itf);
      if (typeof itf === 'function') {
        return importAll$(this.prototype, itf.prototype);
      }
    };
    return Component;
  }());
  Component['implements'] = function(itf, ensure){
    ensure == null && (ensure = true);
    return require('./implements')(this, itf, ensure);
  };
  function bind$(obj, key, target){
    return function(){ return (target || obj)[key].apply(obj, arguments) };
  }
  function importAll$(obj, src){
    for (var key in src) obj[key] = src[key];
    return obj;
  }
}).call(this);
