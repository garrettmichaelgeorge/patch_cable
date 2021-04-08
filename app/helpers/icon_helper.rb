module IconHelper
  WRAPPER_CLASS = "icon".freeze
  ICON_BASE_CLASS = "fa"
  ICON_TYPES = { solid: "fas",
                 brand: "fab" }.freeze

  def icon_tag(name, type: :solid, size: "", **opts)
    icon_wrapper_tag(**opts) do
      tag.icon class: icon_class_for(name, type, size)
    end
  end
  alias icon icon_tag

  def icon_text_tag(name, type: :solid, **opts)
    tag.icon_text class: "icon-text", **opts do
      icon_tag(name, type: type)
      yield
    end
  end
  alias icon_text icon_text_tag

  def icon_wrapper_tag(**opts)
    custom_css_class = opts.delete(:class) || ""
    css_class = token_list(WRAPPER_CLASS, custom_css_class)

    tag.icon_wrapper class: css_class, **opts do
      yield
    end
  end
  alias icon_wrapper icon_wrapper_tag

  def icon_class_for(name, type, size)
    token_list(icon_base_class_for(type),
               icon_modifier_class_for(name),
               icon_size_class_for(size))
  end

  private

  def icon_base_class_for(type)
    ICON_TYPES.fetch(type) { ICON_TYPES[:solid] }
  end

  def icon_modifier_class_for(name)
    "#{ICON_BASE_CLASS}-#{name.to_s.dasherize}"
  end

  def icon_size_class_for(size)
    "#{ICON_BASE_CLASS}-#{size}"
  end
end
