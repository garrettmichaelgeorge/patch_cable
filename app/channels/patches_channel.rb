class PatchesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "patches_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
