require "test_helper"
require_relative "../lookup_test_helper"

describe Interface do
  subject { build(:interface) }

  context "associations" do
    should have_many(:boxes).inverse_of(:web_audio_type)
  end

  class << self
    def name_length
      40
    end
  end

  include LookupTestHelper
end
