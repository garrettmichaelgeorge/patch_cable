require "test_helper"

describe Line do
  context "associations" do
    should belong_to(:source).inverse_of(:lines).counter_cache(true)
    should belong_to(:destination).inverse_of(:lines).counter_cache(true)
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
