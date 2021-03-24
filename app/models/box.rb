class Box < ApplicationRecord
  serialize :settings

  belongs_to :patch, inverse_of: :boxes
end
