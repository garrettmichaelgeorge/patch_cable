module UIHelper
  def tile_column
    tag.div class: "tile is-parent is-vertical" do
      yield self if block_given?
    end
  end

  def tile_child
    tag.ui_box class: "tile is-child box" do
      yield self if block_given?
    end
  end
end
