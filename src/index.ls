@merge = (target, source) ->
  for key in Object.keys source
    old-value = target[key]
    new-value = source[key]
    is-object = typeof new-value \
      == typeof old-value \
      == \object
    if is-object
      @merge old-value, new-value
    else
      setter = \
      if target.set? then target~set
      else (k,v) -> target[k] = v
      setter key, new-value

@implements = (cls, itf, ensure=yes) ->
  cls = cls.constructor if typeof cls is \object

  cache = switch typeof! @cache
    | \Object => @cache[cls] ||= [] 
    | \String => cls[@cache] ||= []
    | \Boolean =>
      if @cache then cls[\interfaces] ||= [] # Default
      else false

  if cache and itf in cache then return yes # Cache hit

  checks =
    class: [cls, itf] # Class properties
    object: [new cls, new itf] # Object properties
  errors = []
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
        errors.push "The #{type} property #{cls.displayName}.#{key} #{error}."

  implemented = errors.length is 0
  if implemented
    cache.push itf if cache and itf not in cache # Insert in cache
  else if ensure
    throw new Error errors.join "\n"
  implemented


/*
switch typeof! @cache
  | \Object => cache = { cls: [ cache... ] } 
  | \String => cls[cache] = [ cache... ]
  | \Boolean => cls[\cache] ||= [ cache... ] # Default
*/
@implements.cache = no

module.exports = @ <<< Component: require './Component'