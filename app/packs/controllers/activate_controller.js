import { Controller } from "stimulus"
import fastdom from "fastdom"

export default class extends Controller {
  static classes = [ "active" ]
  static targets = [ "activatable" ]
  static values = {
    isActive: Boolean
  }

  toggle () {
    if (!this.hasActivatableTarget) return

    this.isActiveValue = !this.isActiveValue
  }

  isActiveValueChanged (value) {
    if (value) {
      this._activateAll()
    } else {
      this._deactivateAll()
    }
  }

  _activateAll () {
    this.activatableTargets.forEach(target => {
      this._activate(target)
    })
  }

  _deactivateAll () {
    this.activatableTargets.forEach(target => {
      this._deactivate(target)
    })
  }

  _activate(el) {
    fastdom.mutate(() => {
      el.classList.add(this.activeClass)
    })
  }

  _deactivate(el) {
    fastdom.mutate(() => {
      el.classList.remove(this.activeClass)
    })
  }
}
