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

    console.log(this.sourceTargets, this.destinationTargets)
  }

  startLink (event) {
    console.log("Starting!")

    preventDragDefault(event.target)
    event.preventDefault()

    if (this.sourceTargets.includes(event.target)) {
      this.sourceElement = event.target
    } else if (this.destinationTargets.includes(event.target)) {
      this.destinationElement = event.target
    }

    console.log(this.sourceElement, this.destinationElement)

    this.linkingValue = true
  }

  move (event) {
    if (!this.linkingValue) return

    // Give the user feedback by drawing a preview SVG line that follows the
    // cursor
  }

  link (event) {
    const elementBelow = event.target

    if (!(this.linkingValue && this._isEndpoint(elementBelow))) {
      this.reset()
      return
    }

    if (this.sourceTargets.includes(elementBelow)) {
      this.sourceElement = elementBelow
    } else if (this.destinationTargets.includes(elementBelow)) {
      this.destinationElement = elementBelow
    }

    let signedSourceId, signedDestinationId

    fastdom.measure(() => {
      signedSourceId = this.sourceElement.getAttribute("data-outlet")
      signedDestinationId = this.destinationElement.getAttribute("data-inlet")
    })

    this.stimulate("Line#create", signedSourceId, signedDestinationId)

    this.reset()
  }

  reset () {
    console.log("Resetting!")

    this.linkingValue = false

    this.sourceElement = undefined
    this.destinationElement = undefined
  }

  _isEndpoint (element) {
    return [...this.sourceTargets, ...this.destinationTargets]
      .includes(element)
  }

  /* Reflex specific lifecycle methods.
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
