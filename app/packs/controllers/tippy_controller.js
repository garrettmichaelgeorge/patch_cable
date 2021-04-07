import { Controller } from "stimulus"
import tippy from "tippy.js"
import fastdom from "fastdom"

export default class extends Controller {
  connect () {
    fastdom.mutate(() => {
      this.tippy = tippy("[data-tippy-content]", this.config)
    })
  }

  disconnect () {
    fastdom.mutate(() => {
      this.tippy.destroy()
    })
  }

  get config () {
    return {}
  }
}
