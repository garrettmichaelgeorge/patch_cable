import ApplicationController from "./application_controller"
import fastdom from "fastdom"
import * as Tone from "tone"
import { registerController } from "./util"
import PatchCable from "../src/patch_cable"

export default class extends ApplicationController {
  static targets = [ "node", "inlet", "outlet" ]

  initialize () {
    this.audioNode = PatchCable.AudioNodeFactory(this.audioType)

    registerController(this)
  }

  connect () {
    if (this.audioNode.name !== "Destination") {
      this.audioNode.start()
    }
  }

  disconnect () {
    this.audioNode.dispose()
  }

  get audioType () {
    return this.nodeTarget.dataset.audioType
  }
}
