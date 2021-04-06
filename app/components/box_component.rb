# frozen_string_literal: true

class BoxComponent < ApplicationComponent
  def initialize(box:)
    @box = box
  end

  private

  attr_reader :box

  def interface_component_name
    "interfaces/#{box.type}"
  end

  class EndpointComponent < ApplicationComponent
    def initialize(endpoint:)
      @endpoint = endpoint
    end

    def call_endpoint
      tag.pc_endpoint id: dom_id(endpoint) do
        endpoint
      end
    end

    def call_outlet
      tag.pc_outlet id: dom_id(outlet) do
        endpoint
      end
    end

    private

    attr_reader :endpoint

    def endpoint
      icon :circle, class: "is-small is-draggable"
    end
  end
end
