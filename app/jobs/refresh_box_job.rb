class RefreshBoxJob < ApplicationJob
  queue_as :default

  def perform(box:, **args)
    # cable_ready[PatchesChannel].inner_html(
    #   selector: dom_id(box),
    #   html: render(BoxComponent.new(box: box))
    # ).inner_html(
    #   selector: "#lines_svg",
    #   html: render(LineComponent.with_collection(box.destination_lines))
    # )

    # cable_ready[PatchesChannel].inner_html(
    #   selector: dom_id(box.patch),
    #   html: render(partial: "patches/patch", locals: { patch: box.patch })
    # ).broadcast
  end
end
