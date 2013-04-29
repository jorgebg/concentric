require! {
  concentric: './'
}

module.exports = \
class Component

  ( config={} ) ->
    @set config

  set: ( keys, value=null ) ->
    type = typeof! keys
    switch
    | type is \Object and value is null =>
      for key in Object.keys keys
        @set key, keys[key]
    | type in <[ Number String ]> =>
      @[keys] = value
    | otherwise =>
      throw new Error "Invalid key for property '#{keys}'. The key must be a Number or a String."

  get: ( key ) ->
    @[key]

  merge: (source={}) ->
    concentric.merge @, source

  \implements : (itf, ensure=true) ->
    @@implements itf, ensure

  @implements = (itf, ensure=true) ->
    concentric.implements @, itf, ensure

  @implement = (itf) ->
    @ import all itf
    if typeof itf is \function
      @:: import all itf::
