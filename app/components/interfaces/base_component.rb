# frozen_string_literal: true

class Interfaces::BaseComponent < ApplicationComponent
  def initialize(box:)
    @box = box
  end

  def call
    raise NotImplementedError, "Need to implement #call in #{self}"
  end

  private

  attr_reader :box
end
