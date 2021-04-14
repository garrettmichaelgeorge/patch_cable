require "test_helper"

describe WebAudioType do
  subject { build(:web_audio_type) }

  context "associations" do
    should have_many(:boxes).inverse_of(:web_audio_type)
  end

  context "validations" do
    should validate_presence_of(:name)
    should validate_uniqueness_of(:name)
    should validate_length_of(:name).is_at_most(40)
  end
end
