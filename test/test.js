(function(){
  var vows, at, concentric, Component, IExample, describe;
  vows = require('vows');
  at = require('vows-at');
  concentric = require('../');
  Component = concentric.Component;
  IExample = (function(){
    IExample.displayName = 'IExample';
    var prototype = IExample.prototype, constructor = IExample;
    prototype.instanceMethod = function(a, b){
      throw Error('unimplemented');
    };
    prototype.instanceMethodMiss = function(){
      throw Error('unimplemented');
    };
    IExample.staticMethod = function(a, b){
      throw Error('unimplemented');
    };
    IExample.staticMethodMiss = function(){
      throw Error('unimplemented');
    };
    function IExample(){}
    return IExample;
  }());
  describe = bind$(vows, 'describe');
  describe('Component interfaces').addBatch({
    "when the class implements the interface": {
      topic: function(){
        var Right;
        return Right = (function(superclass){
          var prototype = extend$((import$(Right, superclass).displayName = 'Right', Right), superclass).prototype, constructor = Right;
          prototype.instanceMethod = function(a, b){};
          prototype.instanceMethodMiss = function(){};
          Right.staticMethod = function(a, b){};
          Right.staticMethodMiss = function(){};
          function Right(){
            Right.superclass.apply(this, arguments);
          }
          return Right;
        }(Component));
      },
      '`implements` should return true': at(function(){
        return this.isTrue(function(it){
          return it['implements'](IExample, false);
        });
      })
    },
    "when the class doesn't implement the interface": {
      topic: function(){
        var Wrong;
        return Wrong = (function(superclass){
          var prototype = extend$((import$(Wrong, superclass).displayName = 'Wrong', Wrong), superclass).prototype, constructor = Wrong;
          prototype.instanceMethod = function(a){};
          Wrong.staticMethod = function(a){};
          function Wrong(){
            Wrong.superclass.apply(this, arguments);
          }
          return Wrong;
        }(Component));
      },
      '`implements` should return false': at(function(){
        return this.isFalse(function(it){
          return it['implements'](IExample, false);
        });
      })
    }
  })['export'](module);
  describe('Component getters, setters and merge').addBatch({
    "A new component is created": {
      topic: function(){
        return new Component({
          firstname: 'foo',
          lastname: 'bar',
          colors: {
            grey: '#333333',
            green: '#448800'
          }
        });
      },
      '`get` should return the property': at(function(){
        return this.equal(function(it){
          return it.get('firstname');
        }, 'foo');
      }),
      '`merge` should merge the properties': at(function(){
        var newGrey;
        newGrey = '#555555';
        this.topic.merge({
          colors: {
            grey: newGrey
          }
        });
        return this.equal(function(it){
          return it.get('colors').grey;
        }, newGrey);
      })
    }
  })['export'](module);
  function bind$(obj, key, target){
    return function(){ return (target || obj)[key].apply(obj, arguments) };
  }
  function extend$(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
