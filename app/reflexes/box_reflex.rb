# frozen_string_literal: true

class BoxReflex < ApplicationReflex
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
    # This should only work on patches#show
    throw :abort unless params[:id]

    @patch ||= Patch.find(params[:id])
  end

  def create_blank
    @patch.boxes.create_as_type!("Blank")

    morph_patch 
  end

  def destroy
    box = element.signed[:box]
    destroyed_box_id = dom_id(box)

    box.destroy

    morph :nothing

    cable_ready.remove(selector: destroyed_box_id)
               .broadcast
  end

  def move
    box = element.signed[:box]

    morph :nothing

    box.update({
      x: element.dataset.x,
      y: element.dataset.y
    })
  end

  def update
    box = element.signed[:box]

    box.assign_attributes(box_params)
    box.save!

    morph dom_id(box), render(BoxComponent.new(box: box))
  end

  private

  def box_params
    params.require(:box).permit(:web_audio_type_id)
  end

  def morph_patch
    morph dom_id(@patch), render(partial: "patches/patch",
                                 locals: { patch: @patch })
  end
end
