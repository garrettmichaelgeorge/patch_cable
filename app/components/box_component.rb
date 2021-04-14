# frozen_string_literal: true

class BoxComponent < ApplicationComponent
  def initialize(box:)
    @box = box
  end

  private

  attr_reader :box

  def interface_component_name
    "interfaces/#{box.web_audio_type_name}"
  end

  def box_controllers
    token_list("box", "move", "audio-node")
  end

  class EndpointComponent < ApplicationComponent
    def initialize(endpoint:)
      @endpoint = endpoint
    end

    def call
      tag.li id: dom_id(endpoint),
             class: css_class,
             data: { endpoint: endpoint.sgid,
                     action: token_list("mousedown->endpoints#startLink",
                                        "mouseup->endpoints#link"),
                     endpoints_target: "destination",
                     lines_target: "destination" } do
        endpoint
      end
    end


    def call_outlet
      tag.li id: dom_id(outlet) do
        endpoint
      end
    end

    private

    attr_reader :endpoint

    def endpoint
      icon :circle, class: "is-small is-draggable"
    end

    def css_class
      token_list("pc-inlet",
                 "pc-control",
                 "is-draggable",
                 "has-z-index-control")
    end
  end
end
