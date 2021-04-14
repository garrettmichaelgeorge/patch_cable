import { Controller } from "stimulus"
import tippy from "tippy.js"
import "velocity-animate/velocity.ui"

export default class extends Controller {
  static values = {
    showing: Boolean
  }

  initialize () {
    this.onClickOutside = this.onClickOutside.bind(this)
    this.onMount = this.onMount.bind(this)
    this.onUntrigger = this.onUntrigger.bind(this)
  }

  connect () {
    this.template = document.getElementById(this.templateId)

    fastdom.mutate(() => {
      this.tippy = tippy(this.element, this.config)
    })
  }

  disconnect () {
    this.tippy.destroy()
  }

  show (event) {
    event.preventDefault()

    if (this.showingValue) {
      this.hide(event)
    } else {
      fastdom.mutate(() => {
        this.tippy.show()
      })

      this.showingValue = true
    }
  }

  hide (event) {
    if (!this.showingValue) return

    fastdom.mutate(() => {
      this.tippy.hideWithInteractivity(event)
    })

    this.showingValue = false
  }

  onMount (instance) {
    this.instance = instance
    const box = instance.popper.firstElementChild
    box.velocity("fadeInDown")
  }

  onUntrigger (instance) {
    const box = instance.popper.firstElementChild
    box.velocity("fadeOutDown")

    this.showingValue = false
  }

  onClickOutside (instance, event) {
    const box = instance.popper.firstElementChild
    box.velocity("fadeOutDown")

    this.hide(event)
  }

  get config () {
    return {
      trigger: "manual",
      delay: [0, 0],
      content: this.template.content,
      ignoreAttributes: true,
      allowHTML: true,
      interactive: true,
      animation: false,
      // placement: "right-end",
      appendTo: document.body,
      onClickOutside: this.onClickOutside,
      onMount: this.onMount,
      onUntrigger: this.onUntrigger
    }
  }

  get templateId () {
    return this.element.getAttribute("data-popover-template")
  }

  get appendParent () {
    return document.getElementById("lines")
  }
}
