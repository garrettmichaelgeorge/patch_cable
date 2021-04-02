require "test_helper"

class PatchTest < ActiveSupport::TestCase
  context "association" do
    should have_many(:boxes).inverse_of(:patch)
  end

  context "validations" do
    should validate_presence_of(:name)
    should validate_length_of(:name).is_at_most(80)
  end

  context "counter_cache columns" do
    should have_db_column(:boxes_count).of_type(:integer)
  end
end
