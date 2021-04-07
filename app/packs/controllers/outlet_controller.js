import ApplicationController from './application_controller'

export default class extends ApplicationController {
  static values = {
    isLinking: Boolean,
    newDestinationId: String,
    clientPosition: Object
  }

  connect () {
    super.connect()

    if (!this.hasClientPositionValue) {
      this.clientPositionValue = { x: 0, y: 0 }
    }
  }

  start (event) {
    if (this.isLinkingValue) return

    console.log("Starting to link!")

    event.preventDefault()

    this.isLinkingValue = true
  }

  move (event) {
    if (!this.isLinkingValue) return

    console.log("Moving!")

    this.clientPositionValue = {
      x: event.clientX,
      y: event.clientY
    }

    // const closestDroppable = this.elementBelowDraggable
    // if (closestDroppable != this.droppableTarget) return
  }

  link () {
    if (!this.isLinkingValue) return
    console.log("Linking!")

    this.newDestinationIdValue = this.elementBelowDraggable
    this.isLinkingValue = false
  }

  newDestinationIdValueChanged (newDestinationId) {
    if (!this.isLinkingValue) return

    this.stimulate("Outlet#link", this.newDestinationId)
  }

  get elementBelowDraggable() {
    const result = document.elementFromPoint(
      this.clientPositionValue.x,
      this.clientPositionValue.y
    )

    return result
  }

  /* Reflex specific lifecycle methods.
   *
   * For every method defined in your Reflex class, a matching set of lifecycle methods become available
   * in this javascript controller. These are optional, so feel free to delete these stubs if you don't
   * need them.
   *
   * Important:
   * Make sure to add data-controller="outlet" to your markup alongside
   * data-reflex="Outlet#dance" for the lifecycle methods to fire properly.
   *
   * Example:
   *
   *   <a href="#" data-reflex="click->Outlet#dance" data-controller="outlet">Dance!</a>
   *
   * Arguments:
   *
   *   element - the element that triggered the reflex
   *             may be different than the Stimulus controller's this.element
   *
   *   reflex - the name of the reflex e.g. "Outlet#dance"
   *
   *   error/noop - the error message (for reflexError), otherwise null
   *
   *   reflexId - a UUID4 or developer-provided unique identifier for each Reflex
   */

  // beforeConnect(element, reflex, noop, reflexId) {
  //  console.log("before link", element, reflex, reflexId)
  // }

  // linkSuccess(element, reflex, noop, reflexId) {
  //   console.log("link success", element, reflex, reflexId)
  // }

  // linkError(element, reflex, error, reflexId) {
  //   console.error("link error", element, reflex, error, reflexId)
  // }

  // linkHalted(element, reflex, noop, reflexId) {
  //   console.warn("link halted", element, reflex, reflexId)
  // }

  // afterConnect(element, reflex, noop, reflexId) {
  //   console.log("after link", element, reflex, reflexId)
  // }

  // finalizeConnect(element, reflex, noop, reflexId) {
  //   console.log("finalize link", element, reflex, reflexId)
  // }
}
