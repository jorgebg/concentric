Concentric
=======

> Improves OOP with interfaces and base classes

Introduction
------------
This library should be used with [LiveScript](http://livescript.net) or [CoffeeScript](http://coffeescript.org).

Example
--------

Here is a simple example written in `LiveScript`:

```livescript
require! {
  concentric.Component
}


class IExample
  instance-method: (a, b) ->
  instance-method-miss: ->
  @static-method = (a, b) ->
  @static-method-miss = ->

class Example extends Component
  instance-method: (a, b) ->
  instance-method-miss: ->
  @static-method = (a, b) ->
  @static-method-miss = ->
  @implements IExample #Ensure it implements IExample. If it is not implemented an error is throwed

example = new Example
example.set firstname: \foo lastname: \bar colors: {
  grey: \#333333
  green: \#448800
}
example.get \firstname #foo
example.merge colors: grey: \#555555
example.get \colors #{ grey: \#555555 green: \#448800 }


```

For more examples check the `test` folder.