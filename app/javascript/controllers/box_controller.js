import ApplicationController from "./application_controller"

export default class extends ApplicationController {
  static targets = [ "box" ]

  connect () {
    super.connect()

    this.element[`${this.identifier}Controller`] = this

    this.element.moveCallbackController = this

    this.boxTargets.forEach(box => {
    })
  }

  disconnect () {
    super.disconnect()
  }

  move () {
    this.stimulate("Box#move")
  }

  elementMoved () {
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
}
