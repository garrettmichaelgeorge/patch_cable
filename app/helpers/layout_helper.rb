module LayoutHelper
  def header_class
    class_ary = ["hero", "is-dark"]
    class_ary.push("is-fullheight") if content_for?(:header_body)
    token_list(*class_ary)
  end
end
