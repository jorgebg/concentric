#require! deepmerge

#titleize = (str) -> key[0].toUpperCase! + key.slice 1


#class Interface
#  -> throw new Error "Thou shalt not create instances of interface #{@.constructor.displayName}."

module.exports = class Component

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

  'implements': (itf, ensure=true) ->
    @.constructor.implements itf, ensure

  @'implements' = (itf, ensure=true) ->
    interfaces = @implements.interfaces ?= []
    if itf in interfaces then return true # Cache hit

    errors = []
    checks =
      class: [@, itf] # Class properties
      object: [@::, itf::] # Object properties
    for type, [target, source] of checks
      for key, value of source
        target-value = target[key]
        source-value = source[key]
        error = switch
        | not target-value => "is not implemented"
        | typeof source-value is \function => switch
          | typeof target-value isnt \function =>
            "must be a function"
          | source-value.length > target-value.length =>
            "arguments number must be >= #{source-value.length}"
        if error
          errors.push "The #{type} property #{@displayName}.#{key} #{error}."

    implemented = errors.length is 0
    if implemented
      interfaces.push itf if itf not in interfaces # Insert in cache
    else
      throw new Error errors.join "\n" if ensure
    implemented
    
  @implement = (itf) ->
    @ import all itf
    if typeof itf is \function
      @:: import all itf::
