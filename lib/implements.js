(function(){
  var toString$ = {}.toString;
  module.exports = this['implements'] = function(cls, itf, ensure){
    var cache, checks, errors, type, ref$, target, source, key, value, targetValue, sourceValue, error, implemented;
    ensure == null && (ensure = true);
    if (typeof cls === 'object') {
      cls = cls.constructor;
    }
    cache = (function(){
      var ref$, key$;
      switch (toString$.call(this.cache).slice(8, -1)) {
      case 'Object':
        return (ref$ = this.cache)[cls] || (ref$[cls] = []);
      case 'String':
        return cls[key$ = this.cache] || (cls[key$] = []);
      case 'Boolean':
        if (this.cache) {
          return cls['interfaces'] || (cls['interfaces'] = []);
        } else {
          return false;
        }
      }
    }.call(this));
    if (cache && in$(itf, cache)) {
      return true;
    }
    checks = {
      'class': [cls, itf],
      object: [new cls, new itf]
    };
    errors = [];
    for (type in checks) {
      ref$ = checks[type], target = ref$[0], source = ref$[1];
      for (key in source) {
        value = source[key];
        targetValue = target[key];
        sourceValue = source[key];
        error = (fn$());
        if (error) {
          errors.push("The " + type + " property " + cls.displayName + "." + key + " " + error + ".");
        }
      }
    }
    implemented = errors.length === 0;
    if (implemented) {
      if (cache && !in$(itf, cache)) {
        cache.push(itf);
      }
    } else if (ensure) {
      throw new Error(errors.join("\n"));
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
  /*
  switch typeof! @cache
    | \Object => cache = { cls: [ cache... ] } 
    | \String => cls[cache] = [ cache... ]
    | \Boolean => cls[\cache] ||= [ cache... ] # Default
  */
  this['implements'].cache = false;
  function in$(x, arr){
    var i = -1, l = arr.length >>> 0;
    while (++i < l) if (x === arr[i] && i in arr) return true;
    return false;
  }
}).call(this);
