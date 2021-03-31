# frozen_string_literal: true

class Interfaces::BlankComponent < ApplicationComponent
  def initialize(box:)
    @box = box
  end

  def call
    tag.pc_interface id: "interface_#{dom_id(box)}",
                     data: { controller: "boxes_blank" }
  end

  private

  attr_reader :box
end
