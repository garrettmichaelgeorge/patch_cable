# frozen_string_literal: true

class LineReflex < ApplicationReflex
  # Add Reflex methods in this file.
  #
  # All Reflex instances include CableReady::Broadcaster and expose the following properties:
  #
  #   - connection  - the ActionCable connection
  #   - channel     - the ActionCable channel
  #   - request     - an ActionDispatch::Request proxy for the socket connection
  #   - session     - the ActionDispatch::Session store for the current visitor
  #   - flash       - the ActionDispatch::Flash::FlashHash for the current request
  #   - url         - the URL of the page that triggered the reflex
  #   - params      - parameters from the element's closest form (if any)
  #   - element     - a Hash like object that represents the HTML element that triggered the reflex
  #     - signed    - use a signed Global ID to map dataset attribute to a model eg. element.signed[:foo]
  #     - unsigned  - use an unsigned Global ID to map dataset attribute to a model  eg. element.unsigned[:foo]
  #   - cable_ready - a special cable_ready that can broadcast to the current visitor (no brackets needed)
  #   - reflex_id   - a UUIDv4 that uniquely identies each Reflex

  before_reflex do
    throw :abort unless params[:id]

    @patch ||= Patch.find(params[:id])
  end

  def create(signed_source, signed_destination)
    source = GlobalID::Locator.locate_signed(signed_source)
    destination = GlobalID::Locator.locate_signed(signed_destination)

    line = Line.create!(source: source, destination: destination)

    # TODO: Switch to selector or nothing morph!
    # morph "#lines", render(LineComponent.with_collection(@patch.lines))

    # morph :nothing

    # cable_ready.inner_html(
    #   selector: "#lines",
    #   html: render(LineComponent.with_collection(@patch.lines))
    # ).broadcast
  end
end
