import ApplicationController from "./application_controller"
import fastdom from "fastdom"

export default class extends ApplicationController {
  static values = {
    sourceId: String,
    destinationId: String
  }

  initialize () {
    // Bind context to event handlers so "this" always refers to the controller
    this.sourceMoved = this.sourceMoved.bind(this)
    this.destinationMoved = this.destinationMoved.bind(this)

    // Create mutation observers once only
    this.sourceObserver = new MutationObserver(this.sourceMoved)
    this.destinationObserver = new MutationObserver(this.destinationMoved)
  }

  connect () {
    super.connect()

    this.element[`${this.identifier}Controller`] = this

    this.patchCanvas = document.querySelector(".pc-patch-canvas")
  }

  disconnect () {
    this.sourceObserver.disconnect()
    this.destinationObserver.disconnect()
  }

  sourceMoved (mutationRecords) {
    mutationRecords.forEach(_mutation => {
      this.drawSource()
    })
  }

  destinationMoved (mutationRecords) {
    mutationRecords.forEach(mutation => {
      if (!["data-x", "data-y"].includes(mutation.attributeName)) return

      this.drawDestination()
    })
  }

  drawSource () {
    fastdom.mutate(() => {
      this.element.setAttribute("x1", this.sourcePosition.x)
      this.element.setAttribute("y1", this.sourcePosition.y)
    })
  }

  drawDestination () {
    fastdom.mutate(() => {
      this.element.setAttribute("x2", this.destinationPosition.x)
      this.element.setAttribute("y2", this.destinationPosition.y)
    })
  }

  sourceIdValueChanged (id) {
    this.sourceObserver.disconnect()

    this.sourceElement = document.getElementById(id)

    this.sourceObserver.observe(this.sourceBox, this.observerConfig)
  }

  destinationIdValueChanged (id) {
    this.destinationObserver.disconnect()

    this.destinationElement = document.getElementById(id)

    this.destinationObserver.observe(this.destinationBox, this.observerConfig)
  }

  _positionFromRect (rect) {
    return {
      x: rect.left + (rect.width / 2) - this.patchCanvas.offsetLeft,
      y: rect.top + (rect.height / 2) - this.patchCanvas.offsetTop
    }
  }

  get sourceBox () {
    // HACK: LineController should not know this much about the internals of the
    // source element
    return this.sourceElement
      .parentElement
      .parentElement
  }

  get destinationBox () {
    // HACK: LineController should not know this much about the internals of the
    // destination element
    return this.destinationElement
      .parentElement
      .parentElement
  }

  get observerConfig () {
    return {
      childList: false,
      subtree: false,
      attributes: true,
      attributeFilter: ["data-x", "data-y"],
      characterData: false
    }
  }

  get sourcePosition () {
    return this._positionFromRect(
      this.sourceElement.getBoundingClientRect()
    )
  }

  get destinationPosition () {
    return this._positionFromRect(
      this.destinationElement.getBoundingClientRect()
    )
  }
}
