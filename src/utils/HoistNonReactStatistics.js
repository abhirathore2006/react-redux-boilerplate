const REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

const KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    arguments: true,
    arity: true
};

export default function hoistStatics(targetComponent, sourceComponent) {
    var keys = Object.getOwnPropertyNames(sourceComponent);
    for (var i = 0; i < keys.length; ++i) {
      const key = keys[i];
      if (!REACT_STATICS[key] && !KNOWN_STATICS[key]) {
        try {
          targetComponent[key] = sourceComponent[key];
        } catch (error) {}
      }
    }
    return targetComponent;
}
