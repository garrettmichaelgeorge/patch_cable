import ApplicationController from "./application_controller"
import { preventDragDefault } from "../src/util"
import fastdom from "fastdom"

export default class extends ApplicationController {
  static targets = [ "source", "destination" ]
  static values = {
    linking: Boolean,
  }

  initialize () {
    this.move = this.move.bind(this)
  }

  connect () {
    super.connect()
    this.sourceElement = undefined
    this.destinationElement = undefined
  }

  startLink (event) {
    console.log("Starting!", event.target)

    preventDragDefault(event.target)
    event.preventDefault()

    this._assignEndpoint(event.target)

    this.linkingValue = true
  }

  move (event) {
    if (!this.linkingValue) return

    // TODO: Give the user feedback by drawing a preview SVG line that follows the
    // cursor
  }

  link (event) {
    const elementBelow = event.target

    if (!this.linkingValue) {
      this.reset()
      return
    }

    this._assignEndpoint(elementBelow)

    this.stimulate("Line#create", this.signedSourceId, this.signedDestinationId)

    this.reset()
  }

  reset () {
    console.log("Resetting!")

    this.linkingValue = false

    this.sourceElement = undefined
    this.destinationElement = undefined
  }

  get signedSourceId () {
    return this.sourceElement.dataset.endpoint
  }

  get signedDestinationId () {
    return this.destinationElement.dataset.endpoint
  }

  _isEndpoint (element) {
    return this._isSource(element) || this._isDestination(element)
  }

  _isSource (element) {
    return this.sourceTargets.includes(element)
  }

  _isDestination (element) {
    return this.destinationTargets.includes(element)
  }

  _assignEndpoint (element) {
    // Because the event trigger is sometimes a child of the actual endpoint
    // target, check the parent nodes also
    try {
      this._validateEndpoint(element)
    } catch {
      this._validateEndpoint(element.parentElement)
    }

    console.log("sourceElement", this.sourceElement, "destinationElement", this.destinationElement)
  }

  _validateEndpoint (element) {
    if (this._isSource(element)) {
      this.sourceElement = element
    } else if (this._isDestination(element)) {
      this.destinationElement = element
    } else {
      throw Error, "Invalid source/destination element!"
    }
  }

  /* Reflex specific lifecycle methods.
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

  // beforeLink(element, reflex, noop, reflexId) {
  //  console.log("before link", element, reflex, reflexId)
  // }

  createSuccess(element, reflex, noop, reflexId) {
    console.log("Create success", element, reflex, reflexId)
  }

  // linkError(element, reflex, error, reflexId) {
  //   console.error("link error", element, reflex, error, reflexId)
  // }

  // linkHalted(element, reflex, noop, reflexId) {
  //   console.warn("link halted", element, reflex, reflexId)
  // }

  // afterLink(element, reflex, noop, reflexId) {
  //   console.log("after link", element, reflex, reflexId)
  // }

  // finalizeLink(element, reflex, noop, reflexId) {
  //   console.log("finalize link", element, reflex, reflexId)
  // }
}
