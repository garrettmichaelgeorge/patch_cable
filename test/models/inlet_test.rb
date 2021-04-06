require "test_helper"
require_relative "../endpoint_test_helper"

class InletTest < ActiveSupport::TestCase
  include EndpointTestHelper

  context "associations" do
    should belong_to(:box).inverse_of(:inlets).counter_cache(true).touch(true)
    should have_many(:lines).inverse_of(:destination).dependent(:destroy)
    should have_many(:sources).through(:lines)
  end
end
