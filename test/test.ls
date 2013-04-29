require! {
  vows
  at: \vows-at
  concentric: '../'
}

{ Component } = concentric

class IExample
  instance-method: (a, b) -> ...
  instance-method-miss:   -> ...
  @static-method = (a, b) -> ...
  @static-method-miss =   -> ...

describe = vows~describe

describe 'Component interfaces'
  .add-batch {
    "when the class implements the interface":
      topic: ->
        class Right extends Component
          instance-method: (a, b) ->
          instance-method-miss:   ->
          @static-method = (a, b) ->
          @static-method-miss =   ->
      '`implements` should return true': at -> @is-true (.implements IExample, false)
    
    "when the class doesn't implement the interface":
      topic: ->
        class Wrong extends Component
          instance-method: (a) ->
          @static-method = (a) ->
      '`implements` should return false': at -> @is-false (.implements IExample, false)
  }
  .export module

describe 'Component getters, setters and merge'
  .add-batch {
    "A new component is created":
      topic: ->
        new Component firstname: \foo lastname: \bar colors: {
          grey: \#333333
          green: \#448800
        }
      '`get` should return the property': at ->
        @equal (.get \firstname ), \foo
      '`merge` should merge the properties': at ->
        new-grey = \#555555
        @topic.merge colors: grey: new-grey
        @equal (.get \colors .grey ), new-grey
  }
  .export module


