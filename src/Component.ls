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

  merge: (source={}, target=@) ->
    for key in Object.keys source
      old-value = target[key]
      new-value = source[key]
      is-object = typeof new-value \
        == typeof old-value \
        == \object
      if is-object
        @merge new-value, old-value
      else
        setter = \
        if target.set? then target~set
        else (k,v) -> target[k] = v
        setter key, new-value

  \implements : (itf, ensure=true) ->
    @@implements itf, ensure

  @implement = (itf) ->
    @ import all itf
    if typeof itf is \function
      @:: import all itf::

Component.implements = (itf, ensure=true) ->
  require('./implements') @, itf, ensure