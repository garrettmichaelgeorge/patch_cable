module UI::InterfaceComponentFactory
  INTERFACE_MAPPINGS = {
  }

  def self.build(box:)
    case box.web_audio_type_name
    when "Blank"
      Interfaces::BlankComponent.new(box: box)
    when "Destination"
      Interfaces::DestinationComponent.new(box: box)
    else
      Interfaces::AudioNodeComponent.new(box: box)
    end
  end
end
