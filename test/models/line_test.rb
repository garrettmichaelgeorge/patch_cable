require "test_helper"

describe Line do
  context "associations" do
    should belong_to(:source).inverse_of(:lines)
                             .counter_cache(true)
                             .touch(true)
    should belong_to(:destination).inverse_of(:lines)
                                  .counter_cache(true)
                                  .touch(true)
    should have_one(:source_box).through(:source)
                                .inverse_of(:destination_lines)
    should have_one(:destination_box).through(:destination)
                                     .inverse_of(:source_lines)
    should have_one(:patch).through(:source_box).inverse_of(:lines)
  end
end
