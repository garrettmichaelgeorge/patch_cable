require "test_helper"
require_relative "../endpoint_test_helper"

class OutletTest < ActiveSupport::TestCase
  include EndpointTestHelper

  context "associations" do
    should belong_to(:box).inverse_of(:outlets).counter_cache(true).touch(true)
    should have_many(:lines).inverse_of(:source).dependent(:destroy)
    should have_many(:destinations).through(:lines)
  end
end
