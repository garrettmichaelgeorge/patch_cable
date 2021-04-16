class Interface < ApplicationRecord
  validates :name, presence: true,
                   uniqueness: true,
                   length: { maximum: 40 }
end
