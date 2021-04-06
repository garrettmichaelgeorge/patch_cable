require "test_helper"

describe Line do
  context "associations" do
    should belong_to(:source).inverse_of(:lines).counter_cache(true)
    should belong_to(:destination).inverse_of(:lines).counter_cache(true)
    should have_one(:source_box).through(:source)
                                .inverse_of(:destination_lines)
    should have_one(:destination_box).through(:destination)
                                     .inverse_of(:source_lines)
    should have_one(:patch).through(:source_box).inverse_of(:lines)
  end

  context "dom_id interface" do
    it "implements #model_name with #param_key" do
      _(subject.model_name.param_key).must_equal subject.class.to_s.downcase.underscore
    end

    it "implements #to_key" do
      _(subject.to_key).wont_be_nil
    end
  end
end
