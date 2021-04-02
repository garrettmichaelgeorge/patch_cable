class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  include CableReady::Broadcaster

  delegate :render, to: :ApplicationController

  # Make it easier to work with Secure Global IDs when broadcasting to resources
  # via CableReady
  # https://cableready.stimulusreflex.com/cableready-everywhere#activerecord
  def sgid
    to_sgid(expires_in: nil).to_s
  end
end
