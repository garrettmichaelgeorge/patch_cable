// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import "core-js/stable"
import "regenerator-runtime/runtime"
import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
// import * as ActiveStorage from "@rails/activestorage"
import "channels"

Rails.start()
Turbolinks.start()

import "../controllers"
import "../src"

if (process.env.RAILS_ENV === "development") {
  // Raise errors anytime a DOM operation (mutation or measurement) is performed
  // outside of the fastdom queue
  // import("fastdom/fastdom-strict")
}

// Attach a click listener
// document.getElementById("start-audio").addEventListener('click', async () => {
// 	await Tone.start()
// 	console.log('Audio is ready')
// })

// const images = require.context("../images", true)
// const imagePath = name => images(name, true)
