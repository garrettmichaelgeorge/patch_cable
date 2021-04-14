class RefreshBoxJob < ApplicationJob
  queue_as :default

  delegate :component, :component_with_collection, to: :ViewComponentHelper

  def perform(box:, **args)
    cable_ready[BoxesChannel].morph(
      selector: "##{dom_id(box)}",
      html: render(BoxComponent.new(box: box))
    ).broadcast
  end
end
