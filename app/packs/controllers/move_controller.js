import { Controller } from "stimulus"
import fastdom from "fastdom"
import { preventDragDefault } from "../src/util"

export default class extends Controller {
  static classes = [ "moving" ]
  static values = {
    clientOffset: Object,
    canvasId: String,
    canvasOffset: Object
  }

  initialize () {
    this.move = this.move.bind(this)
    this.element[`${this.identifier}Controller`] = this
  }

  connect () {
    // Prevent default Browser Drag API behavior
    preventDragDefault(this.element)

    this.canvas = document.getElementById(this.canvasIdValue)

    fastdom.measure(() => {
      const canvasRect = this.canvas.getBoundingClientRect()
      this.canvasOffsetValue = {
        x: canvasRect.left,
        y: canvasRect.top
      }
    })
  }

  disconnect () {
  }

  // Start the move, setting state and placing an event listener on document
  start (event) {
    if (event.target != this.element) return

    event.preventDefault()

    fastdom.measure(() => {
      const rect = this.element.getBoundingClientRect()
      this.clientOffsetValue = {
        x: event.pageX - rect.left,
        y: event.pageY - rect.top
      }
    })

    fastdom.mutate(() => {
      this.element.classList.add(this.movingClass)
    })

    document.addEventListener("mousemove", this.move)
  }

  // Move this element
  move (event) {
    fastdom.mutate(() => {
      const coordinates = this._coordinatesAt(event.pageX, event.pageY)
      // this.element.style.left = `${coordinates.x}px`
      // this.element.style.top = `${coordinates.y}px`
      this.element.style.transform = `translate(${coordinates.x}px, ${coordinates.y}px)`
      this.element.setAttribute("data-x", coordinates.x)
      this.element.setAttribute("data-y", coordinates.y)
    })
  }

  // Stop moving and perform necessary cleanup
  stop () {
    document.removeEventListener("mousemove", this.move)

    fastdom.mutate(() => {
      this.element.classList.remove(this.movingClass)
    })
  }

  _coordinatesAt (x, y) {
    return {
      x: this._coordinateFor(x, "x"),
      y: this._coordinateFor(y, "y")
    }
  }

  // Calculate the movable element's final position (x or y) given a page
  // coordinate
  _coordinateFor (coordinate, coordinateType) {
    if (!["x", "y"].includes(coordinateType)) throw Error

    return coordinate
      - this.clientOffsetValue[coordinateType]
      - this.canvasOffsetValue[coordinateType]
  }
}
