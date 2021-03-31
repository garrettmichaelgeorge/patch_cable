# frozen_string_literal: true

class BoxComponent < ApplicationComponent
  # renders_one :wrapper, "BoxWrapperComponent"

  def initialize(box:)
    @box = box
  end

  private

  attr_reader :box

  def interface_component
    "interfaces/#{box.type}"
  end

  def delete_button
  end

  class BoxWrapperComponent < ApplicationComponent
    def initialize(box:)
      @box = box
    end

    def call
      tag.pc_box id: dom_id(box),
                 class: "box pc-box",
                 data: { draggable: true,
                         box: box.to_sgid.to_s } do 
        content
      end
    end

    private

    attr_reader :box
  end
end
