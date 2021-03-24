require "test_helper"

class BoxTest < ActiveSupport::TestCase
  should serialize(:settings)

  context "associations" do
    # should have_many(:outlet_lines).inverse_of(:source)
    # should have_many(:inlet_lines).inverse_of(:destination)
    should belong_to(:patch).inverse_of(:boxes)
  end
end
