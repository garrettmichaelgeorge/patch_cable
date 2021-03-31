require "test_helper"

class BoxTest < ActiveSupport::TestCase
  subject { Box.new }

  context "associations" do
    # should have_many(:outlet_lines).inverse_of(:source)
    # should have_many(:inlet_lines).inverse_of(:destination)
    should belong_to(:patch).inverse_of(:boxes)
  end

  context "delegations" do
    should delegate_method(:count).to(:inlets).with_prefix(true)
    should delegate_method(:count).to(:outlets).with_prefix(true)
  end

  should serialize(:settings)

  describe "#inlets_count" do
    it "returns an array with 2 items" do
      _(subject.inlets_count).must_equal 2, "#{subject} should have 2 inlets"
    end
  end

  describe "#outlets_count" do
    it "returns an empty array" do
      assert_predicate subject.outlets_count, :zero?, "#{subject} should have no outlets"
    end
  end
end
