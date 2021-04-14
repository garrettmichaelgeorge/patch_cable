import ApplicationController from "./application_controller"
import debounce from "lodash/debounce"
import fastdom from "fastdom"

export default class extends ApplicationController {
  static targets = [ "box" ]

  initialize () {
    this.targetMoved = this.targetMoved.bind(this)
  }

  connect () {
    super.connect()

    this.element[`${this.identifier}Controller`] = this

    this.targetMoved = debounce(this.targetMoved, 4000)
    this.observer = new MutationObserver(this.targetMoved)
    this.observer.observe(this.element, this.observerConfig)
  }

  disconnect () {
    this.observer.disconnect()
  }

  move () {
    this.stimulate("Box#move")
  }

  targetMoved (_mutationRecords) {
    this.move()
  }

  destroy () {
    this.stimulate("Box#destroy")
  }

  update (event) {
    const webAudioTypeId = event.target.value
    console.log(`Creating box as ${webAudioTypeId}`)
    this.stimulate("Box#create_as", webAudioTypeId)
  }

  beforeCreate(element) {
    fastdom.mutate(() => {
      element.classList.add("is-loading", "is-primary")
    })
  }

  afterCreate(element) {
    fastdom.mutate(() => {
      element.classList.remove("is-loading", "is-primary")
    })
  }

  updateSuccess(element) {
    console.log("Update successful!", element)
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
