class Box < ApplicationRecord
  serialize :settings

  belongs_to :patch, inverse_of: :boxes

  delegate :count, to: :inlets, prefix: true
  delegate :count, to: :outlets, prefix: true

  def type
    "destination"
  end

  def inlets
    [:foo, :bar]
  end

  def outlets
    []
  end
end
