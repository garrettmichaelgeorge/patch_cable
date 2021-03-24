import Nexus from 'nexusui'
import * as Tone from 'tone'
import { Controller } from 'stimulus'

export default class extends Controller {
  initialize() {
  }

  connect () {
    super.connect()
    // add your code here, if applicable
    this.drawLines()
  }

  disconnect () {
  }

  drawLines () {
    const source = document.getElementById("source")
    const srcBox = {
      el: source,
      x: this.centerX(source),
      y: this.centerY(source)
    }

    const destination = document.getElementById("destination")
    const destBox = {
      el: destination,
      x: this.centerX(destination),
      y: this.centerY(destination)
    }

    const myLine = document.getElementById("myLine")
    myLine.setAttribute("x1", srcBox.x)
    myLine.setAttribute("y1", srcBox.y)
    myLine.setAttribute("x2", destBox.x)
    myLine.setAttribute("y2", destBox.y)

    console.log("Lines drawn!")
  }

  centerX(el) {
    const rect = el.getBoundingClientRect()
    return rect.left + (rect.width / 2)
  }

  centerY(el) {
    const rect = el.getBoundingClientRect()
    return rect.top + (rect.height / 2)
  }
}

