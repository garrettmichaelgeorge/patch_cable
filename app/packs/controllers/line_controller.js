import ApplicationController from "./application_controller"

export default class extends ApplicationController {
  static values = {
    sourceId: String,
    destinationId: String
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
    this.element.setAttribute("x1", this.sourcePosition.x)
    this.element.setAttribute("y1", this.sourcePosition.y)
  }

  drawDestination () {
    this.element.setAttribute("x2", this.destinationPosition.x)
    this.element.setAttribute("y2", this.destinationPosition.y)
  }

  sourceIdValueChanged (id) {
    this.sourceElement = document.getElementById(id)

    this.sourceObserver = new MutationObserver(this.sourceMoved.bind(this))
    this.sourceObserver.observe(this.sourceBox, this.observerConfig)
  }

  destinationIdValueChanged (id) {
    this.destinationElement = document.getElementById(id)

    this.destinationObserver = new MutationObserver(this.destinationMoved.bind(this))
    this.destinationObserver.observe(this.destinationBox, this.observerConfig)
  }

  get sourceBox () {
    // HACK: LineController should not know this much about the internals of the
    // source element
    return this.sourceElement.parentElement
                             .parentElement
  }

  get destinationBox () {
    // HACK: LineController should not know this much about the internals of the
    // destination element
    return this.destinationElement.parentElement
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
    return {
      x: this.sourceElement.getBoundingClientRect().left + (this.sourceElement.getBoundingClientRect().width / 2) - this.patchCanvasLeft,
      y: this.sourceElement.getBoundingClientRect().top + (this.sourceElement.getBoundingClientRect().height / 2) - this.patchCanvasTop
    }
  }

  get destinationPosition () {
    return {
      x: this.destinationElement.getBoundingClientRect().left + (this.destinationElement.getBoundingClientRect().width / 2) - this.patchCanvasLeft,
      y: this.destinationElement.getBoundingClientRect().top + (this.destinationElement.getBoundingClientRect().height / 2) - this.patchCanvasTop
    }
  }

  get patchCanvasTop () {
    return this.patchCanvas.offsetTop;
  }

  get patchCanvasLeft () {
    return this.patchCanvas.offsetLeft;
  }
}
