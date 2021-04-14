require "test_helper"

describe Box do
  subject { build_stubbed(:box) }

  context "associations" do
    should belong_to(:patch).inverse_of(:boxes).counter_cache(true).touch(true)
    should belong_to(:web_audio_type).inverse_of(:boxes)
    should have_many(:inlets).inverse_of(:box).dependent(:destroy)
    should have_many(:outlets).inverse_of(:box).dependent(:destroy)
    should have_many(:source_lines).through(:inlets)
    should have_many(:destination_lines).through(:outlets)
  end

  context "counter_cache columns" do
    should have_db_column(:inlets_count).of_type(:integer)
    should have_db_column(:outlets_count).of_type(:integer)
  end

  context "delegations" do
    should delegate_method(:name).to(:web_audio_type).with_prefix(true)
  end

  should serialize(:settings)

  context "#web_audio_type_name=" do
    should "set the value to an instance of WebAudioClass" do
      subject.web_audio_type_name = "FooNode"

      _(subject.web_audio_type_name).must_equal "FooNode"
    end
  end

  context "#destination?" do
    it "returns true when web_audio_type_name is destination" do
      subject.stub :web_audio_type_name, "destination" do
        _(subject).must_be :destination?
      end
    end

    it "returns true when web_audio_type_name is destination" do
      subject.stub :web_audio_type_name, "foo" do
        _(subject).wont_be :destination?
      end
    end
  end
end
