require "test_helper"

class BoxTest < ActiveSupport::TestCase
  subject { Box.new }

  context "associations" do
    should belong_to(:patch).inverse_of(:boxes).counter_cache(true).touch(true)
    should have_many(:inlets).inverse_of(:box).dependent(:destroy)
    should have_many(:outlets).inverse_of(:box).dependent(:destroy)
    should have_many(:source_lines).through(:inlets)
    should have_many(:destination_lines).through(:outlets)
  end

  context "counter_cache columns" do
    should have_db_column(:inlets_count).of_type(:integer)
    should have_db_column(:outlets_count).of_type(:integer)
  end

  should serialize(:settings)
end
