require "test_helper"

class LineTest < ActiveSupport::TestCase
  context "associations" do
    should belong_to(:source).inverse_of(:outlet_lines)
    should belong_to(:destination).inverse_of(:inlet_lines)
  end
end
