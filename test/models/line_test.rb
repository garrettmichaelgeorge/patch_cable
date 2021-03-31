require "test_helper"

class LineTest < ActiveSupport::TestCase
  context "associations" do
    should belong_to(:source).inverse_of(:lines).counter_cache(true)
    should belong_to(:destination).inverse_of(:lines).counter_cache(true)
  end
end
