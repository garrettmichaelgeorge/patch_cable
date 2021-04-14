# frozen_string_literal: true

class Interfaces::OscillatorComponent < ApplicationComponent
  def initialize(box:)
    @box = box
  end

  private

  attr_reader :box
end
