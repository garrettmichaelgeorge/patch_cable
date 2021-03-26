import { Controller } from "stimulus"
import * as Tone from "tone"

export default class extends Controller {
  start() {
    Tone.start() 
    console.log("Audio context started")
  }
}
