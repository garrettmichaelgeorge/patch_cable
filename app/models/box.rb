class Box < ApplicationRecord
  after_update :broadcast_box
  before_create :add_inlets_and_outlets

  serialize :settings

  belongs_to :patch, inverse_of: :boxes, counter_cache: true, touch: true
  has_many :inlets,  inverse_of: :box, dependent: :destroy
  has_many :outlets, inverse_of: :box, dependent: :destroy
  has_many :source_lines,      through: :inlets,  source: :lines
  has_many :destination_lines, through: :outlets, source: :lines

  scope :with_endpoints, -> { includes :inlets, :outlets }

  def type
    "destination"
  end

  private

  # TODO: extract into an ActiveJob
  def broadcast_box
    cable_ready[PatchesChannel].inner_html(
      selector: dom_id(self),
      html: render(BoxComponent.new(box: self))
    ).broadcast_to(self)
  end

  def add_inlets_and_outlets
    inlets.build([{}, {}])
    outlets.build([{}, {}])
  end
end
