import ApplicationController from "./application_controller"
import fastdom from "fastdom"
import * as Tone from "tone"
import { registerController } from "./util"

function AudioNodeFactory(type) {
  let result

  switch (type) {
    case "oscillator":
      result = new Tone.Oscillator()
      break;
    case "destination":
      result = Tone.Destination
      break;
    case null:
      throw Error, `Audio type not present in the DOM. Check data-audio-type`
    default:
      throw Error, `Audio type not recognized: "${type}"`
  }

  return result
}

export default class extends ApplicationController {
  static targets = [ "node", "inlet", "outlet" ]

  initialize () {
    this.audioNode = AudioNodeFactory(this.audioType)

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
