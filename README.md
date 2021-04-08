# PatchCable

[![Maintainability](https://api.codeclimate.com/v1/badges/1647826bfb3520e55aec/maintainability)](https://codeclimate.com/github/garrettmichaelgeorge/patch_cable/maintainability)

PatchCable is a proof-of-concept implementation of the Patcher family of visual
audio programming, using the Web Audio API and backed by Ruby on Rails with
Stimulus Reflex. It offers a visual audio programming interface similar to that
of Max/MSP and Pure Data.

## System dependencies

- Ruby 2.7.2+
- Redis
- PostgreSQL 12
- Node.js

## Setup

```bash
# Clone this repository
git clone git@github.com:garrettmichaelgeorge/patch_cable.git
cd patch_cable

# Turn on caching in development for StimulusReflex
bin/rails dev:cache

# Install dependencies
bundle
yarn

# Set up database
bin/rails db:create
bin/rails db:schema:load
```
