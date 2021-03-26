import Nexus from 'nexusui'
import * as Tone from 'tone'
import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = [ "line" ]

  initialize() {
  }

  connect () {
    // TODO: uncomment this after converting to a StimulusReflex controller
    // super.connect()
    this.drawLines()
  }

  disconnect () {
  }

  drawLines () {
    const sourceId = this.element.getAttribute("data-source-id")
    const source = document.getElementById(sourceId)
    this.srcCoordinates = {
      x: this._centerX(source),
      y: this._centerY(source)
    }

    const destId = this.element.getAttribute("data-destination-id")
    const destination = document.getElementById(destId)
    this.destCoordinates = {
      x: this._centerX(destination),
      y: this._centerY(destination)
    }

    this.lineTarget.setAttribute("x1", this.srcCoordinates.x)
    this.lineTarget.setAttribute("y1", this.srcCoordinates.y)
    this.lineTarget.setAttribute("x2", this.destCoordinates.x)
    this.lineTarget.setAttribute("y2", this.destCoordinates.y)

    console.log("Line drawn between:", source, destination)
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

