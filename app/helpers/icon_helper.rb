module IconHelper
  WRAPPER_CLASS = "icon".freeze
  ICON_TYPES = { solid: "fas",
                 brand: "fab" }.freeze

  def icon_tag(name, type: :solid, **opts)
    icon_wrapper_tag(**opts) do
      tag.icon class: icon_class_for(name, type)
    end
  end

  def icon_text_tag(name, type: solid, **opts)
    tag.icon_text class: "icon-text", **opts do
      icon_tag(name, type)

      yield
    end
  end

  def icon_wrapper_tag(**opts)
    css_class = token_list(WRAPPER_CLASS)

    tag.icon_wrapper class: css_class, **opts do
      yield
    end
  end

  def icon_class_for(name, type)
    token_list(icon_base_class_for(type),
               icon_modifier_class_for(name))
  end

  private

  def icon_base_class_for(type)
    ICON_TYPES.fetch(type) { ICON_TYPES[:solid] }
  end

  def icon_modifier_class_for(name)
    base = "fa"
    name = name.to_s.dasherize

    "#{base}-#{name}"
  end
end
