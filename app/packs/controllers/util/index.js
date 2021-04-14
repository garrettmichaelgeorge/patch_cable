// Register controller in the DOM so it is callable by other controllers
// Credit: leastbad
// https://leastbad.com/stimulus-power-move
export function registerController(controller, element = undefined) {
  const registerTarget = (typeof element === undefined)
                         ? element
                         : controller.element

  const identifier = formatIdentifier(controller.identifier)
  registerTarget[identifier] = controller
}

export function formatIdentifier (identifier) {
  return camelize(identifier) + "Controller"
}

export function camelize (str) {
  return str.split(/[-_]/).map(w=> w.replace(/./, m=> m.toUpperCase())).join("").replace(/^\w/, c => c.toLowerCase())
}
