class Box < ApplicationRecord
  # after_update_commit :refresh_box
  before_create :build_default_endpoints
  before_validation :add_default_web_audio_type

  serialize :settings

  belongs_to :patch,           inverse_of: :boxes, counter_cache: true,
                               touch: true
  belongs_to :web_audio_type,  inverse_of: :boxes,
                               foreign_key: "audio_node_id"
  has_many :inlets,            inverse_of: :box,  dependent: :destroy
  has_many :outlets,           inverse_of: :box,  dependent: :destroy
  has_many :source_lines,      through: :inlets,  source: :lines
  has_many :destination_lines, through: :outlets, source: :lines

  scope :with_endpoints,  -> { includes :inlets, :outlets }
  scope :with_web_audio_type, -> { includes :web_audio_type }
  scope :as, ->(web_audio_type_name) { joins(:web_audio_type).where("web_audio_type.name = ?", web_audio_type_name) }
  scope :as_destination, -> { as("destination") }
  scope :as_blank,       -> { as("blank") }

  delegate :name, to: :web_audio_type, prefix: true

  alias_attribute :web_audio_type_id, :audio_node_id 

  def destination?
    web_audio_type_name == "destination"
  end

  def web_audio_type_name=(value, web_audio_type_class = WebAudioType)
    self.web_audio_type = look_up_web_audio_type(web_audio_type_class, name: value.to_s)
  end

  class << self
    # Factory methods
    def initialize_as_type(type, **args)
      box = new(**args)
      box.web_audio_type_name = type
      box
    end

    def create_as_type(type, **args)
      box = new(**args)
      box.web_audio_type_name = type
      box.save
    end

    def create_as_type!(type, **args)
      box = new(**args)
      box.web_audio_type_name = type
      box.save!
    end
  end

  private

  def refresh_box(job_class = RefreshBoxJob)
    job_class.perform_now(box: self)
  end

  def add_default_web_audio_type
    return unless web_audio_type.nil?

    web_audio_type_name = "blank"
  end

  def build_default_endpoints
    inlets.build(default_inlets)
    outlets.build(default_outlets)
  end

  def default_inlets
    [{}]
  end

  def default_outlets
    [{}]
  end

  def look_up_web_audio_type(web_audio_type_class = WebAudioType, **args)
    web_audio_type_class.find_or_create_by(**args)
  end
end
