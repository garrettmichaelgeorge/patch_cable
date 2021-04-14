# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

WEB_AUDIO_TYPES = [
  { name: "blank" },
  { name: "destination" },
  { name: "oscillator" }
]

WEB_AUDIO_TYPES.each do |type|
  WebAudioType.find_or_create_by!(name: type[:name])
end
