require "test_helper"
require_relative "../lookup_test_helper"

describe Interface do
  subject { build(:interface) }

  context "associations" do
    should have_many(:web_audio_types).inverse_of(:interface).dependent(:destroy)
  end

  class << self
    def name_length
      40
    end
  end

  include LookupTestHelper
end
