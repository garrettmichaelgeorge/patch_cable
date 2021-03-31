class ApplicationComponent < ViewComponent::Base
  delegate :dom_id, :dom_class, :component, :icon,
           to: :helpers
end
