import ApplicationController from "./application_controller"

export default class extends ApplicationController {
  static targets = [ "line" ]
  static values = {
    sourceId: Object,
    destinationId: Object
  }

  connect () {
    super.connect()

    this.element[`${this.identifier}Controller`] = this

    // Attach callback to endpoint nodes so lines are re-rendered whenever the
    // the endpoints move
    this.source = document.getElementById(this.sourceIdValue)
    this.destination = document.getElementById(this.destinationIdValue)

    // source.dragController.register(this.endpointMoved)
    // destination.dragController.register(this.endpointMoved)

    this.draw()
  }

  disconnect() {
  }

  draw () {
    this.sourceValue.coordinates = {
      x: this._centerX(this.sourceValue.el),
      y: this._centerY(this.sourceValue.el)
    }

    this.destinationValue = {
      el: document.getElementById(this.destinationId),
      coordinates: {
        x: this._centerX(this.destinationValue.el),
        y: this._centerY(this.destinationValue.el)
      }
    }

    console.log("Line drawn between:", source, destination)
  }

  sourceValueChanged(value) {
    // if (!(this.hasSourceTarget && this.hasDestinationTarget)) return

    this.updateEndpoints()
  }

  endpointMoved(value) {
    this.updateEndpoints()
  }

  updateEndpoints() {
    // this.lineTarget.setAttribute("x1", this.sourceValue.coordinates.x)
    // this.lineTarget.setAttribute("y1", this.sourceValue.coordinates.y)
    // this.lineTarget.setAttribute("x2", this.destinationValue.coordinates.x)
    // this.lineTarget.setAttribute("y2", this.destinationValue.coordinates.y)
  }

  _centerX(el) {
    if (!el) return

    const rect = el.getBoundingClientRect()
    return rect.left + (rect.width / 2)
  }

  _centerY(el) {
    if (!el) return

    const rect = el.getBoundingClientRect()
    return rect.top + (rect.height / 2)
  }
}
