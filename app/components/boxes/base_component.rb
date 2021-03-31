class Boxes::BaseComponent < ApplicationComponent
  attr_reader :box

  def initialize(box:)
    @box = box
  end
end
