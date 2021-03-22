class Line < ApplicationRecord
  belongs_to :source
  belongs_to :destination
end
