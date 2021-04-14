class BoxesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "boxes"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
