class Box < ApplicationRecord
  # after_update :refresh_box
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

  def refresh_box
    RefreshBoxJob.perform_now(box: self)
  end

  def add_inlets_and_outlets
    inlets.build([{}, {}])
    outlets.build([{}, {}])
  end
end
