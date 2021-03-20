// Visit The Stimulus Handbook for more details 
// https://stimulusjs.org/handbook/introduction
// 
// This example controller works with specially annotated HTML like:
//
// <div data-controller="hello">
//   <h1 data-target="hello.output"></h1>
// </div>

import { Controller } from "stimulus"
import Nexus from "nexusui"

export default class extends Controller {
  static targets = []

  connect() {
    const dial = new Nexus.Dial(this.identifier)
    console.log(dial)
  }
}
