require! {
  vows
  at: \vows-at
  concentric: '../'
}

{ Component } = concentric

class IExample
  instance-method: (a, b) ->
  instance-method-miss: ->
  @static-method = (a, b) ->
  @static-method-miss = ->

describe = vows~describe
describe 'Component'
  .add-batch {
    "when the class implements the interface":
      topic: ->
        class Right extends Component
          instance-method: (a, b) ->
          instance-method-miss: ->
          @static-method = (a, b) ->
          @static-method-miss = ->
      '`implements` should return true': at -> @is-true (.implements IExample, false)
    
    "when the class doesn't implement the interface":
      topic: ->
        class Wrong extends Component
          instance-method: (a) ->
          @static-method = (a) ->
      '`implements` should return false': at -> @is-false (.implements IExample, false)
  }
  .export module

#TODO test full Component methods (set, get, merge, etc)