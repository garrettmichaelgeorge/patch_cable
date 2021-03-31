require "test_helper"

class BoxTest < ActiveSupport::TestCase
  subject { Box.new }

  context "associations" do
    should belong_to(:patch).inverse_of(:boxes)
    should have_many(:inlets).inverse_of(:box).dependent(:destroy)
    should have_many(:outlets).inverse_of(:box).dependent(:destroy)
  end

  should serialize(:settings)

  describe "#inlets_count" do
    it "exists" do
      _(subject).must_respond_to :inlets_count
    end
  end

  describe "#outlets_count" do
    it "exists" do
      _(subject).must_respond_to :outlets_count
    end
  end
end
