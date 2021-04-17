require "test_helper"
require_relative "../lookup_test_helper"

describe WebAudioType do
  subject { build(:web_audio_type) }

  context "associations" do
    should have_many(:boxes).inverse_of(:web_audio_type)
    should belong_to(:interface).inverse_of(:web_audio_types)
  end

  context "#interface_type" do
    context "when #name is 'Blank'" do
      it "returns 'Blank'" do
        subject.stub :name, "Blank" do
          _(subject.interface_type).must_equal "Blank"
        end
      end
    end

    context "when #name is 'Oscillator', 'Freeverb', or 'LFO'" do
      it "returns 'AudioNode'" do
        %w[Oscillator Freeverb LFO].each do |audio_type|
          subject.stub :name, audio_type do
            _(subject.interface_type).must_equal "AudioNode"
          end
        end
      end
    end

    context "when #name is 'Button', 'Dial', or 'Slider'" do
      it "returns 'UI'" do
        %w[Button Dial Slider].each do |audio_type|
          subject.stub :name, audio_type do
            _(subject.interface_type).must_equal "UI"
          end
        end
      end
    end
  end

  include LookupTestHelper
end
