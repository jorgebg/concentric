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
      return this.constructor['implements'](itf, ensure);
    };
    Component['implements'] = function(itf, ensure){
      var interfaces, ref$, ref1$, errors, checks, type, target, source, key, value, targetValue, sourceValue, error, implemented;
      ensure == null && (ensure = true);
      interfaces = (ref1$ = (ref$ = this['implements']).interfaces) != null
        ? ref1$
        : ref$.interfaces = [];
      if (in$(itf, interfaces)) {
        return true;
      }
      errors = [];
      checks = {
        'class': [this, itf],
        object: [this.prototype, itf.prototype]
      };
      for (type in checks) {
        ref$ = checks[type], target = ref$[0], source = ref$[1];
        for (key in source) {
          value = source[key];
          targetValue = target[key];
          sourceValue = source[key];
          error = (fn$());
          if (error) {
            errors.push("The " + type + " property " + this.displayName + "." + key + " " + error + ".");
          }
        }
      }
      implemented = errors.length === 0;
      if (implemented) {
        if (!in$(itf, interfaces)) {
          interfaces.push(itf);
        }
      } else {
        if (ensure) {
          throw new Error(errors.join("\n"));
        }
      }
      return implemented;
      function fn$(){
        switch (false) {
        case !!targetValue:
          return "is not implemented";
        case typeof sourceValue !== 'function':
          switch (false) {
          case typeof targetValue === 'function':
            return "must be a function";
          case !(sourceValue.length > targetValue.length):
            return "arguments number must be >= " + sourceValue.length;
          }
        }
      }
    };
    Component.implement = function(itf){
      importAll$(this, itf);
      if (typeof itf === 'function') {
        return importAll$(this.prototype, itf.prototype);
      }
    };
    return Component;
  }());
  function bind$(obj, key, target){
    return function(){ return (target || obj)[key].apply(obj, arguments) };
  }
  function in$(x, arr){
    var i = -1, l = arr.length >>> 0;
    while (++i < l) if (x === arr[i] && i in arr) return true;
    return false;
  }
  function importAll$(obj, src){
    for (var key in src) obj[key] = src[key];
    return obj;
  }
}).call(this);
