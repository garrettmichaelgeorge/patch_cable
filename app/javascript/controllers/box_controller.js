import ApplicationController from "./application_controller"
import debounce from "lodash/debounce"

export default class extends ApplicationController {
  static targets = [ "box" ]

  connect () {
    super.connect()

    this.element[`${this.identifier}Controller`] = this

    this.targetMoved = debounce(this.targetMoved, 1000)
    this.observer = new MutationObserver(this.targetMoved.bind(this))
    this.observer.observe(this.element, this.observerConfig)
  }

  disconnect () {
    this.observer.disconnect()
  }

  move () {
    this.stimulate("Box#move")
  }

  targetMoved (mutationRecords) {
    this.move()
  }

  destroy () {
    this.stimulate("Box#destroy")
  }

  beforeCreate(element) {
    element.classList.add("is-loading", "is-primary")
  }

  afterCreate(element) {
    element.classList.remove("is-loading", "is-primary")
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
}
