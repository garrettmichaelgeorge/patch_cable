FactoryBot.define do
  factory :box do
    web_audio_type
  end

  factory :inlet do
    box
  end

  factory :outlet do
    box
  end

  factory :web_audio_type do
    name { "AudioNode" }
  end
end
