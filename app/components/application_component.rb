class ApplicationComponent < ViewComponent::Base
  delegate :dom_id, :dom_class, :component, :icon, :icon_tag,
           :icon_wrapper_tag, :icon_raw_tag, :icon_text_tag,
           to: :helpers
end
