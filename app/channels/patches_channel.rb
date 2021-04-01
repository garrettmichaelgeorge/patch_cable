class PatchesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "patches"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
