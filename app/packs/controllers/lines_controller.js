import ApplicationController from "./application_controller"
import fastdom from "fastdom"

export default class extends ApplicationController {
  static targets = [ "source", "destination" ]
  static values = {
    isLinking: Boolean,
    clientPosition: Object,
    currentSource: Object,
    currentDestination: Object
  }

  connect () {
    super.connect()

    if (!this.hasClientPositionValue) {
      fastdom.mutate(() => {
        this.clientPositionValue = { x: 0, y: 0 }
      })
    }
  }

  build (event) {
    let elements 

    fastdom.measure(() => {
      elements = document.elementsFromPoint(event.clientX, event.clientY)
    })

    console.log(elements)

    if (!this._isLinkable(event.target) || this.isLinkingValue) return

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

  create () {
    if (!this.isLinkingValue) return

    console.log("Linking!")

    // this.destinationIdValue = this.elementBelowDraggable
    this.stimulate("Line#create", this.sourceValue, this.destinationValue)
    this.isLinkingValue = false
  }

  _isLinkable (element) {
    return this.allLinkables.includes(element)
  }

  get elementBelowDraggable() {
    let result

    fastdom.measure(() => {
      result = document.elementFromPoint(
        this.clientPositionValue.x,
        this.clientPositionValue.y
      )
    })

    return result
  }

  get allLinkables () {
    return [...this.sourceTargets, ...this.destinationTargets]
  }
}
