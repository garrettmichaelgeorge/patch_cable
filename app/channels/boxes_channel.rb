class BoxesChannel < ApplicationCable::Channel
  def subscribed
    stream_for "boxes"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
