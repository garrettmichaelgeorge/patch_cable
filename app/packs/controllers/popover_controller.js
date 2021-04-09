import { Controller } from "stimulus"
import tippy from "tippy.js"
import "velocity-animate/velocity.ui"

export default class extends Controller {
  static values = {
    isShowing: Boolean
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

    if (this.isShowingValue) {
      this.hide(event)
    } else {
      fastdom.mutate(() => {
        this.tippy.show()
      })

      this.isShowingValue = true
    }
  }

  hide (event) {
    if (!this.isShowingValue) return

    fastdom.mutate(() => {
      this.tippy.hideWithInteractivity(event)
    })

    this.isShowingValue = false
  }

  onMount (instance) {
    this.instance = instance
    const box = instance.popper.firstElementChild
    box.velocity("fadeInDown")
  }

  onUntrigger (instance) {
    const box = instance.popper.firstElementChild
    box.velocity("fadeOutDown")

    this.isShowingValue = false
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
      placement: "right-end",
      onClickOutside: this.onClickOutside.bind(this),
      onMount: this.onMount.bind(this),
      onUntrigger: this.onUntrigger.bind(this)
    }
  }

  get templateId () {
    return this.element.getAttribute("data-popover-template")
  }

  get appendParent () {
    return document.getElementById("lines")
  }
}
