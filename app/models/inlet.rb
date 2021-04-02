# Inlet and Outlet are endpoints of Line
class Inlet < ApplicationRecord
  # TODO: extract the cable_ready callback into an ActiveJob
  after_update do
    cable_ready[PatchesChannel].morph(
      selector: dom_id(self),
      html: render(self)
    ).broadcast_to(self)
  end

  belongs_to :box, inverse_of: :inlets, counter_cache: true
  has_many :lines, inverse_of: :destination, dependent: :destroy
  has_many :sources, -> { distinct }, through: :lines
end
