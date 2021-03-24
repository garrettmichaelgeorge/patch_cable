import Nexus from 'nexusui'
import * as Tone from 'tone'
import { Controller } from 'stimulus'

export default class extends Controller {
  initialize() {
    const boxOptions = {
      value: 440,
      min: 100,
      max: 10000,
      step: 1
    }
    this.box = new Nexus.Number(this.element.id, boxOptions)
    this.osc = new Tone.Oscillator(440, "sine")
    this.osc.toDestination()
    this.osc.start()

    this.box.on("change", value => {
      this.osc.set({
        frequency: value
      })
    })
  }

  connect () {
    super.connect()
    // add your code here, if applicable
  }

  disconnect () {
    [this.osc].forEach(node => {
      node.dispose()
    })
  }
}
