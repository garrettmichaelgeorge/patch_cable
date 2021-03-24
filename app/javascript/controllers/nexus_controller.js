import ApplicationController from './application_controller'
import Nexus from 'nexusui'
import * as Tone from 'tone'

/* This is the custom StimulusReflex controller for the Nexus Reflex.
 * Learn more at: https://docs.stimulusreflex.com
 */
export default class extends ApplicationController {
  initialize () {
    // const name = this.sanitizeName(this.element.nodeName)
    // this.uiInterface = this.nexusFactory(name, this.element.id)
    // this.osc = new Tone.Oscillator(440, "sine").toDestination()

    // this.uiInterface.on("change", (value) => {
    //   this.osc.start()
    //   this.osc.stop("+1")
    // })
  }

  connect () {
    super.connect()
    // console.log(this.uiInterface)
  }

  disconnect() {
    // this.uiInterface.destroy()
    // this.osc.dispose()
  }

  sanitizeName (nodeName) {
    let result = nodeName.substring(3).toLowerCase()
    result = result[0].toUpperCase() + result.substring(1)
    return result
  }

  nexusFactory (className, ...options) {
    switch (className) {
      case "Button":
        return new Nexus.Button(...options)
      case "Dial":
        return new Nexus.Dial(...options)
      case "Number":
        return new Nexus.Number(...options)
      case "Position":
        return new Nexus.Position(...options)
      case "Slider":
        return new Nexus.Slider(...options, { 'size': [120, 20] })
      case "Toggle":
        return new Nexus.Toggle(...options)
      case "TextButton":
        return new Nexus.TextButton(...options)
      default:
        console.log("Nexus type unknown: ", className)
    }
  }


  /* Reflex specific lifecycle methods.
   *
   * For every method defined in your Reflex class, a matching set of lifecycle methods become available
   * in this javascript controller. These are optional, so feel free to delete these stubs if you don't
   * need them.
   *
   * Important:
   * Make sure to add data-controller="nexus" to your markup alongside
   * data-reflex="Nexus#dance" for the lifecycle methods to fire properly.
   *
   * Example:
   *
   *   <a href="#" data-reflex="click->Nexus#dance" data-controller="nexus">Dance!</a>
   *
   * Arguments:
   *
   *   element - the element that triggered the reflex
   *             may be different than the Stimulus controller's this.element
   *
   *   reflex - the name of the reflex e.g. "Nexus#dance"
   *
   *   error/noop - the error message (for reflexError), otherwise null
   *
   *   reflexId - a UUID4 or developer-provided unique identifier for each Reflex
   */

  // Assuming you create a "Nexus#dance" action in your Reflex class
  // you'll be able to use the following lifecycle methods:

  // beforeDance(element, reflex, noop, reflexId) {
  //  element.innerText = 'Putting dance shoes on...'
  // }

  // danceSuccess(element, reflex, noop, reflexId) {
  //   element.innerText = '\nDanced like no one was watching! Was someone watching?'
  // }

  // danceError(element, reflex, error, reflexId) {
  //   console.error('danceError', error);
  //   element.innerText = "\nCouldn\'t dance!"
  // }

  // afterDance(element, reflex, noop, reflexId) {
  //   element.innerText = '\nWhatever that was, it\'s over now.'
  // }

  // finalizeDance(element, reflex, noop, reflexId) {
  //   element.innerText = '\nNow, the cleanup can begin!'
  // }
}
